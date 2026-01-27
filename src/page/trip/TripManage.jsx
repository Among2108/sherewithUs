import { useState } from "react";
import GlassSegmented from "@/components/tripmannage/GlassSegmented";
import { AddMemberCard } from "@/components/tripmannage/AddmemberCard";
import { MembersTable } from "../../components/tripmannage/MembersTable";
import AddExpense from "../../components/tripmannage/AddExpense";
import { TableExpense } from "@/components/tripmannage/TableExpense";
import TripStepNav from "@/components/TripStepNav.jsx";

export default function TripManage() {
  const [tab, setTab] = useState("members");

  return (
    <>
      <div className="h-[90dvh]">
        <div className=" w-screen  flex justify-center">
          <GlassSegmented value={tab} onChange={setTab} />
        </div>

        {tab === "members" ? (
          <div className="flex justify-center gap-10 pt-10 ml-5 mr-5">
            <div className="w-[45%]">
              <AddMemberCard />
            </div>
            <div className="w-[45%]">
              <MembersTable />
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-30 pt-10 ml-5 mr-5">
            <div>
              <TableExpense />
            </div>
            <div className="flex justify-center items-center ">
              <AddExpense/>
            </div>
          </div>
        )}
       
      </div>
       <TripStepNav step="manage" />
      
    </>
  );
}
