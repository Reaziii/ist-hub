import Header from "@/components/Header";
import Jobs from "./Job";
import { getProfileJobs } from "@/lib/jobs";
import { extractEmailAddressAndId, user } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";
interface Props{ 
    params: { 
        username: string 
    } 
}

const MyJobs: React.FC<Props> = async ({ params: { username } }) => {
    const usr = await extractEmailAddressAndId(username);
    if (!usr._id)
        if (!usr.email || !usr._id) return redirect("/")
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto">
            <Jobs userid={usr._id} getJobs={getProfileJobs} />
        </div>
    </div>
}

export default MyJobs;