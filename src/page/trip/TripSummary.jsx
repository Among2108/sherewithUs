import React from "react";
import { TableSummary } from "@/components/tripsummery/TableSummary";
import { DebtCards } from "@/components/tripsummery/DebtCards";
import TripStepNav from "@/components/TripStepNav.jsx";
import { ScrollArea } from "@/components/ui/scroll-area";

const TripSummary = () => {
  const members = [
    { id: "m1", name: "Alice" },
    { id: "m2", name: "Bob" },
  ];

  const summary = [
    { memberId: "m1", paid: 200, share: 120, net: 80 },
    { memberId: "m2", paid: 40, share: 100, net: -60 },
    { memberId: "m2", paid: 40, share: 100, net: -60 },
    { memberId: "m2", paid: 40, share: 100, net: -60 },
  ];

  const settlements = [
    { from: "m2", to: "m1", amount: 60 },
    { from: "m2", to: "m1", amount: 60 },
    { from: "m2", to: "m1", amount: 60 },
  ];
  return (
    <div className="">
      <div className="h-[90dvh]   ">
        <div className=" w-1/2 mx-auto">
          <TableSummary members={members} summary={summary} />
        </div>
        <ScrollArea className="h-150  rounded-md borde mt-10">
          <div className="w-1/2 mx-auto">
            <DebtCards members={members} settlements={settlements} />
          </div>
        </ScrollArea>
      </div>
      <TripStepNav step="summary" />
    </div>
  );
};

export default TripSummary;
