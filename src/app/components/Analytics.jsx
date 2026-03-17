import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
const generateHistoricalData = days => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
      ph: 7 + Math.random() * 0.8 - 0.2,
      turbidity: 0.5 + Math.random() * 1,
      chlorine: 1.8 + Math.random() * 0.8,
      flowRate: 2400 + Math.random() * 600,
      temperature: 18 + Math.random() * 6
    });
  }
  return data;
};
const complianceData = [{
  name: "Compliant",
  value: 94,
  color: "#10b981"
}, {
  name: "Warning",
  value: 5,
  color: "#f59e0b"
}, {
  name: "Non-compliant",
  value: 1,
  color: "#ef4444"
}];
const treatmentEfficiency = [{
  stage: "Filtration",
  efficiency: 98
}, {
  stage: "Chlorination",
  efficiency: 99
}, {
  stage: "pH Adjustment",
  efficiency: 96
}, {
  stage: "Sedimentation",
  efficiency: 95
}];
function Analytics() {
  const [timeRange, setTimeRange] = useState("30");
  const [data] = useState(() => generateHistoricalData(parseInt(timeRange)));
  return <div className="p-6 space-y-6"><div className="flex items-start justify-between"><div><h1>Analytics</h1><p className="text-gray-600 mt-1">Detailed water quality trends and statistical analysis</p></div><div className="w-40"><Select value={timeRange} onValueChange={setTimeRange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">Last 7 days</SelectItem><SelectItem value="30">Last 30 days</SelectItem><SelectItem value="90">Last 90 days</SelectItem></SelectContent></Select></div></div><Tabs defaultValue="trends" className="space-y-6"><TabsList className="grid w-full max-w-md grid-cols-3"><TabsTrigger value="trends">Trends</TabsTrigger><TabsTrigger value="compliance">Compliance</TabsTrigger><TabsTrigger value="efficiency">Efficiency</TabsTrigger></TabsList><TabsContent value="trends" className="space-y-6"><Card><CardHeader><CardTitle>pH Level Trend</CardTitle><CardDescription>Historical pH measurements over time</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={350}><AreaChart data={data}><defs><linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis domain={[6.5, 8.5]} /><Tooltip /><Legend /><Area type="monotone" dataKey="ph" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPh)" name="pH Level" /></AreaChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>Multiple Parameters</CardTitle><CardDescription>Chlorine and turbidity levels comparison</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={350}><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis yAxisId="left" /><YAxis yAxisId="right" orientation="right" /><Tooltip /><Legend /><Line yAxisId="left" type="monotone" dataKey="chlorine" stroke="#06b6d4" strokeWidth={2} name="Chlorine (mg/L)" /><Line yAxisId="right" type="monotone" dataKey="turbidity" stroke="#10b981" strokeWidth={2} name="Turbidity (NTU)" /></LineChart></ResponsiveContainer></CardContent></Card><div className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle>Water Temperature</CardTitle><CardDescription>Temperature variations</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><AreaChart data={data}><defs><linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend /><Area type="monotone" dataKey="temperature" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTemp)" name="Temperature (\xB0C)" /></AreaChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>Flow Rate</CardTitle><CardDescription>Water flow measurements</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend /><Bar dataKey="flowRate" fill="#8b5cf6" name="Flow Rate (L/min)" /></BarChart></ResponsiveContainer></CardContent></Card></div></TabsContent><TabsContent value="compliance" className="space-y-6"><div className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardTitle>Overall Compliance Rate</CardTitle><CardDescription>Distribution of compliance status</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={350}><PieChart><Pie data={complianceData} cx="50%" cy="50%" labelLine={false} label={({
                    name,
                    value
                  }) => `${name}: ${value}%`} outerRadius={120} fill="#8884d8" dataKey="value">{complianceData.map((entry, index) => <Cell fill={entry.color} key={`cell-${index}`} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>Compliance Summary</CardTitle><CardDescription>Key compliance metrics</CardDescription></CardHeader><CardContent className="space-y-6 pt-6"><div className="space-y-4"><div className="flex items-center justify-between p-4 bg-green-50 rounded-lg"><div><p className="text-sm text-gray-600">Compliant Readings</p><p className="text-2xl font-semibold text-green-700">94%</p></div></div><div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg"><div><p className="text-sm text-gray-600">Warning Level</p><p className="text-2xl font-semibold text-yellow-700">5%</p></div></div><div className="flex items-center justify-between p-4 bg-red-50 rounded-lg"><div><p className="text-sm text-gray-600">Non-compliant</p><p className="text-2xl font-semibold text-red-700">1%</p></div></div></div></CardContent></Card></div><Card><CardHeader><CardTitle>Parameter Compliance Details</CardTitle><CardDescription>Individual parameter compliance rates</CardDescription></CardHeader><CardContent><div className="space-y-4">{[{
                param: "pH Level",
                compliance: 98,
                target: "6.5-8.5"
              }, {
                param: "Turbidity",
                compliance: 96,
                target: "< 1.0 NTU"
              }, {
                param: "Chlorine",
                compliance: 99,
                target: "0.5-3.0 mg/L"
              }, {
                param: "Temperature",
                compliance: 100,
                target: "< 25\xB0C"
              }].map(item => <div className="space-y-2" key={item.param}><div className="flex items-center justify-between"><div className="flex-1"><p className="font-medium">{item.param}</p><p className="text-sm text-gray-600">Target: {item.target}</p></div><span className="font-semibold">{item.compliance}%</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full ${item.compliance >= 95 ? "bg-green-500" : "bg-yellow-500"}`} style={{
                    width: `${item.compliance}%`
                  }} /></div></div>)}</div></CardContent></Card></TabsContent><TabsContent value="efficiency" className="space-y-6"><Card><CardHeader><CardTitle>Treatment Process Efficiency</CardTitle><CardDescription>Performance of each treatment stage</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={350}><BarChart data={treatmentEfficiency} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" domain={[0, 100]} /><YAxis dataKey="stage" type="category" width={120} /><Tooltip /><Legend /><Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency (%)" /></BarChart></ResponsiveContainer></CardContent></Card><div className="grid gap-6 lg:grid-cols-3"><Card><CardHeader><CardTitle>Energy Usage</CardTitle><CardDescription>Last 30 days</CardDescription></CardHeader><CardContent><div className="space-y-2"><div className="text-3xl font-semibold">12,450</div><p className="text-sm text-gray-600">kWh consumed</p><div className="flex items-center gap-2 text-sm text-green-600"><span>↓ 5% vs. previous month</span></div></div></CardContent></Card><Card><CardHeader><CardTitle>Water Recovery</CardTitle><CardDescription>Process efficiency</CardDescription></CardHeader><CardContent><div className="space-y-2"><div className="text-3xl font-semibold">97.8%</div><p className="text-sm text-gray-600">Recovery rate</p><div className="flex items-center gap-2 text-sm text-green-600"><span>↑ 1.2% vs. previous month</span></div></div></CardContent></Card><Card><CardHeader><CardTitle>Chemical Usage</CardTitle><CardDescription>Optimization status</CardDescription></CardHeader><CardContent><div className="space-y-2"><div className="text-3xl font-semibold">92%</div><p className="text-sm text-gray-600">Efficiency rating</p><div className="flex items-center gap-2 text-sm text-green-600"><span>↑ 3% vs. previous month</span></div></div></CardContent></Card></div></TabsContent></Tabs></div>;
}
export { Analytics };
