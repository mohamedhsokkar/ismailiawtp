import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const history = [
  { id: 1, asset: "Pump-01", action: "Bearing replacement", date: "2026-02-18", status: "completed" },
  { id: 2, asset: "Filter-03", action: "Media wash", date: "2026-02-20", status: "completed" },
  { id: 3, asset: "Valve-12", action: "Seal inspection", date: "2026-03-01", status: "scheduled" },
];

export function AssetsMaintenanceHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance History</CardTitle>
        <CardDescription>Recent and scheduled maintenance for assets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <p className="font-medium">{item.asset}</p>
              <p className="text-sm text-gray-600">{item.action}</p>
              <p className="text-xs text-gray-500 mt-1">{item.date}</p>
            </div>
            <Badge className={item.status === "completed" ? "bg-green-600" : "bg-blue-600"}>
              {item.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
