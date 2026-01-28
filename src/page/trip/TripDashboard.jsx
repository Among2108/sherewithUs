import React, { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import MemberChart from "@/components/tripdashboard/MemberChart"
import ExpenseChart from "@/components/tripdashboard/ExpenseChart"
import TripStepNav from "@/components/TripStepNav.jsx"

import { summaryAPI } from "../../service/summary.api"
import { expenseAPI } from "../../service/expense.api"
import { useAsync } from "@/hooks/useAsync"

const TripDashboard = () => {
  const { tripId } = useParams()

  const summaryReq = useAsync(summaryAPI.getByTrip)
  const expenseReq = useAsync(expenseAPI.getByTrip)

  const [summary, setSummary] = useState(null)
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    if (!tripId) return
    summaryReq.run(tripId).then((res) => setSummary(res.data))
    expenseReq.run(tripId).then((res) => setExpenses(res.data))
  }, [tripId])

  // ✅ Bar: perPerson → [{ name, amount }]
  const memberData = useMemo(() => {
    if (!summary?.perPerson) return []
    return summary.perPerson.map((p) => ({
      name: p.name,
      amount: p.paid,
    }))
  }, [summary])

  // ✅ Pie: expenses → group by category → [{ browser, visitors }]
  const pieData = useMemo(() => {
    const map = {}
    for (const e of expenses) {
      const key = e.category || "Other"
      map[key] = (map[key] || 0) + Number(e.amount || 0)
    }
    return Object.entries(map).map(([browser, visitors]) => ({
      browser,
      visitors,
    }))
  }, [expenses])

  if (summaryReq.loading || expenseReq.loading) {
    return <div className="p-6 text-white/60">Loading...</div>
  }
  if (summaryReq.error) {
    return <div className="p-6 text-rose-400">{summaryReq.error}</div>
  }
  if (expenseReq.error) {
    return <div className="p-6 text-rose-400">{expenseReq.error}</div>
  }

  return (
    <>
      <div className="flex justify-center items-center gap-10 h-[90dvh] pr-5 pl-5">
        <div className="w-full">
          <MemberChart data={memberData} />
        </div>
        <div className="w-full">
          <ExpenseChart data={pieData} />
        </div>
      </div>
      <TripStepNav step="dashboard" />
    </>
  )
}

export default TripDashboard
