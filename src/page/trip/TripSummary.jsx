import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { TableSummary } from "@/components/tripsummery/TableSummary";
import { DebtCards } from "@/components/tripsummery/DebtCards";
import TripStepNav from "@/components/TripStepNav.jsx";
import { ScrollArea } from "@/components/ui/scroll-area";

import { summaryAPI } from "@/service/summary.api";
import { useAsync } from "@/hooks/useAsync";

export default function TripSummary() {
  const { tripId } = useParams();
  const summaryReq = useAsync(summaryAPI.getByTrip);

  useEffect(() => {
    if (!tripId) return;
    summaryReq.run(tripId);
    // eslint-disable-next-line
  }, [tripId]);

  if (summaryReq.loading)
    return <div className="p-6 text-white/60">Loading summary...</div>;

  if (summaryReq.error)
    return <div className="p-6 text-rose-400">{summaryReq.error}</div>;

  // ✅ สำคัญมาก
  const payload = summaryReq.data?.data;
  if (!payload)
    return <div className="p-6 text-white/60">Loading summary...</div>;

  const members = payload.perPerson.map((p) => ({
    id: p.memberId,
    name: p.name,
  }));

  return (
    <>
    <div className="min-h-[90dvh]">
      <div className="w-1/2 mx-auto">
        <TableSummary summary={payload.perPerson} />
      </div>

      <ScrollArea className="mt-10">
        <div className="w-1/2 mx-auto">
          <DebtCards settlements={payload.settlements} />
        </div>
      </ScrollArea>

      
    </div>
    <TripStepNav step="summary" />
    </>
  );
}
