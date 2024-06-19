import UserModel from "@/models/UserModel";
import { Admin } from "./auth";
import { ErrorMessage } from "@/constants";
import { UserSearchParams } from "@/app/admin/users/SearchBar";
import { PipelineStage } from "mongoose";


export const getAllUsers = async (params?: UserSearchParams): Promise<ServerMessageInterface & { users: UserInterface[] }> => {
    "use server";
    try {
        console.log(params)
        let admin = await Admin();
        if (!admin.admin) {
            return { ...ErrorMessage.UNAUTHORIZED, users: [] };
        }
        let pipeline: PipelineStage[] = [];
        if (params && params.batch.length) {
            pipeline.push({
                $match: {
                    batch: Number(params.batch)
                }
            })
        }
        if (params && params.dept !== "ALL") {
            pipeline.push({
                $match: {
                    department: params.dept
                }
            })
        }
        if (params && params.roll.length) {
            pipeline.push({
                $match: {
                    roll_no: Number(params.roll)
                }
            })
        }
        if (params && params.verified !== "ALL") {
            pipeline.push({
                $match: {
                    verified: params.verified === "YES"
                }
            })
        }
        let users: UserInterface[] = [];
        if (pipeline.length === 0) {
            users = await UserModel.find().lean();
        }
        else {
            users = await UserModel.aggregate<UserInterface>(pipeline)
        }
        users = users.map(item => ({ ...item, _id: String(item._id), password : "" }))
        return { success: true, msg: "Successfully fetched users", users: users }
    } catch (err) {
        console.log("admin - user fetch failed ===> \n", err)
        return { success: false, msg: "Failed to fetch users", users: [] }

    }
}

