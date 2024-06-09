import React from 'react'
import Search from './Search'
import Header from '@/components/Header'
import { Formik } from 'formik'
import { searchJobs } from '@/lib/jobs'
import JobSearchItem from './ShowSearchItem'
const SearchJob = () => {
    return (
        <div>
            <Header />
            <div className="pt-[60px]" />
            <div className="max-w-screen-xl mx-auto">
                <Search />
                <JobSearchItem searchJobs={searchJobs}  />
            </div>
        </div>
    )
}

export default SearchJob