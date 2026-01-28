
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";


export function TableSummary({ summary = [] }) {
  const money = (n) =>
    Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <Table className="border border-white/15">
      <TableHeader>
        <TableRow className="border-b border-white/20">
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Paid</TableHead>
          <TableHead className="text-right">Share</TableHead>
          <TableHead className="text-right">Net</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {summary.map((row) => (
          <TableRow
            key={row.memberId}
            className="border-b border-white/10 last:border-0"
          >
            {/* ✅ ใช้ name จาก backend โดยตรง */}
            <TableCell className="font-medium">
              {row.name}
            </TableCell>

            <TableCell className="text-right">
              {money(row.paid)}
            </TableCell>

            <TableCell className="text-right">
              {money(row.share)}
            </TableCell>

            <TableCell
              className={`text-right font-semibold ${
                row.net > 0
                  ? "text-emerald-500"
                  : row.net < 0
                  ? "text-rose-500"
                  : "text-muted-foreground"
              }`}
            >
              {row.net > 0 && "+"}
              {money(row.net)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
