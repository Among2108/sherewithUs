import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import GlassSegmented from "@/components/tripmanage/GlassSegmented";
import { AddMemberCard } from "@/components/tripmanage/AddmemberCard";
import { MembersTable } from "@/components/tripmanage/MembersTable";
import AddExpense from "@/components/tripmanage/AddExpense";
import { TableExpense } from "@/components/tripmanage/TableExpense";
import TripStepNav from "@/components/TripStepNav.jsx";

import { tripAPI } from "../../service/trip.api";
import { expenseAPI } from "../../service/expense.api";
import { useAsync } from "@/hooks/useAsync";

export default function TripManage() {
  const { tripId } = useParams();
  const [tab, setTab] = useState("members");

  const tripReq = useAsync(tripAPI.getById);
  const expenseReq = useAsync(expenseAPI.getByTrip);

  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchAll = async () => {
    const t = await tripReq.run(tripId);
    setMembers(t.data.members || []);

    const e = await expenseReq.run(tripId);
    setExpenses(e.data || []);
  };

  useEffect(() => {
    if (!tripId) return;
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const loading = tripReq.loading || expenseReq.loading;
  const error = tripReq.error || expenseReq.error;

  if (loading) return <div className="p-6 text-white/60">Loading...</div>;
  if (error) return <div className="p-6 text-rose-400">{error}</div>;

  return (
    <>
      <div className="h-[90dvh]">
        <div className="w-screen flex justify-center">
          <GlassSegmented value={tab} onChange={setTab} />
        </div>

        {tab === "members" ? (
          <div className="flex justify-center gap-10 pt-10 ml-5 mr-5">
            <div className="w-[45%]">
              <AddMemberCard tripId={tripId} onAdded={fetchAll} />
            </div>
            <div className="w-[45%]">
              <MembersTable
                tripId={tripId}
                members={members}
                expenses={expenses}
                onDeleted={fetchAll}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 pt-10 ml-5 mr-5">
            <div>
              <TableExpense
                tripId={tripId}
                expenses={expenses}
                members={members}
                onDeleted={fetchAll}
              />
            </div>

            <div className="flex justify-center items-center">
              <AddExpense tripId={tripId} members={members} onAdded={fetchAll} />
            </div>
          </div>
        )}
      </div>

      <TripStepNav step="manage" />
    </>
  );
}
