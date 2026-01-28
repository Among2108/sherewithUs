export default function GlassSegmented({ value, onChange }) {
  const tabs = [
    { id: "members", label: "Members" },
    { id: "expenses", label: "Expenses" },
  ];

  const index = value === "expenses" ? 1 : 0;

  return (
    <div
      role="tablist"
      aria-label="Manage tabs"
      className="
        relative inline-flex items-center
        h-11 w-[280px]
        rounded-full
        border border-white/15
        bg-blue-400
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        overflow-hidden
      "
    >
      {/* Single moving glass thumb */}
      <div
        aria-hidden="true"
        className="
          absolute top-1 bottom-1
          left-1
          w-[calc(50%-0.25rem)]
          rounded-full
          border border-white/25
          bg-gradient-to-b from-white/40 via-white/18 to-white/8
          backdrop-blur-2xl
          shadow-[0_10px_22px_rgba(0,0,0,0.25)]
          transition-transform duration-300 ease-[cubic-bezier(.2,.9,.2,1)]
        "
        style={{ transform: `translateX(${index * 100}%)` }}
      >
        {/* glass highlights */}
        <div className="pointer-events-none absolute inset-0 rounded-full">
          <div
            className="
              absolute left-2 right-2 top-[2px] h-[45%]
              rounded-full
              bg-gradient-to-b from-white/55 to-transparent
              opacity-70
            "
          />
          <div
            className="
              absolute inset-0 rounded-full
              bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]
              opacity-60
            "
          />
        </div>
      </div>

      {/* subtle divider (optional) */}
      <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white/10" />

      {/* Click areas (no individual button background) */}
      {tabs.map((tab) => {
        const active = value === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className="
              relative z-10
              w-1/2 h-full
              rounded-full
              text-sm font-semibold
              transition-colors
              focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white/40
            "
          >
            <span className={active ? "text-black" : "text-white/80"}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
