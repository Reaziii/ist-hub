
import { logout } from "@/lib/auth"
import Logout from "./Logout"

const Page = async () => {
    return (
        <Logout logout={logout}/>
    )
}

export default Page