import { useMemo } from "react";
import { useNavigate } from "react-router";
import { loadTrips, saveTrips } from "../lib/srorage";

function uid() {
  return crypto.randomUUID?.() || String(Date.now());
}

export default function Home() {
  const navigate = useNavigate();
  const trips = useMemo(() => loadTrips(), []);

  const createTrip = () => {
    const id = uid();
    const newTrip = {
      id,
      title: "My Trip",
      createdAt: Date.now(),
    };

    const next = [newTrip, ...trips];
    saveTrips(next);

    navigate(`/trip/${id}`);
  };

  const openTrip = (id) => navigate(`/trip/${id}`);

  const clearAll = () => {
    saveTrips([]);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white w-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">ShareWithUs</h1>
          <p className="text-white/70">
            Guest-first Trip Planner & Expense Split
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={createTrip}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium"
          >
            + Create Trip
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/5 text-sm"
          >
            Clear All (dev)
          </button>
        </div>

        {/* Recent Trips */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-semibold">Recent Trips</h2>
            <p className="text-xs text-white/50">
              Saved on this device (LocalStorage)
            </p>
          </div>

          {trips.length === 0 ? (
            <div className="rounded-xl border border-white/10 p-6 text-white/60">
              No trips yet. Click <span className="text-white">Create Trip</span>{" "}
              to start.
            </div>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {trips.map((t) => (
                <li
                  key={t.id}
                  className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{t.title || "Untitled Trip"}</p>
                      <p className="text-xs text-white/50 break-all">{t.id}</p>
                    </div>

                    <button
                      onClick={() => openTrip(t.id)}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
                    >
                      Open →
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Footer hint */}
        <div className="text-xs text-white/50">
          Tip: Login can be added later to sync across devices.
        </div>
      </div>
    </div>
  );
}
