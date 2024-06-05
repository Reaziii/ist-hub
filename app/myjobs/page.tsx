import Header from "@/components/Header";
import Jobs from "./Job";
import { getProfileJobs } from "@/lib/jobs";
import { user } from "@/lib/user";
import { redirect } from "next/navigation";


const MyJobs = async () => {
    const usr = await user();
    if (!usr.usr) return redirect("/")
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto">
            <Jobs userid={usr.usr._id} getJobs={getProfileJobs} />
        </div>
    </div>
}

export default MyJobs;