import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { DataEntry } from "./components/DataEntry";
import { Analytics } from "./components/Analytics";
import { WaterQuality } from "./components/WaterQuality";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "data-entry", element: <DataEntry /> },
      { path: "analytics", element: <Analytics /> },
      { path: "water-quality", element: <WaterQuality /> },
    ],
  },
]);