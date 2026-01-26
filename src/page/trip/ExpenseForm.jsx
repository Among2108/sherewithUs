export default function ExpenseForm({ mode }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">
        {mode === "edit" ? "Edit Expense" : "Add Expense"}
      </h1>
      <p className="text-white/60">MVP: expense form here</p>
    </div>
  );
}
