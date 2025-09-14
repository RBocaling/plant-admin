import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Check, X, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import useUserAuth from '../hooks/useUserAuth';
import { getUserList } from '../api/userApi';

const SystemConfig = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useUserAuth();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportEnabled, setReportEnabled] = useState(true);
  const [feedbackEnabled, setFeedbackEnabled] = useState(true);

  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!isLoading && userData?.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [userData, isLoading, navigate]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUserList();
        if (response.data) {
          setUsers(response.data.map(user => ({
            id: user.id,
            role: user.role,
            name: `${user.firstName} ${user.lastName}`,
            username: user.userName || user.email,
            email: user.email,
            permissions: {
              report: user.role === 'admin' || user.role === 'owner',
              feedback: true,
              systemConfig: user.role === 'admin'
            },
            isActive: user.isActive !== false,
            createdAt: user.createdAt
          })));
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    if (userData?.role === 'admin') {
      fetchUsers();
    }
  }, [userData]);

  // Show loading while checking user role
  if (isLoading) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }

  // Show access denied if not admin
  if (userData?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Shield className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">You need admin privileges to access System Configuration.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-[#4A7C59]/90 transition-colors"
        >
          Return to Overview
        </button>
      </div>
    );
  }
  
  const handleReportToggle = (e) => {
    setReportEnabled(e.target.checked);
    toast.success(`Reports ${e.target.checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleFeedbackToggle = (e) => {
    setFeedbackEnabled(e.target.checked);
    toast.success(`Feedback ${e.target.checked ? 'enabled' : 'disabled'}`);
  };

  const handleUserRoleChange = (userId, newRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            role: newRole,
            permissions: {
              report: newRole === 'admin' || newRole === 'owner',
              feedback: true,
              systemConfig: newRole === 'admin'
            }
          }
        : user
    ));
    toast.success(`User role updated to ${newRole}`);
  };

  const handleUserStatusToggle = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
    toast.success(`User ${users.find(u => u.id === userId)?.isActive ? 'deactivated' : 'activated'}`);
  };

  const handleRefreshUsers = () => {
    // Refresh users data
    window.location.reload();
  };
  
  if (loading) {
    return <div className="text-2xl font-bold">Loading users...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Configuration</h1>
        <div className="flex gap-2">
          <Button onClick={handleRefreshUsers} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* User Management Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex justify-between items-center p-6 pb-3">
          {/* <h2 className="text-xl font-bold">User Management</h2> */}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>
                  <select
                    value={user.role}
                    onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="owner">Plant Owner</option>
                    <option value="specialist">Plant Specialist</option>
                    <option value="user">User</option>
                  </select>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {user.permissions.report && <Check className="text-green-500" size={16} />}
                    {user.permissions.feedback && <Check className="text-green-500" size={16} />}
                    {user.permissions.systemConfig && <Check className="text-green-500" size={16} />}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUserStatusToggle(user.id)}
                    variant="outline"
                    size="sm"
                    className={user.isActive ? 'text-red-600' : 'text-green-600'}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Feature Permissions - Functional */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Feature Permissions</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-700 mb-2">Allow users to view and export reports.</p>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="enable-reports" 
                checked={reportEnabled}
                onCheckedChange={handleReportToggle}
              />
              <label htmlFor="enable-reports" className="text-sm font-medium">
                Enable Reports
              </label>
            </div>
          </div>
          
          <div>
            <p className="text-gray-700 mb-2">Allow users to submit feedback and comments.</p>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="enable-feedback" 
                checked={feedbackEnabled}
                onCheckedChange={handleFeedbackToggle}
              />
              <label htmlFor="enable-feedback" className="text-sm font-medium">
                Enable Feedback
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* System Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">System Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {users.filter(u => u.role === 'owner').length}
            </div>
            <div className="text-sm text-gray-600">Plant Owners</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;