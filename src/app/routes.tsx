import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { DataEntry } from "./components/DataEntry";
import { Analytics } from "./components/Analytics";
import { WaterQuality } from "./components/WaterQuality";
import { RequireFeature } from "./components/RequireFeature";

export const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <RequireFeature feature="dashboard">
            <Dashboard />
          </RequireFeature>
        ),
      },
      {
        path: "data-entry",
        element: (
          <RequireFeature feature="data-entry">
            <DataEntry />
          </RequireFeature>
        ),
      },
      {
        path: "analytics",
        element: (
          <RequireFeature feature="analytics">
            <Analytics />
          </RequireFeature>
        ),
      },
      {
        path: "water-quality",
        element: (
          <RequireFeature feature="water-quality">
            <WaterQuality />
          </RequireFeature>
        ),
      },
    ],
  },
]

);
