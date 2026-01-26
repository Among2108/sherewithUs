import { NavLink, useParams } from "react-router";

const base =
  "px-3 py-2 rounded-lg text-sm border border-white/10 hover:border-white/20 hover:bg-white/5 transition";

export default function TripNav() {
  const { tripId } = useParams();

  const tabs = [
    { to: `/trip/${tripId}`, label: "Dashboard", end: true },
    { to: `/trip/${tripId}/members`, label: "Members" },
    { to: `/trip/${tripId}/expenses`, label: "Expenses" },
    { to: `/trip/${tripId}/summary`, label: "Summary" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-2 ">
      {tabs.map((t) => (
        <NavLink
          key={t.label}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-white text-black" : "text-white/80"}`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
