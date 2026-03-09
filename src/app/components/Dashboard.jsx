import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Droplets,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getSession } from "../lib/auth";
const generateMockData = () => {
  const now = /* @__PURE__ */ new Date();
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ph: 7 + Math.random() * 0.8,
      turbidity: 0.5 + Math.random() * 1.5,
      chlorine: 1.8 + Math.random() * 0.6,
      flowRate: 2500 + Math.random() * 500
    });
  }
  return data;
};
function Dashboard() {
  const [userName, setUserName] = useState("");
  const [chartData] = useState(generateMockData());
  useEffect(() => {
    const session = getSession();
    if (session?.user?.name) setUserName(session.user.name);
  }, []);
  const metrics = [
    {
      title: "pH Level",
      value: "7.4",
      unit: "pH",
      status: "normal",
      change: "+0.2",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Turbidity",
      value: "1.2",
      unit: "NTU",
      status: "normal",
      change: "-0.3",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Chlorine",
      value: "2.1",
      unit: "mg/L",
      status: "normal",
      change: "+0.1",
      icon: CheckCircle,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100"
    },
    {
      title: "Flow Rate",
      value: "2,750",
      unit: "L/min",
      status: "normal",
      change: "+150",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Filter 3 requires maintenance soon",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "success",
      message: "Monthly quality test completed",
      time: "5 hours ago"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Dashboard" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mt-1", children: [
        "Welcome back, ",
        userName || "User",
        ". Here's your water treatment overview."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: metrics.map((metric) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: metric.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 mt-2", children: [
          /* @__PURE__ */ jsx("h2", { children: metric.value }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: metric.unit })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
          metric.change.startsWith("+") ? /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-green-600" }) : /* @__PURE__ */ jsx(TrendingDown, { className: "w-4 h-4 text-red-600" }),
          /* @__PURE__ */ jsx("span", { className: `text-sm ${metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}`, children: metric.change })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `${metric.bgColor} p-3 rounded-lg`, children: /* @__PURE__ */ jsx(metric.icon, { className: `w-6 h-6 ${metric.color}` }) })
    ] }) }) }, metric.title)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "pH Levels (Last 7 Days)" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Daily pH monitoring results" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(LineChart, { data: chartData, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
          /* @__PURE__ */ jsx(YAxis, { domain: [6.5, 8.5] }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Legend, {}),
          /* @__PURE__ */ jsx(
            Line,
            {
              type: "monotone",
              dataKey: "ph",
              stroke: "#3b82f6",
              strokeWidth: 2,
              name: "pH Level"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Flow Rate (Last 7 Days)" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Water flow rate in liters per minute" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: chartData, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
          /* @__PURE__ */ jsx(YAxis, {}),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Legend, {}),
          /* @__PURE__ */ jsx(Bar, { dataKey: "flowRate", fill: "#8b5cf6", name: "Flow Rate (L/min)" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Recent Alerts" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "System notifications and warnings" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: alerts.map((alert) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-start gap-4 p-4 border rounded-lg",
            children: [
              alert.type === "warning" ? /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { children: alert.message }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-1 text-sm text-gray-500", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsx("span", { children: alert.time })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Badge, { variant: alert.type === "warning" ? "outline" : "secondary", children: alert.type })
            ]
          },
          alert.id
        )) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "System Status" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Current operational status" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { children: "Pumps" }),
            /* @__PURE__ */ jsx(Badge, { className: "bg-green-600", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { children: "Filters" }),
            /* @__PURE__ */ jsx(Badge, { className: "bg-green-600", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-yellow-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { children: "Backup Power" }),
            /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-600", children: "Standby" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { children: "Monitoring" }),
            /* @__PURE__ */ jsx(Badge, { className: "bg-green-600", children: "Active" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Dashboard
};
