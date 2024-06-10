import Header from '@/components/Header'
import WhiteListedJobs from './WhitelistedJobs'
import { getWhitelistedJobs, toggleJobWhitelist } from '@/lib/jobs'

export default () => {
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto pb-10">
            <WhiteListedJobs getPaginatedJobs={getWhitelistedJobs} toggleWhiteList={toggleJobWhitelist} />
        </div>
    </div>
}