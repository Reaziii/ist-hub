
import Header from '@/components/Header'
import ChangePassword from './ChangePassword'
import { changePassword } from '@/lib/auth'
import { ToastContainer } from 'react-toastify'
export default () => {
    return <div>
        <Header />
        <div className="pt-[60px]" />
        <div className="max-w-screen-xl mx-auto">
            <ToastContainer />
            <ChangePassword changePassword={changePassword} />
        </div>
    </div>
}