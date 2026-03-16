import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { adminCreateUser, getAllUsers } from "../lib/auth";
import { toast } from "sonner";
function Users() {
  const [tab, setTab] = useState("users-list");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    workID: "",
    mobileNumber: "",
    password: "",
    nationalID: "",
    role: "operator"
  });
  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void loadUsers();
  }, []);
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminCreateUser(createForm);
      toast.success("User created successfully");
      setCreateForm({
        name: "",
        workID: "",
        mobileNumber: "",
        password: "",
        nationalID: "",
        role: "operator"
      });
      setTab("users-list");
      await loadUsers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create user");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Users" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Manage users, roles, and account creation" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { value: tab, onValueChange: setTab, className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full border-b bg-white", children: /* @__PURE__ */ jsxs(TabsList, { className: "h-11 bg-transparent p-0", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "users-list", className: "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600", children: "Users List" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "create-user", className: "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600", children: "Create User" })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "users-list", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Users and Roles" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "All active users in the system" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Work ID" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Mobile Number" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
            /* @__PURE__ */ jsx(TableHead, { children: "National ID" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: users.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 5, className: "text-center py-8 text-gray-500", children: loading ? "Loading users..." : "No users found" }) }) : users.map((user) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: user.name }),
            /* @__PURE__ */ jsx(TableCell, { children: user.workID ?? "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: user.mobileNumber ?? "-" }),
            /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: user.role }),
            /* @__PURE__ */ jsx(TableCell, { children: user.nationalID ?? "-" })
          ] }, user._id)) })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "create-user", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Create New User" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Add a user and assign role-based access" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleCreateUser, className: "space-y-4 max-w-xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-name", children: "Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "new-user-name",
                value: createForm.name,
                onChange: (e) => setCreateForm((prev) => ({ ...prev, name: e.target.value })),
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
                value: createForm.workID,
                onChange: (e) => setCreateForm((prev) => ({ ...prev, workID: e.target.value })),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-mobile-number", children: "Mobile Number" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "new-user-mobile-number",
                inputMode: "numeric",
                maxLength: 11,
                value: createForm.mobileNumber,
                placeholder: "Optional",
                onChange: (e) => setCreateForm((prev) => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 11) }))
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
                value: createForm.password,
                onChange: (e) => setCreateForm((prev) => ({ ...prev, password: e.target.value })),
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
                value: createForm.nationalID,
                placeholder: "Optional",
                onChange: (e) => setCreateForm((prev) => ({ ...prev, nationalID: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "new-user-role", children: "Role" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: createForm.role,
                onValueChange: (value) => setCreateForm((prev) => ({ ...prev, role: value })),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { id: "new-user-role", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
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
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, children: loading ? "Creating..." : "Create User" })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  Users
};
