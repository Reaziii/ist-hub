import Header from "@/components/Header"
import { redirect } from "next/navigation"
import AcceptInvitation from "./AcceptInvitation"
import { checkInvitation } from "@/lib/admin/auth"
import Accept from "./Accept"

interface Props {
    searchParams: {
        accessToken: string
    }
}
const Page: React.FC<Props> = async ({ searchParams: { accessToken } }) => {
    if (!accessToken) {
        redirect("/")
    }
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto">
            <Accept accessToken={accessToken} checkInvitation={checkInvitation} />
        </div>
    </div>
}

export default Page