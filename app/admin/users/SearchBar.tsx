// src/components/SearchParametersBar.tsx
import React, { useRef, useState } from 'react';

export interface UserSearchParams {
    dept: "CSE" | "ECE" | "BBA" | "ALL",
    roll: string,
    verified: "YES" | "NO" | "ALL",
    batch: string
}
interface Props {
    parameters: UserSearchParams,
    setParameters: (value: UserSearchParams) => void,
    handleSearch: (_page?: number, _users?: UserInterface[]) => void
}

const SearchParametersBar: React.FC<Props> = ({ parameters, setParameters, handleSearch }) => {
    const deptRef = useRef<HTMLDivElement>(null)
    const verfiedRef = useRef<HTMLDivElement>(null)
    const [touched, setTouched] = useState({ dept: false, verified: false })

    let depts: ("CSE" | "ECE" | "BBA" | "ALL" | "DEPARTMENTS")[] = ["DEPARTMENTS", "ALL", "CSE", "ECE", "BBA",];
    let verifieds: ("YES" | "NO" | "ALL" | "VERIFIED")[] = ["VERIFIED", "ALL", "YES", "NO"]
    const RenderDeptList = () => (
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">

            {
                depts.map((item, key) => (
                    <li key={key}>
                        <button
                            onClick={() => {
                                if (item === "DEPARTMENTS") {
                                    setTouched({ ...touched, dept: false })
                                    setParameters({ ...parameters, dept: "ALL" })
                                }
                                else {
                                    setTouched({ ...touched, dept: true })
                                    setParameters({ ...parameters, dept: item })
                                }
                            }}
                            type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item}</button>
                    </li>
                ))
            }

        </ul>
    )

    const RenderVerifieds = () => (
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">

            {
                verifieds.map((item, key) => (
                    <li key={key}>
                        <button
                            onClick={() => {
                                if (item === "VERIFIED") {
                                    setTouched({ ...touched, verified: false })
                                    setParameters({ ...parameters, verified: "ALL" })
                                }
                                else {
                                    setTouched({ ...touched, verified: true })
                                    setParameters({ ...parameters, verified: item })
                                }
                            }}
                            type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item}</button>
                    </li>
                ))
            }

        </ul>
    )


    return (

        <div className="mx-auto mt-4">
            <div className="flex relative">
                <button
                    onClick={() => {
                        if (deptRef.current) {
                            if (deptRef.current.classList.contains("hidden")) deptRef.current.classList.remove("hidden");
                            else deptRef.current.classList.add("hidden")
                        }
                        if (verfiedRef.current) {
                            verfiedRef.current.classList.add("hidden")
                        }
                    }}
                    id="dropdown-button" data-dropdown-toggle="dropdown" className="relative flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{
                        touched.dept ? parameters.dept : "DEPARTMENTS"
                    }
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                    <div ref={deptRef} id="dropdown" className="z-10 hidden absolute top-[100%] left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <RenderDeptList />
                    </div>
                </button>
                <button
                    onClick={() => {
                        if (verfiedRef.current) {
                            if (verfiedRef.current.classList.contains("hidden")) verfiedRef.current.classList.remove("hidden");
                            else verfiedRef.current.classList.add("hidden")
                        }
                        if (deptRef.current) {
                            deptRef.current.classList.add("hidden")
                        }
                    }}
                    id="dropdown-button" data-dropdown-toggle="dropdown" className="relative flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                        {
                             touched.verified ? parameters.verified : "VERIFIED"
                        }
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                    <div ref={verfiedRef} id="dropdown" className="z-10 hidden absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 top-[100%] left-0">
                        <RenderVerifieds />
                    </div>
                </button>


                <div className="relative w-full">
                    <div className='flex items-center w-full z-[-1]'>
                        <input value={parameters.roll} onChange={(e) => setParameters({ ...parameters, roll: (e.target.value) })} type="string" className="block p-2.5 z-20 w-full text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Roll no (ex : 19057)" />
                        <input value={parameters.batch} onChange={(e) => setParameters({ ...parameters, batch: (e.target.value) })} className="block p-2.5 z-20 w-full text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Batch no (ex: 26)" />
                        <button onClick={() => {
                            handleSearch(1, [])
                        }} className="z-1 w-20 relative top-0 h-full end-0 p-2.5 text-sm font-medium p-3.5 text-white bg-blue-700 rounded-e-lg hover:bg-blue-800">
                            <svg className="w-10 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default SearchParametersBar;
