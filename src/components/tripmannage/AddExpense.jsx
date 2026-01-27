import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "../../hooks/use-media-query"; // ✅ ใช้อันเดิมของอัส


export default function AddExpense({ members = [], onAdd }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleAdded = (expense) => {
    onAdd?.(expense);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="button1">Add</button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add expense</DialogTitle>
            <DialogDescription>
              Add an expense and choose payer & split members.
            </DialogDescription>
          </DialogHeader>

          <ExpenseForm members={members} onSubmit={handleAdded} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>+ Add Expense</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add expense</DrawerTitle>
          <DrawerDescription>
            Add an expense and choose payer & split members.
          </DrawerDescription>
        </DrawerHeader>

        <ExpenseForm className="px-4" members={members} onSubmit={handleAdded} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function uid() {
  return crypto.randomUUID?.() || String(Date.now());
}

function ExpenseForm({ className, members = [], onSubmit }) {
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("Food");
  const [paidByMemberId, setPaidByMemberId] = React.useState("");
  const [splitAmongIds, setSplitAmongIds] = React.useState([]);

  const toggleSplit = (id) => {
    setSplitAmongIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const t = title.trim();
    const n = Number(amount);

    if (!members.length) return alert("Please add members first");
    if (!t) return alert("Please enter expense title");
    if (!Number.isFinite(n) || n <= 0) return alert("Amount must be > 0");
    if (!paidByMemberId) return alert("Select payer");
    if (splitAmongIds.length === 0) return alert("Select at least 1 member to split");

    const expense = {
      id: uid(),
      title: t,
      amount: n,
      category,
      paidByMemberId,
      splitAmongIds,
      date: new Date().toISOString().slice(0, 10),
    };

    onSubmit?.(expense);

    // reset
    setTitle("");
    setAmount("");
    setCategory("Food");
    setPaidByMemberId("");
    setSplitAmongIds([]);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("grid gap-6", className)}>
      {/* Title */}
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input
          placeholder="Dinner / Taxi / Hotel..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Amount */}
      <div className="grid gap-2">
        <Label>Amount</Label>
        <Input
          inputMode="decimal"
          placeholder="120"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="grid gap-2">
        <Label>Category</Label>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Hotel">Hotel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Paid by */}
      <div className="grid gap-2">
        <Label>Paid by</Label>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={paidByMemberId}
          onChange={(e) => setPaidByMemberId(e.target.value)}
        >
          <option value="">Select payer</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Split among */}
      <div className="grid gap-2">
        <Label>Split among</Label>
        <div className="flex flex-wrap gap-2">
          {members.map((m) => {
            const active = splitAmongIds.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleSplit(m.id)}
                className={cn(
                  "px-3 py-2 rounded-full border text-sm transition ",
                  active
                    ? "bg-white text-black border-white"
                    : "border-white/15 hover:bg-white/5"
                )}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit">Save Expense</Button>
    </form>
  );
}
