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
import { useMediaQuery } from "../../hooks/use-media-query";
import { expenseAPI } from "../../service/expense.api";

export default function AddExpense({ tripId, members = [], onAdded }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSaved = () => {
    setOpen(false);
    onAdded?.();
  };

  const Content = (
    <ExpenseForm
      tripId={tripId}
      members={members}
      onSaved={handleSaved}
    />
  );

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
          {Content}
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
        <div className="px-4">{Content}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ExpenseForm({ className, tripId, members = [], onSaved }) {
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("Food");

  const [paidByMemberId, setPaidByMemberId] = React.useState("");
  const [splitAmongIds, setSplitAmongIds] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const toggleSplit = (id) => {
    setSplitAmongIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const t = title.trim();
    const n = Number(amount);

    if (!tripId) return alert("Missing tripId");
    if (!members.length) return alert("Please add members first");
    if (!t) return alert("Please enter expense title");
    if (!Number.isFinite(n) || n <= 0) return alert("Amount must be > 0");
    if (!paidByMemberId) return alert("Select payer");
    if (splitAmongIds.length === 0)
      return alert("Select at least 1 member to split");

    try {
      setLoading(true);
      setError("");

      await expenseAPI.create(tripId, {
        title: t,
        amount: n,
        category,
        paidByMemberId,
        splitAmongIds,
        date: new Date().toISOString().slice(0, 10),
      });

      setTitle("");
      setAmount("");
      setCategory("Food");
      setPaidByMemberId("");
      setSplitAmongIds([]);

      onSaved?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("grid gap-6", className)}>
      {/* Title */}
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Amount */}
      <div className="grid gap-2">
        <Label>Amount</Label>
        <Input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Category */}
      <div className="grid gap-2">
        <Label>Category</Label>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Hotel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
      </div>

      {/* ✅ Paid by (Glass – single select) */}
   {/* ✅ Paid by (Glass slider – single select) */}
<div className="grid gap-2 ">
  <Label>Paid by</Label>

  <div className="relative w-fit bg-blue-600 rounded-full">
    {/* container */}
    <div
      className={cn(
        "relative inline-flex items-center rounded-full p-1",
        "border border-white/15",
        "bg-white/5 backdrop-blur-sm"
      )}
    >
      {/* glass pill (ตัวแก้วที่เลื่อน) */}
      {members.length > 0 && (
        <div
          className={cn(
            "absolute top-1 bottom-1 rounded-full glass-chip",
            "transition-all duration-300 ease-out"
          )}
          style={{
            width: `calc(100% / ${members.length})`,
            left:
              paidByMemberId
                ? `calc((100% / ${members.length}) * ${Math.max(
                    0,
                    members.findIndex((m) => m._id === paidByMemberId)
                  )})`
                : "0%",
          }}
        />
      )}

      {/* buttons */}
      {members.map((m) => {
        const active = paidByMemberId === m._id;

        return (
          <button
            key={m._id}
            type="button"
            disabled={loading}
            onClick={() => setPaidByMemberId(m._id)}
            className={cn(
              "relative z-10 px-4 py-2 rounded-full text-sm font-medium",
              "transition-colors duration-200",
              loading && "opacity-60 cursor-not-allowed",
              active ? "text-black" : "text-white/80 hover:text-white"
            )}
          >
            {m.name}
          </button>
        );
      })}
    </div>
  </div>
</div>


      {/* ✅ Split among (Glass – multi select) */}
      <div className="grid gap-2">
        <Label>Split among</Label>

        <div className="flex flex-wrap gap-3 rounded-full p-1 bg-violet-600 backdrop-blur-sm w-fit">
          {members.map((m) => {
            const active = splitAmongIds.includes(m._id);

            return (
              <button
                key={m._id}
                type="button"
                disabled={loading}
                onClick={() => toggleSplit(m._id)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all",
                  "text-white",
                  loading && "opacity-60 cursor-not-allowed",
                  active
                    ? "glass-chip text-black"
                    : "border border-white/10 hover:bg-white/10"
                )}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Expense"}
      </Button>
    </form>
  );
}
