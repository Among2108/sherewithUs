import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DebtCards({ members = [], settlements = [] }) {
  const nameOf = (id) =>
    members.find((m) => m.id === id)?.name || "Unknown";

  const money = (n) =>
    Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

  if (settlements.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-emerald-500 font-medium">
          🎉 All settled! No debts remaining.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {settlements.map((s, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="text-base">
              💸 Settlement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-sm">
              <span className="font-semibold text-rose-500">
                {nameOf(s.from)}
              </span>{" "}
              →{" "}
              <span className="font-semibold text-emerald-500">
                {nameOf(s.to)}
              </span>
            </p>
            <p className="text-lg font-bold">
              {money(s.amount)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
