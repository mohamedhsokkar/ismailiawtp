import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { Save, Plus } from "lucide-react";
function DataEntry() {
  const [formData, setFormData] = useState({
    date: (new Date()).toISOString().split("T")[0],
    time: (new Date()).toTimeString().split(" ")[0].slice(0, 5),
    ph: "",
    turbidity: "",
    chlorine: "",
    flowRate: "",
    temperature: "",
    operator: "",
    location: "main-plant",
    notes: ""
  });
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem("waterQualityData") || "[]");
    existingData.push({
      ...formData,
      id: Date.now(),
      timestamp: (new Date()).toISOString()
    });
    localStorage.setItem("waterQualityData", JSON.stringify(existingData));
    toast.success("Water quality data recorded successfully");
    setFormData({
      date: (new Date()).toISOString().split("T")[0],
      time: (new Date()).toTimeString().split(" ")[0].slice(0, 5),
      ph: "",
      turbidity: "",
      chlorine: "",
      flowRate: "",
      temperature: "",
      operator: "",
      location: "main-plant",
      notes: ""
    });
  };
  return <div className="p-6 max-w-4xl mx-auto space-y-6"><div><h1>Data Entry</h1><p className="text-gray-600 mt-1">Record water quality measurements and treatment data</p></div><Card><CardHeader><CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5" />New Water Quality Reading</CardTitle><CardDescription>Enter all measurement values from the current sampling session</CardDescription></CardHeader><CardContent><form onSubmit={handleSubmit} className="space-y-6"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="date">Date</Label><Input id="date" type="date" value={formData.date} onChange={e => handleChange("date", e.target.value)} required={true} /></div><div className="space-y-2"><Label htmlFor="time">Time</Label><Input id="time" type="time" value={formData.time} onChange={e => handleChange("time", e.target.value)} required={true} /></div></div><div className="space-y-4"><h3 className="font-semibold">Measurements</h3><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="ph">pH Level</Label><div className="relative"><Input id="ph" type="number" step="0.1" min="0" max="14" placeholder="7.0" value={formData.ph} onChange={e => handleChange("ph", e.target.value)} required={true} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">pH</span></div></div><div className="space-y-2"><Label htmlFor="turbidity">Turbidity</Label><div className="relative"><Input id="turbidity" type="number" step="0.1" min="0" placeholder="1.5" value={formData.turbidity} onChange={e => handleChange("turbidity", e.target.value)} required={true} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">NTU</span></div></div><div className="space-y-2"><Label htmlFor="chlorine">Chlorine Level</Label><div className="relative"><Input id="chlorine" type="number" step="0.1" min="0" placeholder="2.0" value={formData.chlorine} onChange={e => handleChange("chlorine", e.target.value)} required={true} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">mg/L</span></div></div><div className="space-y-2"><Label htmlFor="temperature">Temperature</Label><div className="relative"><Input id="temperature" type="number" step="0.1" placeholder="20.5" value={formData.temperature} onChange={e => handleChange("temperature", e.target.value)} required={true} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">°C</span></div></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="flowRate">Flow Rate</Label><div className="relative"><Input id="flowRate" type="number" step="10" min="0" placeholder="2500" value={formData.flowRate} onChange={e => handleChange("flowRate", e.target.value)} required={true} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">L/min</span></div></div></div></div><div className="space-y-4"><h3 className="font-semibold">Additional Information</h3><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="operator">Operator Name</Label><Input id="operator" type="text" placeholder="Enter your name" value={formData.operator} onChange={e => handleChange("operator", e.target.value)} required={true} /></div><div className="space-y-2"><Label htmlFor="location">Location</Label><Select value={formData.location} onValueChange={value => handleChange("location", value)}><SelectTrigger id="location"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="main-plant">Main Plant</SelectItem><SelectItem value="reservoir-1">Reservoir 1</SelectItem><SelectItem value="reservoir-2">Reservoir 2</SelectItem><SelectItem value="distribution-point-a">Distribution Point A</SelectItem><SelectItem value="distribution-point-b">Distribution Point B</SelectItem></SelectContent></Select></div></div><div className="space-y-2"><Label htmlFor="notes">Notes</Label><Textarea id="notes" placeholder="Add any additional observations or comments..." rows={4} value={formData.notes} onChange={e => handleChange("notes", e.target.value)} /></div></div><div className="flex justify-end gap-3 pt-4 border-t"><Button type="button" variant="outline">Cancel</Button><Button type="submit" className="gap-2"><Save className="w-4 h-4" />Save Reading</Button></div></form></CardContent></Card><Card><CardHeader><CardTitle>Normal Ranges Reference</CardTitle><CardDescription>Standard acceptable ranges for water quality parameters</CardDescription></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><div className="p-3 bg-blue-50 rounded-lg"><p className="text-sm text-gray-600">pH Level</p><p className="font-semibold">6.5 - 8.5 pH</p></div><div className="p-3 bg-green-50 rounded-lg"><p className="text-sm text-gray-600">Turbidity</p><p className="font-semibold">{"< 1.0 NTU"}</p></div><div className="p-3 bg-cyan-50 rounded-lg"><p className="text-sm text-gray-600">Chlorine</p><p className="font-semibold">0.5 - 3.0 mg/L</p></div></div></CardContent></Card></div>;
}
export { DataEntry };
