import { createHashRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { ModuleLayout } from "./components/ModuleLayout";
import { DataEntry } from "./components/DataEntry";
import { Analytics } from "./components/Analytics";
import { WaterQuality } from "./components/WaterQuality";
import { RequireFeature } from "./components/RequireFeature";
import { Profile } from "./components/Profile";
import { LabDoses } from "./components/LabDoses";
import { AssetsReadings } from "./components/AssetsReadings";
import { AssetsMaintenanceHistory } from "./components/AssetsMaintenanceHistory";
import { UsersList } from "./components/UsersList";
import { UsersCreate } from "./components/UsersCreate";

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
        element: <Navigate to="/lab/past-readings" replace />,
      },
      {
        path: "lab",
        element: (
          <RequireFeature feature="lab">
            <ModuleLayout
              title="Lab"
              description="Water quality operations and analysis"
              tabs={[
                { to: "past-readings", label: "Past Readings" },
                { to: "enter-data", label: "Enter Data" },
                { to: "trends", label: "Trends" },
                { to: "doses", label: "Doses" },
              ]}
            />
          </RequireFeature>
        ),
        children: [
          { index: true, element: <Navigate to="past-readings" replace /> },
          { path: "past-readings", element: <WaterQuality /> },
          { path: "enter-data", element: <DataEntry /> },
          { path: "trends", element: <Analytics /> },
          { path: "doses", element: <LabDoses /> },
        ],
      },
      {
        path: "assets",
        element: (
          <RequireFeature feature="assets">
            <ModuleLayout
              title="Assets"
              description="Asset readings and maintenance tracking"
              tabs={[
                { to: "readings", label: "Readings" },
                { to: "maintenance-history", label: "Maintenance History" },
              ]}
            />
          </RequireFeature>
        ),
        children: [
          { index: true, element: <Navigate to="readings" replace /> },
          { path: "readings", element: <AssetsReadings /> },
          { path: "maintenance-history", element: <AssetsMaintenanceHistory /> },
        ],
      },
      {
        path: "users",
        element: (
          <RequireFeature feature="user-management">
            <ModuleLayout
              title="Users"
              description="Manage system users and roles"
              tabs={[
                { to: "list", label: "Users List" },
                { to: "create", label: "Create User" },
              ]}
            />
          </RequireFeature>
        ),
        children: [
          { index: true, element: <Navigate to="list" replace /> },
          { path: "list", element: <UsersList /> },
          { path: "create", element: <UsersCreate /> },
        ],
      },
      { path: "profile", element: <Profile /> },
    ],
  },
]

);
