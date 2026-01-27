import React from 'react'
import MemberChart from '@/components/tripdashboard/MemberChart'
import ExpenseChart from "../../components/tripdashboard/ExpenseChart"
import TripStepNav from '@/components/TripStepNav.jsx'

const TripDashboard = () => {
  return (
    <>
    <div className='flex justify-center items-center gap-10 h-[90dvh] pr-5 pl-5  '>
        <div className='w-full'>
            <MemberChart />
        </div>
        <div className=' w-full'>
            <ExpenseChart />
        </div>
        
    </div>
    <TripStepNav step="dashboard"/>
    </>
  )
}

export default TripDashboard