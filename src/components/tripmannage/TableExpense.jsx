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

/**
 * props:
 * - expenses
 * - members
 * - onEdit(expense)
 * - onDelete(expenseId)
 */
export function TableExpense({
  expenses = [],
  members = [],
  onEdit,
  onDelete,
}) {
  const memberName = (id) =>
    members.find((m) => m.id === id)?.name || "Unknown";

  const formatMoney = (n) =>
    (Number(n) || 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

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
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.title}</TableCell>

              <TableCell>{e.category || "-"}</TableCell>

              <TableCell className="text-right">
                {formatMoney(e.amount)}
              </TableCell>

              <TableCell>{memberName(e.paidByMemberId)}</TableCell>

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
                    <DropdownMenuItem onClick={() => onEdit?.(e)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete?.(e.id)}
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
