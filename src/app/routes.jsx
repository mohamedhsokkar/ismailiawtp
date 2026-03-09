import { jsx } from "react/jsx-runtime";
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
import { Dashboard } from "./components/Dashboard";
import { Issues } from "./components/Issues";
const router = createHashRouter(
  [
    {
      path: "/login",
      element: /* @__PURE__ */ jsx(Login, {})
    },
    {
      path: "/",
      element: /* @__PURE__ */ jsx(Layout, {}),
      children: [
        {
          index: true,
          element: /* @__PURE__ */ jsx(Navigate, { to: "/dashboard", replace: true })
        },
        { path: "dashboard", element: /* @__PURE__ */ jsx(Dashboard, {}) },
        {
          path: "lab",
          element: /* @__PURE__ */ jsx(RequireFeature, { feature: "lab", children: /* @__PURE__ */ jsx(
            ModuleLayout,
            {
              title: "Lab",
              description: "Water quality operations and analysis",
              tabs: [
                { to: "past-readings", label: "Past Readings" },
                { to: "enter-data", label: "Enter Data" },
                { to: "trends", label: "Trends" },
                { to: "doses", label: "Doses" }
              ]
            }
          ) }),
          children: [
            { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "past-readings", replace: true }) },
            { path: "past-readings", element: /* @__PURE__ */ jsx(WaterQuality, {}) },
            { path: "enter-data", element: /* @__PURE__ */ jsx(DataEntry, {}) },
            { path: "trends", element: /* @__PURE__ */ jsx(Analytics, {}) },
            { path: "doses", element: /* @__PURE__ */ jsx(LabDoses, {}) }
          ]
        },
        {
          path: "assets",
          element: /* @__PURE__ */ jsx(RequireFeature, { feature: "assets", children: /* @__PURE__ */ jsx(
            ModuleLayout,
            {
              title: "Assets",
              description: "Asset readings and maintenance tracking",
              tabs: [
                { to: "readings", label: "Readings" },
                { to: "maintenance-history", label: "Maintenance History" }
              ]
            }
          ) }),
          children: [
            { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "readings", replace: true }) },
            { path: "readings", element: /* @__PURE__ */ jsx(AssetsReadings, {}) },
            { path: "maintenance-history", element: /* @__PURE__ */ jsx(AssetsMaintenanceHistory, {}) }
          ]
        },
        {
          path: "issues",
          element: /* @__PURE__ */ jsx(RequireFeature, { feature: "issues", children: /* @__PURE__ */ jsx(Issues, {}) })
        },
        {
          path: "users",
          element: /* @__PURE__ */ jsx(RequireFeature, { feature: "user-management", children: /* @__PURE__ */ jsx(
            ModuleLayout,
            {
              title: "Users",
              description: "Manage system users and roles",
              tabs: [
                { to: "list", label: "Users List" },
                { to: "create", label: "Create User" }
              ]
            }
          ) }),
          children: [
            { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "list", replace: true }) },
            { path: "list", element: /* @__PURE__ */ jsx(UsersList, {}) },
            { path: "create", element: /* @__PURE__ */ jsx(UsersCreate, {}) }
          ]
        },
        { path: "profile", element: /* @__PURE__ */ jsx(Profile, {}) }
      ]
    }
  ]
);
export {
  router
};
