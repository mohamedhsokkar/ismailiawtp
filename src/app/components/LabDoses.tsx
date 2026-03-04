import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const doses = [
  { chemical: "Chlorine", target: "2.0 mg/L", current: "2.1 mg/L", status: "optimal" },
  { chemical: "Alum", target: "30 ppm", current: "28 ppm", status: "optimal" },
  { chemical: "Lime", target: "12 ppm", current: "14 ppm", status: "warning" },
];

export function LabDoses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Doses</CardTitle>
        <CardDescription>Track dosing targets and current values</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {doses.map((dose) => (
          <div key={dose.chemical} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">{dose.chemical}</p>
              <p className="text-sm text-gray-600">Target: {dose.target}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{dose.current}</p>
              <Badge className={dose.status === "warning" ? "bg-yellow-500" : "bg-green-600"}>
                {dose.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
