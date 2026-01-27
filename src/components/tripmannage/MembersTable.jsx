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
 * members: [{ id, name }]
 * expenses: [{ amount, paidByMemberId }]
 * onEdit: (member) => void
 * onDelete: (memberId) => void
 */
export function MembersTable({ members = [], expenses = [], onEdit, onDelete }) {
  // รวมยอด "จ่ายไป" ต่อคนจาก expenses
  const paidMap = expenses.reduce((acc, e) => {
    const mid = e.paidByMemberId;
    const amt = Number(e.amount) || 0;
    if (!mid) return acc;
    acc[mid] = (acc[mid] || 0) + amt;
    return acc;
  }, {});

  const formatMoney = (n) =>
    (Number(n) || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Paid</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {members.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No members yet
            </TableCell>
          </TableRow>
        ) : (
          members.map((m) => (
            <TableRow key={m.id}>
              <TableCell className="font-medium">{m.name}</TableCell>

              <TableCell className="text-right">
                {formatMoney(paidMap[m.id] || 0)}
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(m)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete?.(m.id)}
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
