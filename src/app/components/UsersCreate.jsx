import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { adminCreateUser } from "../lib/auth";
import { toast } from "sonner";
function UsersCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    workID: "",
    email: "",
    password: "",
    nationalID: "",
    role: "operator"
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminCreateUser(form);
      toast.success("User created successfully");
      navigate("/users/list");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create user");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Create New User" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Add a user and assign role-based access" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 max-w-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-name", children: "Name" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-user-name",
            value: form.name,
            onChange: (e) => setForm((prev) => ({ ...prev, name: e.target.value })),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-work-id", children: "Work ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-user-work-id",
            type: "number",
            value: form.workID,
            onChange: (e) => setForm((prev) => ({ ...prev, workID: e.target.value })),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-user-email",
            type: "email",
            value: form.email,
            placeholder: "Optional",
            onChange: (e) => setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-password", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-user-password",
            type: "password",
            value: form.password,
            onChange: (e) => setForm((prev) => ({ ...prev, password: e.target.value })),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-national-id", children: "National ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "new-user-national-id",
            value: form.nationalID,
            placeholder: "Optional",
            onChange: (e) => setForm((prev) => ({ ...prev, nationalID: e.target.value }))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-role", children: "Role" }),
        /* @__PURE__ */ jsxs(Select, { value: form.role, onValueChange: (value) => setForm((prev) => ({ ...prev, role: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { id: "new-user-role", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "engineer", children: "Engineer" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "operator", children: "Operator" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "chemist", children: "Chemist" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Create User" })
    ] }) })
  ] });
}
export {
  UsersCreate
};
