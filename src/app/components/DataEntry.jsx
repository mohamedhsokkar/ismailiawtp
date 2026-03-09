import { jsx, jsxs } from "react/jsx-runtime";
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
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    time: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0].slice(0, 5),
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem("waterQualityData") || "[]");
    existingData.push({
      ...formData,
      id: Date.now(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    localStorage.setItem("waterQualityData", JSON.stringify(existingData));
    toast.success("Water quality data recorded successfully");
    setFormData({
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      time: (/* @__PURE__ */ new Date()).toTimeString().split(" ")[0].slice(0, 5),
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
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-4xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Data Entry" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Record water quality measurements and treatment data" })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
          "New Water Quality Reading"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Enter all measurement values from the current sampling session" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "date", children: "Date" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "date",
                type: "date",
                value: formData.date,
                onChange: (e) => handleChange("date", e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "time", children: "Time" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "time",
                type: "time",
                value: formData.time,
                onChange: (e) => handleChange("time", e.target.value),
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Measurements" }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "ph", children: "pH Level" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "ph",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    max: "14",
                    placeholder: "7.0",
                    value: formData.ph,
                    onChange: (e) => handleChange("ph", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500", children: "pH" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "turbidity", children: "Turbidity" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "turbidity",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    placeholder: "1.5",
                    value: formData.turbidity,
                    onChange: (e) => handleChange("turbidity", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500", children: "NTU" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "chlorine", children: "Chlorine Level" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "chlorine",
                    type: "number",
                    step: "0.1",
                    min: "0",
                    placeholder: "2.0",
                    value: formData.chlorine,
                    onChange: (e) => handleChange("chlorine", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500", children: "mg/L" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "temperature", children: "Temperature" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "temperature",
                    type: "number",
                    step: "0.1",
                    placeholder: "20.5",
                    value: formData.temperature,
                    onChange: (e) => handleChange("temperature", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500", children: "\xB0C" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:col-span-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "flowRate", children: "Flow Rate" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "flowRate",
                    type: "number",
                    step: "10",
                    min: "0",
                    placeholder: "2500",
                    value: formData.flowRate,
                    onChange: (e) => handleChange("flowRate", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500", children: "L/min" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Additional Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "operator", children: "Operator Name" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "operator",
                  type: "text",
                  placeholder: "Enter your name",
                  value: formData.operator,
                  onChange: (e) => handleChange("operator", e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "location", children: "Location" }),
              /* @__PURE__ */ jsxs(Select, { value: formData.location, onValueChange: (value) => handleChange("location", value), children: [
                /* @__PURE__ */ jsx(SelectTrigger, { id: "location", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "main-plant", children: "Main Plant" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "reservoir-1", children: "Reservoir 1" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "reservoir-2", children: "Reservoir 2" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "distribution-point-a", children: "Distribution Point A" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "distribution-point-b", children: "Distribution Point B" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "notes", children: "Notes" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "notes",
                placeholder: "Add any additional observations or comments...",
                rows: 4,
                value: formData.notes,
                onChange: (e) => handleChange("notes", e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", children: "Cancel" }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", className: "gap-2", children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
            "Save Reading"
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Normal Ranges Reference" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Standard acceptable ranges for water quality parameters" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-3 bg-blue-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "pH Level" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "6.5 - 8.5 pH" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Turbidity" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "< 1.0 NTU" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 bg-cyan-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Chlorine" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "0.5 - 3.0 mg/L" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  DataEntry
};
