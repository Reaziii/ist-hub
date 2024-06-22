import Header from '@/components/Header'
import React from 'react'
import Reports from './Reports'
import { createNewReport, myReports } from '@/lib/reports'

const ReportPage = () => {
  return (
    <div>
      <Header />
      <div className="pt-[60px]" />
      <div className="max-w-screen-xl mx-auto">
        <Reports create={createNewReport} getReports={myReports} />
      </div>
    </div>
  )
}

export default ReportPage