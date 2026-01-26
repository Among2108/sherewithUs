import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router'
import Layout from '../src/page/Layout'
import TripDashboard from "../src/page/trip/TripDashboard";
import TripMembers from "../src/page/trip/TripMembers";
import TripExpenses from "../src/page/trip/TripExpenses";
import TripSummary from "../src/page/trip/TripSummary";
import Home from "../src/page/Home";

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