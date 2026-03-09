import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
const readings = [
  { asset: "Pump-01", pressure: "6.2 bar", vibration: "2.1 mm/s", temperature: "58 C" },
  { asset: "Filter-03", pressure: "4.8 bar", vibration: "1.4 mm/s", temperature: "42 C" },
  { asset: "Valve-12", pressure: "3.1 bar", vibration: "0.9 mm/s", temperature: "37 C" }
];
function AssetsReadings() {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Asset Readings" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Current operational readings for plant assets" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Asset" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Pressure" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Vibration" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Temperature" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: readings.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: item.asset }),
        /* @__PURE__ */ jsx(TableCell, { children: item.pressure }),
        /* @__PURE__ */ jsx(TableCell, { children: item.vibration }),
        /* @__PURE__ */ jsx(TableCell, { children: item.temperature })
      ] }, item.asset)) })
    ] }) }) })
  ] });
}
export {
  AssetsReadings
};
