import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Droplets, TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getSession } from "../lib/auth";
const generateMockData = () => {
  const now = new Date();
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
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
  const metrics = [{
    title: "pH Level",
    value: "7.4",
    unit: "pH",
    status: "normal",
    change: "+0.2",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  }, {
    title: "Turbidity",
    value: "1.2",
    unit: "NTU",
    status: "normal",
    change: "-0.3",
    icon: Activity,
    color: "text-green-600",
    bgColor: "bg-green-100"
  }, {
    title: "Chlorine",
    value: "2.1",
    unit: "mg/L",
    status: "normal",
    change: "+0.1",
    icon: CheckCircle,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100"
  }, {
    title: "Flow Rate",
    value: "2,750",
    unit: "L/min",
    status: "normal",
    change: "+150",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }];
  const alerts = [{
    id: 1,
    type: "warning",
    message: "Filter 3 requires maintenance soon",
    time: "2 hours ago"
  }, {
    id: 2,
    type: "success",
    message: "Monthly quality test completed",
    time: "5 hours ago"
  }];
  return <div className="p-6 space-y-6"><div><h1>Dashboard</h1><p className="text-gray-600 mt-1">Welcome back, {userName || "User"}. Here's your water treatment overview.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{metrics.map(metric => <Card key={metric.title}><CardContent className="p-6"><div className="flex items-start justify-between"><div className="flex-1"><p className="text-sm text-gray-600">{metric.title}</p><div className="flex items-baseline gap-2 mt-2"><h2>{metric.value}</h2><span className="text-sm text-gray-600">{metric.unit}</span></div><div className="flex items-center gap-2 mt-2">{metric.change.startsWith("+") ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}<span className={`text-sm ${metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{metric.change}</span></div></div><div className={`${metric.bgColor} p-3 rounded-lg`}><metric.icon className={`w-6 h-6 ${metric.color}`} /></div></div></CardContent></Card>)}</div><div className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle>pH Levels (Last 7 Days)</CardTitle><CardDescription>Daily pH monitoring results</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis domain={[6.5, 8.5]} /><Tooltip /><Legend /><Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={2} name="pH Level" /></LineChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>Flow Rate (Last 7 Days)</CardTitle><CardDescription>Water flow rate in liters per minute</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend /><Bar dataKey="flowRate" fill="#8b5cf6" name="Flow Rate (L/min)" /></BarChart></ResponsiveContainer></CardContent></Card></div><div className="grid gap-6 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader><CardTitle>Recent Alerts</CardTitle><CardDescription>System notifications and warnings</CardDescription></CardHeader><CardContent><div className="space-y-4">{alerts.map(alert => <div className="flex items-start gap-4 p-4 border rounded-lg" key={alert.id}>{alert.type === "warning" ? <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" /> : <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}<div className="flex-1"><p>{alert.message}</p><div className="flex items-center gap-1 mt-1 text-sm text-gray-500"><Clock className="w-3 h-3" /><span>{alert.time}</span></div></div><Badge variant={alert.type === "warning" ? "outline" : "secondary"}>{alert.type}</Badge></div>)}</div></CardContent></Card><Card><CardHeader><CardTitle>System Status</CardTitle><CardDescription>Current operational status</CardDescription></CardHeader><CardContent><div className="space-y-4"><div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span>Pumps</span><Badge className="bg-green-600">Active</Badge></div><div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span>Filters</span><Badge className="bg-green-600">Active</Badge></div><div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"><span>Backup Power</span><Badge className="bg-yellow-600">Standby</Badge></div><div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span>Monitoring</span><Badge className="bg-green-600">Active</Badge></div></div></CardContent></Card></div></div>;
}
export { Dashboard };
