import Header from "@/components/Header"
import Form from "./Form"
import { createNewJob, deleteJob, getJobDetails, updateJob } from "@/lib/jobs"

export default ({ params: { job_id } }: { params: { job_id: string } }) => {
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto">
            <Form update={updateJob} job_id={job_id} getJobDetails={getJobDetails} deleteJob={deleteJob} />
        </div>

    </div>
}