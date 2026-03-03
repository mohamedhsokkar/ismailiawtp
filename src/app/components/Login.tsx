import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Droplets } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'operator' | 'viewer'>('viewer');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulated login - store user info in localStorage
    localStorage.setItem('user', JSON.stringify({
      username,
      role,
      isAuthenticated: true,
    }));
    
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Droplets className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle>Water Treatment Plant</CardTitle>
          <CardDescription>
            Sign in to access the management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value: 'operator' | 'viewer') => setRole(value)}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer (Analytics Only)</SelectItem>
                  <SelectItem value="operator">Operator (Data Entry)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-sm text-center text-gray-600">
            <p>Demo credentials: any username/password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
