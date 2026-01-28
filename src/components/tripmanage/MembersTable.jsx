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

import { tripAPI } from "../../service/trip.api";


export function MembersTable({
  tripId,
  members = [],
  expenses = [],
  onDeleted,
}) {
  // รวมยอด "จ่ายไป" ต่อคนจาก expenses
  const paidMap = expenses.reduce((acc, e) => {
    const mid = e.paidByMemberId;
    const amt = Number(e.amount) || 0;
    if (!mid) return acc;
    acc[mid] = (acc[mid] || 0) + amt;
    return acc;
  }, {});

  const formatMoney = (n) =>
    (Number(n) || 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

const remove = async (memberId) => {
  if (!tripId) return;

  const ok = confirm("Remove this member?");
  if (!ok) return;

  try {
    await tripAPI.deleteMember(tripId, memberId);

    // ✅ เรียกหลังลบสำเร็จจริง
    onDeleted?.();
  } catch (err) {
    alert(
      err?.response?.data?.message ||
      "Failed to remove member"
    );
  }
};


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
            <TableCell
              colSpan={3}
              className="text-center text-muted-foreground"
            >
              No members yet
            </TableCell>
          </TableRow>
        ) : (
          members.map((m) => (
            <TableRow key={m._id}>
              <TableCell className="font-medium">{m.name}</TableCell>

              <TableCell className="text-right">
                {formatMoney(paidMap[m._id] || 0)}
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
                    {/* future: edit name */}
                    <DropdownMenuItem disabled>Edit</DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => remove(m._id)}
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
