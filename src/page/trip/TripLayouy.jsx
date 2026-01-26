import { Outlet, useParams, Link } from "react-router";
import TripNav from "../trip/TripNav";
import TripSwitcher from "../trip/TripSwicher";

export default function TripLayout() {
  const { tripId } = useParams();

  return (
    <div className="min-h-screen bg-neutral-950 text-white w-screen">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-white/70 hover:text-white">
              ← Home
            </Link>
            <div className="h-4 w-px bg-white/15" />
            <div>
              <p className="text-xs text-white/60">Trip</p>
              <p className="font-semibold leading-tight">{tripId}</p>
            </div>
          </div>

          <TripSwitcher />
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-3">
          <TripNav />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
