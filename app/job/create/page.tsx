import Header from "@/components/Header"
import Form from "./Form"
import { createNewJob } from "@/lib/jobs"

export default () => {
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto">
            <Form create={createNewJob} />
        </div>

    </div>
}