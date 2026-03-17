import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AlertCircle, CheckCircle, AlertTriangle, FileDown } from "lucide-react";
function WaterQuality() {
  const [readings, setReadings] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const storedData = localStorage.getItem("waterQualityData");
    if (storedData) {
      setReadings(JSON.parse(storedData).reverse());
    } else {
      const mockData = Array.from({
        length: 15
      }, (_, i) => {
        const date = new Date();
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
  const getStatus = reading => {
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
  const formatLocation = location => {
    return location.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  const filteredReadings = filter === "all" ? readings : readings.filter(r => getStatus(r) === filter);
  const statusCounts = {
    normal: readings.filter(r => getStatus(r) === "normal").length,
    warning: readings.filter(r => getStatus(r) === "warning").length,
    alert: readings.filter(r => getStatus(r) === "alert").length
  };
  const handleExport = () => {
    const csv = [["Date", "Time", "pH", "Turbidity", "Chlorine", "Flow Rate", "Temperature", "Operator", "Location", "Status"].join(","), ...filteredReadings.map(r => [r.date, r.time, r.ph, r.turbidity, r.chlorine, r.flowRate, r.temperature, r.operator, formatLocation(r.location), getStatus(r)].join(","))].join("\n");
    const blob = new Blob([csv], {
      type: "text/csv"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `water-quality-${(new Date()).toISOString().split("T")[0]}.csv`;
    a.click();
  };
  return <div className="p-6 space-y-6"><div className="flex items-start justify-between"><div><h1>Water Quality Readings</h1><p className="text-gray-600 mt-1">View and analyze all water quality measurements</p></div><Button onClick={handleExport} className="gap-2"><FileDown className="w-4 h-4" />Export CSV</Button></div><div className="grid gap-4 md:grid-cols-3"><Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Normal</p><p className="text-3xl font-semibold mt-1">{statusCounts.normal}</p></div><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle className="w-6 h-6 text-green-600" /></div></div></CardContent></Card><Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Warning</p><p className="text-3xl font-semibold mt-1">{statusCounts.warning}</p></div><div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-yellow-600" /></div></div></CardContent></Card><Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Alert</p><p className="text-3xl font-semibold mt-1">{statusCounts.alert}</p></div><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><AlertCircle className="w-6 h-6 text-red-600" /></div></div></CardContent></Card></div><Card><CardHeader><div className="flex items-center justify-between"><div><CardTitle>Recent Readings</CardTitle><CardDescription>All water quality measurements and their status</CardDescription></div><div className="w-40"><Select value={filter} onValueChange={setFilter}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="normal">Normal</SelectItem><SelectItem value="warning">Warning</SelectItem><SelectItem value="alert">Alert</SelectItem></SelectContent></Select></div></div></CardHeader><CardContent><div className="rounded-md border"><Table><TableHeader><TableRow><TableHead>Date & Time</TableHead><TableHead>pH</TableHead><TableHead>Turbidity</TableHead><TableHead>Chlorine</TableHead><TableHead>Flow Rate</TableHead><TableHead>Temp</TableHead><TableHead>Location</TableHead><TableHead>Operator</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{filteredReadings.length === 0 ? <TableRow><TableCell colSpan={9} className="text-center py-8 text-gray-500">No readings found</TableCell></TableRow> : filteredReadings.map(reading => {
                const status = getStatus(reading);
                return <TableRow key={reading.id}><TableCell><div><p className="font-medium">{reading.date}</p><p className="text-sm text-gray-600">{reading.time}</p></div></TableCell><TableCell>{reading.ph}</TableCell><TableCell>{reading.turbidity} NTU</TableCell><TableCell>{reading.chlorine} mg/L</TableCell><TableCell>{reading.flowRate} L/min</TableCell><TableCell>{reading.temperature}°C</TableCell><TableCell className="text-sm">{formatLocation(reading.location)}</TableCell><TableCell className="text-sm">{reading.operator}</TableCell><TableCell><Badge variant={status === "normal" ? "secondary" : "outline"} className={status === "alert" ? "bg-red-100 text-red-700 border-red-300" : status === "warning" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-green-100 text-green-700 border-green-300"}>{status === "alert" && <AlertCircle className="w-3 h-3 mr-1" />}{status === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}{status === "normal" && <CheckCircle className="w-3 h-3 mr-1" />}{status.charAt(0).toUpperCase() + status.slice(1)}</Badge></TableCell></TableRow>;
              })}</TableBody></Table></div></CardContent></Card></div>;
}
export { WaterQuality };
