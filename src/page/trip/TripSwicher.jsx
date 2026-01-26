import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { loadTrips } from "../../lib/srorage";

export default function TripSwitcher() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const trips = useMemo(() => loadTrips(), []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/60">Switch</span>
      <select
        value={tripId}
        onChange={(e) => navigate(`/trip/${e.target.value}`)}
        className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
      >
        {!trips.some((t) => t.id === tripId) && (
          <option value={tripId}>{tripId}</option>
        )}
        {trips.map((t) => (
          <option key={t.id} value={t.id}>
            {t.title || t.id}
          </option>
        ))}
      </select>
    </div>
  );
}
