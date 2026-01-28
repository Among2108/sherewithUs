import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";

export function DebtCards({ settlements = [] }) {
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
            <CardTitle className="text-base">💸 Settlement</CardTitle>
          </CardHeader>

          <CardContent className="space-y-1">
            <p className="text-sm">
              <span className="font-semibold text-rose-500">
                {s.fromName}
              </span>{" "}
              →{" "}
              <span className="font-semibold text-emerald-500">
                {s.toName}
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
