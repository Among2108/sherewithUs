import { createBrowserRouter } from "react-router-dom";

import Home from "../page/Home";
import Layout from "../page/Layout";
import TripDashboard from "../page/trip/TripDashboard";
import TripManage from "../page/trip/TripManage";
import TripSummary from "../page/trip/TripSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "trip/:tripId/dashboard", element: <TripDashboard /> },
      { path: "trip/:tripId/manage", element: <TripManage /> },
      { path: "trip/:tripId/summary", element: <TripSummary /> },
    ],
  },
]);
