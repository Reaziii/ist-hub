import Header from '@/components/Header'
import PaginatedJobs from '@/components/PaginatedJobs'
import { getWhitelistedJobs, toggleJobWhitelist } from '@/lib/jobs'

export default () => {
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto pb-10">
            <PaginatedJobs getPaginatedJobs={getWhitelistedJobs} toggleWhiteList={toggleJobWhitelist} />
        </div>
    </div>
}