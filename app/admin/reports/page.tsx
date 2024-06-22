import AdminDashboard from "@/components/AdminDashboard"
import Reports from "./ReportsDashboard"
import { getProfileDetails } from "@/lib/admin/admin"
import { getReports } from "@/lib/admin/reports"

export default () => {
    return <div>
        <Reports getProfileDetails={getProfileDetails} getReports={getReports} />
    </div>
}