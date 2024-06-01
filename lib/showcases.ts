import conn from "./mysql";
import { user } from "./user";

export const getProfileShowcases = async (userid: number): Promise<ServerMessageInterface & { showcases: Showcase[] }> => {
    "use server";
    try {
        let sql = 'select * from showcase where userid = ?'
        let data = await conn.query(sql, [userid]) as any[];

        let showcases: Showcase[] = data[0];

        showcases = showcases.map(item => {
            item.tags = []
            return item;
        })

        for (let i = 0; i < showcases.length; i++) {
            sql = 'select * from showcaseTags where showcase_id = ?'
            data = await conn.query(sql, [showcases[i].showcase_id]) as any[];
            showcases[i].tags = data[0];
        }

        return { success: true, msg: "Showcases fetched succesfully", showcases }

    }
    catch (err) {
        return { success: false, msg: "Something went wrong", showcases: [] }
    }
}