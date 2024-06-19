import FullPageLoader from '@/components/FullPageLoader';
import handleToast from '@/components/handleToast';
import { FC, useEffect, useState } from 'react';
import SearchParametersBar, { UserSearchParams } from './SearchBar';
import HorizontalBar from '@/components/HorizontalBar';
interface Props {
    getUsers: (parameters: UserSearchParams) => Promise<ServerMessageInterface & { users: UserInterface[] }>,
}
const UsersCard: FC<Props> = ({ getUsers }) => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDD, setOpenDD] = useState<number>(-1)
    let [parameters, setParameters] = useState<UserSearchParams>({
        dept: "ALL",
        roll: "",
        verified: "ALL",
        batch: ""
    })
    const handleSearch = () => {
        setLoading(true)
        getUsers(parameters).then(res => {
            if (res.success) {
                setUsers([...res.users])
            }
            else {
                handleToast(res)
            }
            setLoading(false);
        })
    }
    useEffect(() => {
        getUsers(parameters).then(res => {
            if (res.success) {
                setUsers([...res.users])
            }
            else {
                handleToast(res)
            }
            setLoading(false);
        })
    }, [])
    return <div className='px-2 py-2 mx-auto'>
        <div className='w-full bg-white rounded-lg shadow'>
            <div className='p-6'>
                <h1 className='font-bold text-[black] text-[20px]'>USERS</h1>
                <SearchParametersBar handleSearch={handleSearch} parameters={parameters} setParameters={setParameters} />
                <HorizontalBar />

                {
                    loading ? <FullPageLoader loading={true} /> :

                        users.map((item, key) => (
                            <div className='relative h-[160px] py-[10px] border border-gray-200 border-0 border-b-[1px] mt-5 flex items-center'>
                                <div className='h-[140px] w-[180px]'>
                                    <img src={item.photo ?? "/defaultdp.png"} className="h-full w-full" />
                                </div>
                                <div className='ml-4 h-full w-full flex flex-wrap'>
                                    <div className='w-[33%]'>
                                        <p className='font-bold'>Name</p>
                                        <a className='text-blue-500' target='_blank' href={`/profile/${item.username}`}>{item.fullname}</a>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='font-bold'>Roll</p>
                                        <p>{item.roll_no}</p>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='font-bold'>Department</p>
                                        <p>{item.department}</p>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='font-bold'>Email</p>
                                        <a className="text-blue-400" target='_blank' href={`mailto:${item.email}`}>{item.email}</a>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='font-bold'>Phone</p>
                                        <p>{item.phone}</p>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='font-bold'>Verified</p>
                                        <p>{item.verified ? "YES" : "NO"}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        if (openDD === key) setOpenDD(-1);
                                        else setOpenDD(key)
                                    }}
                                    className="absolute top-0 right-0 text-white bg-white text-[black] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                                    <i className="fa-solid fa-ellipsis-vertical text-[black]"></i>
                                    {
                                        openDD === key && <div id="dropdownHover" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 right-[100%] top-0">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Toogle Verified</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-500">Delete User</a>
                                                </li>

                                            </ul>
                                        </div>
                                    }
                                </button>


                            </div>
                        ))
                }
            </div>
        </div>
    </div>
}


export default UsersCard;