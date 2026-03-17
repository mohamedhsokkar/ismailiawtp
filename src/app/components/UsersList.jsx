import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getAllUsers } from "../lib/auth";
import { toast } from "sonner";
function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to load users");
      } finally {
        setLoading(false);
      }
    };
    void loadUsers();
  }, []);
  return <Card><CardHeader><CardTitle>Users and Roles</CardTitle><CardDescription>All active users in the system</CardDescription></CardHeader><CardContent><div className="rounded-md border"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Work ID</TableHead><TableHead>Mobile Number</TableHead><TableHead>Role</TableHead><TableHead>National ID</TableHead></TableRow></TableHeader><TableBody>{users.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-500">{loading ? "Loading users..." : "No users found"}</TableCell></TableRow> : users.map(user => <TableRow key={user._id}><TableCell>{user.name}</TableCell><TableCell>{user.workID ?? "-"}</TableCell><TableCell>{user.mobileNumber ?? "-"}</TableCell><TableCell className="capitalize">{user.role}</TableCell><TableCell>{user.nationalID ?? "-"}</TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>;
}
export { UsersList };
