import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Droplets } from "lucide-react";
import { login, register } from "../lib/auth";
import { toast } from "sonner";
function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    nationalID: "",
    role: "operator"
  });
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(registerForm);
      toast.success("User created. You can now sign in.");
      setLoginForm({ email: registerForm.email, password: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to register");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-1 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Droplets, { className: "w-10 h-10 text-white" }) }) }),
      /* @__PURE__ */ jsx(CardTitle, { children: "Water Treatment Plant" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Sign in to access the management system" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "sign-in", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "sign-in", children: "Sign In" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "register", children: "Register" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "sign-in", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "Enter email",
              value: loginForm.email,
              onChange: (e) => setLoginForm((prev) => ({ ...prev, email: e.target.value })),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              placeholder: "Enter password",
              value: loginForm.password,
              onChange: (e) => setLoginForm((prev) => ({ ...prev, password: e.target.value })),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Signing In..." : "Sign In" })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "register", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleRegister, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              type: "text",
              value: registerForm.name,
              onChange: (e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value })),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "register-email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "register-email",
              type: "email",
              value: registerForm.email,
              onChange: (e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value })),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "register-password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "register-password",
              type: "password",
              value: registerForm.password,
              onChange: (e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value })),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "national-id", children: "National ID" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "national-id",
              type: "text",
              value: registerForm.nationalID,
              onChange: (e) => setRegisterForm((prev) => ({ ...prev, nationalID: e.target.value })),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "register-role", children: "Role" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: registerForm.role,
              onValueChange: (value) => setRegisterForm((prev) => ({ ...prev, role: value })),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { id: "register-role", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Admin" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "engineer", children: "Engineer" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "operator", children: "Operator" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "chemist", children: "Chemist" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Creating..." : "Create User" })
      ] }) })
    ] }) })
  ] }) });
}
export {
  Login
};
