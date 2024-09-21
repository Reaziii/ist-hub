import UserModel from "@/models/UserModel";
import UserVerifier from "@/models/UserVerifier";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ServerMessageInterface & { verifier?: { username: string; userid: string } }
  >
) {
  if (req.method === "GET") {
    try {
      const { userid } = req.query;
      console.log(userid);
      const user = await UserVerifier.findOne({ owner: userid });
      if (!user) return res.json({ success: false, msg: "User not verified" });
      if (user.byAdmin) {
        return res.json({
          success: true,
          msg: "User verifier retrived",
          verifier: {
            username: "Admin",
            userid: "admin",
          },
        });
      }
      const verifier = await UserModel.findById(user.verfier);
      if (!verifier) {
        return res.json({ success: false, msg: "Verifier id not found" });
      }
      return res.status(200).json({
        success: true,
        msg: "Verifier retrieved",
        verifier: {
          userid: verifier.username,
          username: verifier.fullname,
        },
      });
    } catch (err) {
      return res.json({ success: false, msg: "Try again latter" });
    }
  }
}
