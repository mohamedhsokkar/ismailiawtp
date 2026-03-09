import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
const generateHistoricalData = (days) => {
  const data = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ph: 7 + Math.random() * 0.8 - 0.2,
      turbidity: 0.5 + Math.random() * 1,
      chlorine: 1.8 + Math.random() * 0.8,
      flowRate: 2400 + Math.random() * 600,
      temperature: 18 + Math.random() * 6
    });
  }
  return data;
};
const complianceData = [
  { name: "Compliant", value: 94, color: "#10b981" },
  { name: "Warning", value: 5, color: "#f59e0b" },
  { name: "Non-compliant", value: 1, color: "#ef4444" }
];
const treatmentEfficiency = [
  { stage: "Filtration", efficiency: 98 },
  { stage: "Chlorination", efficiency: 99 },
  { stage: "pH Adjustment", efficiency: 96 },
  { stage: "Sedimentation", efficiency: 95 }
];
function Analytics() {
  const [timeRange, setTimeRange] = useState("30");
  const [data] = useState(() => generateHistoricalData(parseInt(timeRange)));
  return /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { children: "Analytics" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Detailed water quality trends and statistical analysis" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-40", children: /* @__PURE__ */ jsxs(Select, { value: timeRange, onValueChange: setTimeRange, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "7", children: "Last 7 days" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "30", children: "Last 30 days" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "90", children: "Last 90 days" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "trends", className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full max-w-md grid-cols-3", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "trends", children: "Trends" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "compliance", children: "Compliance" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "efficiency", children: "Efficiency" })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "trends", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "pH Level Trend" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Historical pH measurements over time" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 350, children: /* @__PURE__ */ jsxs(AreaChart, { data, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "colorPh", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.3 }),
              /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
            /* @__PURE__ */ jsx(YAxis, { domain: [6.5, 8.5] }),
            /* @__PURE__ */ jsx(Tooltip, {}),
            /* @__PURE__ */ jsx(Legend, {}),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "ph",
                stroke: "#3b82f6",
                fillOpacity: 1,
                fill: "url(#colorPh)",
                name: "pH Level"
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Multiple Parameters" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Chlorine and turbidity levels comparison" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 350, children: /* @__PURE__ */ jsxs(LineChart, { data, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
            /* @__PURE__ */ jsx(YAxis, { yAxisId: "left" }),
            /* @__PURE__ */ jsx(YAxis, { yAxisId: "right", orientation: "right" }),
            /* @__PURE__ */ jsx(Tooltip, {}),
            /* @__PURE__ */ jsx(Legend, {}),
            /* @__PURE__ */ jsx(
              Line,
              {
                yAxisId: "left",
                type: "monotone",
                dataKey: "chlorine",
                stroke: "#06b6d4",
                strokeWidth: 2,
                name: "Chlorine (mg/L)"
              }
            ),
            /* @__PURE__ */ jsx(
              Line,
              {
                yAxisId: "right",
                type: "monotone",
                dataKey: "turbidity",
                stroke: "#10b981",
                strokeWidth: 2,
                name: "Turbidity (NTU)"
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Water Temperature" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Temperature variations" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(AreaChart, { data, children: [
              /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "colorTemp", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "#f59e0b", stopOpacity: 0.3 }),
                /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "#f59e0b", stopOpacity: 0 })
              ] }) }),
              /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
              /* @__PURE__ */ jsx(YAxis, {}),
              /* @__PURE__ */ jsx(Tooltip, {}),
              /* @__PURE__ */ jsx(Legend, {}),
              /* @__PURE__ */ jsx(
                Area,
                {
                  type: "monotone",
                  dataKey: "temperature",
                  stroke: "#f59e0b",
                  fillOpacity: 1,
                  fill: "url(#colorTemp)",
                  name: "Temperature (\xB0C)"
                }
              )
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Flow Rate" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Water flow measurements" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data, children: [
              /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
              /* @__PURE__ */ jsx(YAxis, {}),
              /* @__PURE__ */ jsx(Tooltip, {}),
              /* @__PURE__ */ jsx(Legend, {}),
              /* @__PURE__ */ jsx(Bar, { dataKey: "flowRate", fill: "#8b5cf6", name: "Flow Rate (L/min)" })
            ] }) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "compliance", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Overall Compliance Rate" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Distribution of compliance status" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 350, children: /* @__PURE__ */ jsxs(PieChart, { children: [
              /* @__PURE__ */ jsx(
                Pie,
                {
                  data: complianceData,
                  cx: "50%",
                  cy: "50%",
                  labelLine: false,
                  label: ({ name, value }) => `${name}: ${value}%`,
                  outerRadius: 120,
                  fill: "#8884d8",
                  dataKey: "value",
                  children: complianceData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
                }
              ),
              /* @__PURE__ */ jsx(Tooltip, {})
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Compliance Summary" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Key compliance metrics" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-6 pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between p-4 bg-green-50 rounded-lg", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Compliant Readings" }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-green-700", children: "94%" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between p-4 bg-yellow-50 rounded-lg", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Warning Level" }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-yellow-700", children: "5%" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between p-4 bg-red-50 rounded-lg", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Non-compliant" }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-red-700", children: "1%" })
              ] }) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Parameter Compliance Details" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Individual parameter compliance rates" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
            { param: "pH Level", compliance: 98, target: "6.5-8.5" },
            { param: "Turbidity", compliance: 96, target: "< 1.0 NTU" },
            { param: "Chlorine", compliance: 99, target: "0.5-3.0 mg/L" },
            { param: "Temperature", compliance: 100, target: "< 25\xB0C" }
          ].map((item) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: item.param }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                  "Target: ",
                  item.target
                ] })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                item.compliance,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `h-full ${item.compliance >= 95 ? "bg-green-500" : "bg-yellow-500"}`,
                style: { width: `${item.compliance}%` }
              }
            ) })
          ] }, item.param)) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "efficiency", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Treatment Process Efficiency" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Performance of each treatment stage" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 350, children: /* @__PURE__ */ jsxs(BarChart, { data: treatmentEfficiency, layout: "vertical", children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx(XAxis, { type: "number", domain: [0, 100] }),
            /* @__PURE__ */ jsx(YAxis, { dataKey: "stage", type: "category", width: 120 }),
            /* @__PURE__ */ jsx(Tooltip, {}),
            /* @__PURE__ */ jsx(Legend, {}),
            /* @__PURE__ */ jsx(Bar, { dataKey: "efficiency", fill: "#3b82f6", name: "Efficiency (%)" })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Energy Usage" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Last 30 days" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: "12,450" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "kWh consumed" }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-sm text-green-600", children: /* @__PURE__ */ jsx("span", { children: "\u2193 5% vs. previous month" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Water Recovery" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Process efficiency" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: "97.8%" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Recovery rate" }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-sm text-green-600", children: /* @__PURE__ */ jsx("span", { children: "\u2191 1.2% vs. previous month" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Chemical Usage" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Optimization status" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: "92%" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Efficiency rating" }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-sm text-green-600", children: /* @__PURE__ */ jsx("span", { children: "\u2191 3% vs. previous month" }) })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Analytics
};
