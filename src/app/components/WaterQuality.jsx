import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { AlertCircle, CheckCircle, AlertTriangle, FileDown } from "lucide-react";
function WaterQuality() {
  const [readings, setReadings] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const storedData = localStorage.getItem("waterQualityData");
    if (storedData) {
      setReadings(JSON.parse(storedData).reverse());
    } else {
      const mockData = Array.from({ length: 15 }, (_, i) => {
        const date = /* @__PURE__ */ new Date();
        date.setDate(date.getDate() - i);
        return {
          id: Date.now() - i * 1e6,
          date: date.toISOString().split("T")[0],
          time: `${8 + i % 12}:${i * 7 % 60 < 10 ? "0" : ""}${i * 7 % 60}`,
          ph: (7 + Math.random() * 0.8).toFixed(1),
          turbidity: (0.5 + Math.random() * 1).toFixed(1),
          chlorine: (1.8 + Math.random() * 0.8).toFixed(1),
          flowRate: (2400 + Math.random() * 600).toFixed(0),
          temperature: (18 + Math.random() * 6).toFixed(1),
          operator: ["John Smith", "Maria Garcia", "Ahmed Hassan", "Li Wei"][i % 4],
          location: ["main-plant", "reservoir-1", "distribution-point-a"][i % 3],
          notes: i % 3 === 0 ? "Regular reading" : "",
          timestamp: date.toISOString()
        };
      });
      setReadings(mockData);
    }
  }, []);
  const getStatus = (reading) => {
    const ph = parseFloat(reading.ph);
    const turbidity = parseFloat(reading.turbidity);
    const chlorine = parseFloat(reading.chlorine);
    if (ph < 6.5 || ph > 8.5 || turbidity > 1.5 || chlorine < 0.5 || chlorine > 3) {
      return "alert";
    }
    if (ph < 7 || ph > 8 || turbidity > 1 || chlorine < 1 || chlorine > 2.5) {
      return "warning";
    }
    return "normal";
  };
  const formatLocation = (location) => {
    return location.split("-").map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };
  const filteredReadings = filter === "all" ? readings : readings.filter((r) => getStatus(r) === filter);
  const statusCounts = {
    normal: readings.filter((r) => getStatus(r) === "normal").length,
    warning: readings.filter((r) => getStatus(r) === "warning").length,
    alert: readings.filter((r) => getStatus(r) === "alert").length
  };
  const handleExport = () => {
    const csv = [
      ["Date", "Time", "pH", "Turbidity", "Chlorine", "Flow Rate", "Temperature", "Operator", "Location", "Status"].join(","),
      ...filteredReadings.map((r) => [
        r.date,
        r.time,
        r.ph,
        r.turbidity,
        r.chlorine,
        r.flowRate,
        r.temperature,
        r.operator,
        formatLocation(r.location),
        getStatus(r)
      ].join(","))
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `water-quality-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    a.click();
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { children: "Water Quality Readings" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "View and analyze all water quality measurements" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleExport, className: "gap-2", children: [
        /* @__PURE__ */ jsx(FileDown, { className: "w-4 h-4" }),
        "Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Normal" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-semibold mt-1", children: statusCounts.normal })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-green-600" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Warning" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-semibold mt-1", children: statusCounts.warning })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-yellow-600" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Alert" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-semibold mt-1", children: statusCounts.alert })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-red-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6 text-red-600" }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Recent Readings" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "All water quality measurements and their status" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-40", children: /* @__PURE__ */ jsxs(Select, { value: filter, onValueChange: setFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "normal", children: "Normal" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "warning", children: "Warning" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "alert", children: "Alert" })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Date & Time" }),
          /* @__PURE__ */ jsx(TableHead, { children: "pH" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Turbidity" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Chlorine" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Flow Rate" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Temp" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Location" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Operator" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: filteredReadings.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 9, className: "text-center py-8 text-gray-500", children: "No readings found" }) }) : filteredReadings.map((reading) => {
          const status = getStatus(reading);
          return /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: reading.date }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: reading.time })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: reading.ph }),
            /* @__PURE__ */ jsxs(TableCell, { children: [
              reading.turbidity,
              " NTU"
            ] }),
            /* @__PURE__ */ jsxs(TableCell, { children: [
              reading.chlorine,
              " mg/L"
            ] }),
            /* @__PURE__ */ jsxs(TableCell, { children: [
              reading.flowRate,
              " L/min"
            ] }),
            /* @__PURE__ */ jsxs(TableCell, { children: [
              reading.temperature,
              "\xB0C"
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: formatLocation(reading.location) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: reading.operator }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
              Badge,
              {
                variant: status === "normal" ? "secondary" : "outline",
                className: status === "alert" ? "bg-red-100 text-red-700 border-red-300" : status === "warning" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-green-100 text-green-700 border-green-300",
                children: [
                  status === "alert" && /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3 mr-1" }),
                  status === "warning" && /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3 h-3 mr-1" }),
                  status === "normal" && /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3 mr-1" }),
                  status.charAt(0).toUpperCase() + status.slice(1)
                ]
              }
            ) })
          ] }, reading.id);
        }) })
      ] }) }) })
    ] })
  ] });
}
export {
  WaterQuality
};
