import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { changePassword, getSession } from "../lib/auth";
import { toast } from "sonner";
function Profile() {
  const session = useMemo(() => getSession(), []);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }
    setLoading(true);
    try {
      await changePassword(form.currentPassword, form.newPassword);
      toast.success("Password updated successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update password");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Profile" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "View your account information and update password" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "info", className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full border-b bg-white", children: /* @__PURE__ */ jsxs(TabsList, { className: "h-11 bg-transparent p-0", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "info", className: "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600", children: "My Info" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "password", className: "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600", children: "Change Password" })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "info", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "User Information" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Your current account details" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Name" }),
            /* @__PURE__ */ jsx(Input, { value: session?.user?.name ?? "", disabled: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Work ID" }),
            /* @__PURE__ */ jsx(Input, { value: session?.user?.workID?.toString() ?? "", disabled: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Email" }),
            /* @__PURE__ */ jsx(Input, { value: session?.user?.email ?? "", disabled: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Role" }),
            /* @__PURE__ */ jsx(Input, { value: session?.user?.role ?? "", disabled: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "National ID" }),
            /* @__PURE__ */ jsx(Input, { value: session?.user?.nationalID?.toString() ?? "", disabled: true })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "password", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Change Password" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Update your account password" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleChangePassword, className: "space-y-4 max-w-xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "current-password", children: "Current Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "current-password",
                type: "password",
                value: form.currentPassword,
                onChange: (e) => setForm((prev) => ({ ...prev, currentPassword: e.target.value })),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "new-password", children: "New Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "new-password",
                type: "password",
                value: form.newPassword,
                onChange: (e) => setForm((prev) => ({ ...prev, newPassword: e.target.value })),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-password", children: "Confirm New Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "confirm-password",
                type: "password",
                value: form.confirmPassword,
                onChange: (e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value })),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, children: loading ? "Updating..." : "Update Password" })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  Profile
};
