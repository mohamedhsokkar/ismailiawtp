import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
const history = [
  { id: 1, asset: "Pump-01", action: "Bearing replacement", date: "2026-02-18", status: "completed" },
  { id: 2, asset: "Filter-03", action: "Media wash", date: "2026-02-20", status: "completed" },
  { id: 3, asset: "Valve-12", action: "Seal inspection", date: "2026-03-01", status: "scheduled" }
];
function AssetsMaintenanceHistory() {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Maintenance History" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Recent and scheduled maintenance for assets" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "space-y-3", children: history.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: item.asset }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: item.action }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: item.date })
      ] }),
      /* @__PURE__ */ jsx(Badge, { className: item.status === "completed" ? "bg-green-600" : "bg-blue-600", children: item.status })
    ] }, item.id)) })
  ] });
}
export {
  AssetsMaintenanceHistory
};
