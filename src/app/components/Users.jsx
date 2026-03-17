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
  const handleCreateUser = async e => {
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
  return <div className="p-6 space-y-6"><div><h1>Users</h1><p className="text-gray-600 mt-1">Manage users, roles, and account creation</p></div><Tabs value={tab} onValueChange={setTab} className="space-y-6"><div className="w-full border-b bg-white"><TabsList className="h-11 bg-transparent p-0"><TabsTrigger value="users-list" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">Users List</TabsTrigger><TabsTrigger value="create-user" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600">Create User</TabsTrigger></TabsList></div><TabsContent value="users-list"><Card><CardHeader><CardTitle>Users and Roles</CardTitle><CardDescription>All active users in the system</CardDescription></CardHeader><CardContent><div className="rounded-md border"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Work ID</TableHead><TableHead>Mobile Number</TableHead><TableHead>Role</TableHead><TableHead>National ID</TableHead></TableRow></TableHeader><TableBody>{users.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-500">{loading ? "Loading users..." : "No users found"}</TableCell></TableRow> : users.map(user => <TableRow key={user._id}><TableCell>{user.name}</TableCell><TableCell>{user.workID ?? "-"}</TableCell><TableCell>{user.mobileNumber ?? "-"}</TableCell><TableCell className="capitalize">{user.role}</TableCell><TableCell>{user.nationalID ?? "-"}</TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card></TabsContent><TabsContent value="create-user"><Card><CardHeader><CardTitle>Create New User</CardTitle><CardDescription>Add a user and assign role-based access</CardDescription></CardHeader><CardContent><form onSubmit={handleCreateUser} className="space-y-4 max-w-xl"><div className="space-y-2"><Label htmlFor="new-user-name">Name</Label><Input id="new-user-name" value={createForm.name} onChange={e => setCreateForm(prev => ({
                  ...prev,
                  name: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="new-user-work-id">Work ID</Label><Input id="new-user-work-id" type="number" value={createForm.workID} onChange={e => setCreateForm(prev => ({
                  ...prev,
                  workID: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="new-user-mobile-number">Mobile Number</Label><Input id="new-user-mobile-number" inputMode="numeric" maxLength={11} value={createForm.mobileNumber} placeholder="Optional" onChange={e => setCreateForm(prev => ({
                  ...prev,
                  mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 11)
                }))} /></div><div className="space-y-2"><Label htmlFor="new-user-password">Password</Label><Input id="new-user-password" type="password" value={createForm.password} onChange={e => setCreateForm(prev => ({
                  ...prev,
                  password: e.target.value
                }))} required={true} /></div><div className="space-y-2"><Label htmlFor="new-user-national-id">National ID</Label><Input id="new-user-national-id" value={createForm.nationalID} placeholder="Optional" onChange={e => setCreateForm(prev => ({
                  ...prev,
                  nationalID: e.target.value
                }))} /></div><div className="space-y-2"><Label htmlFor="new-user-role">Role</Label><Select value={createForm.role} onValueChange={value => setCreateForm(prev => ({
                  ...prev,
                  role: value
                }))}><SelectTrigger id="new-user-role"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="engineer">Engineer</SelectItem><SelectItem value="operator">Operator</SelectItem><SelectItem value="chemist">Chemist</SelectItem></SelectContent></Select></div><Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create User"}</Button></form></CardContent></Card></TabsContent></Tabs></div>;
}
export { Users };
