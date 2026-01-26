import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Layout from './page/Layout'
import TripDashboard from "./page/trip/TripDashboard";
import TripMembers from "./page/trip/TripMembers";
import TripExpenses from "./page/trip/TripExpenses";
import TripSummary from "./page/trip/TripSummary";
import Home from "./page/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "dashboard",
        element: <TripDashboard/>,
      },
      {
        path: "expenses",
        element: <TripExpenses/>,
      },
      {
        path: "mambers",
        element: <TripMembers/>,
      },
      {
        path: "summary",
        element: <TripSummary/>,
      },
    ]
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App