import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
const doses = [
  { chemical: "Chlorine", target: "2.0 mg/L", current: "2.1 mg/L", status: "optimal" },
  { chemical: "Alum", target: "30 ppm", current: "28 ppm", status: "optimal" },
  { chemical: "Lime", target: "12 ppm", current: "14 ppm", status: "warning" }
];
function LabDoses() {
  return /* @__PURE__ */ jsxs(Card, {
    children: [
    /* @__PURE__ */ jsxs(CardHeader, {
      children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Chemical Doses" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Track dosing targets and current values" })
      ]
    }),
    /* @__PURE__ */ jsx(CardContent, {
      className: "space-y-4", children: doses.map((dose) => /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between p-4 border rounded-lg", children: [
      /* @__PURE__ */ jsxs("div", {
          children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: dose.chemical }),
        /* @__PURE__ */ jsxs("p", {
            className: "text-sm text-gray-600", children: [
              "Target: ",
              dose.target
            ]
          })
          ]
        }),
      /* @__PURE__ */ jsxs("div", {
          className: "text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: dose.current }),
        /* @__PURE__ */ jsx(Badge, { className: dose.status === "warning" ? "bg-yellow-500" : "bg-green-600", children: dose.status })
          ]
        })
        ]
      }, dose.chemical))
    })
    ]
  });
}
export {
  LabDoses
};
