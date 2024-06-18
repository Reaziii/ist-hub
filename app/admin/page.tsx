import { currentPath } from "@/lib/admin/auth";
import { headers } from "next/headers"

export default async () => {
    let headerobj = await currentPath();
    return <div>{headerobj}</div>
}