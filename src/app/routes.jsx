import { createBrowserRouter } from "react-router";

import Home from "../page/Home";
import TripLayout from "../page/trip/TripLayouy";
import TripDashboard from "../page/trip/TripDashboard";
import TripMembers from "../page/trip/TripMembers";
import TripExpenses from "../page/trip/TripExpenses";
import ExpenseForm from "../page/trip/TripExpenses";
import TripSummary from "../page/trip/TripSummary";

export const router = createBrowserRouter([
  { path: "/", Component: Home },

  {
    path: "/trip/:tripId",
    Component: TripLayout,
    children: [
      { index: true, Component: TripDashboard },
      { path: "members", Component: TripMembers },
      { path: "expenses", Component: TripExpenses },
      {
        path: "expenses/new",
        element: <ExpenseForm mode="create" />,
      },
      {
        path: "expenses/:expenseId/edit",
        element: <ExpenseForm mode="edit" />,
      },
      { path: "summary", Component: TripSummary },
    ],
  },
]);
