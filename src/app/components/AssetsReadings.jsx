import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
const readings = [{
  asset: "Pump-01",
  pressure: "6.2 bar",
  vibration: "2.1 mm/s",
  temperature: "58 C"
}, {
  asset: "Filter-03",
  pressure: "4.8 bar",
  vibration: "1.4 mm/s",
  temperature: "42 C"
}, {
  asset: "Valve-12",
  pressure: "3.1 bar",
  vibration: "0.9 mm/s",
  temperature: "37 C"
}];
function AssetsReadings() {
  return <Card><CardHeader><CardTitle>Asset Readings</CardTitle><CardDescription>Current operational readings for plant assets</CardDescription></CardHeader><CardContent><div className="rounded-md border"><Table><TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Pressure</TableHead><TableHead>Vibration</TableHead><TableHead>Temperature</TableHead></TableRow></TableHeader><TableBody>{readings.map(item => <TableRow key={item.asset}><TableCell>{item.asset}</TableCell><TableCell>{item.pressure}</TableCell><TableCell>{item.vibration}</TableCell><TableCell>{item.temperature}</TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>;
}
export { AssetsReadings };
