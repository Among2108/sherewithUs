import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";

import { expenseAPI } from "../../service/expense.api";

/**
 * props:
 * - tripId
 * - expenses: [{ _id, title, category, amount, paidByMemberId, splitAmongIds }]
 * - members: [{ _id, name }]
 * - onDeleted: () => void
 */
export function TableExpense({
  tripId,
  expenses = [],
  members = [],
  onDeleted,
}) {
  const memberName = (id) =>
    members.find((m) => m._id === id)?.name || "Unknown";

  const formatMoney = (n) =>
    (Number(n) || 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

  const remove = async (expenseId) => {
    if (!tripId) return;
    const ok = confirm("Delete this expense?");
    if (!ok) return;

    await expenseAPI.remove(tripId, expenseId);
    onDeleted?.(); // 👈 refresh list
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Paid by</TableHead>
          <TableHead className="text-center">Split</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {expenses.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              No expenses yet
            </TableCell>
          </TableRow>
        ) : (
          expenses.map((e) => (
            <TableRow key={e._id}>
              <TableCell className="font-medium">
                {e.title}
              </TableCell>

              <TableCell>{e.category || "-"}</TableCell>

              <TableCell className="text-right">
                {formatMoney(e.amount)}
              </TableCell>

              <TableCell>
                {memberName(e.paidByMemberId)}
              </TableCell>

              <TableCell className="text-center">
                {e.splitAmongIds?.length || 0}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {/* future: edit expense */}
                    <DropdownMenuItem disabled>
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => remove(e._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
