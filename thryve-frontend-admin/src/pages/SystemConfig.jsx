import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, Shield, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useUserAuth from "../hooks/useUserAuth";
import { getUserList } from "../api/userApi";
import { updateRoleApi } from "../api/auth";
const SystemConfig = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: userData, isLoading: authLoading } = useUserAuth();

  const [reportEnabled, setReportEnabled] = useState(true);
  const [feedbackEnabled, setFeedbackEnabled] = useState(true);

  // ✅ Fetch users using TanStack Query
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUserList();
      return res.data.map((user) => ({
        id: user.id,
        role: user.role?.toUpperCase(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        permissions: {
          report: user.role === "ADMIN" || user.role === "OWNER",
          feedback: true,
          systemConfig: user.role === "ADMIN",
        },
        isActive: user.isActive !== false,
        createdAt: user.createdAt,
      }));
    },
    enabled: !!userData?.role && userData.role.toUpperCase() === "ADMIN",
  });

  // ✅ Mutation for updating role
  const updateRoleMutation = useMutation({
    mutationFn: updateRoleApi,
    onSuccess: (_, variables) => {
      toast.success(`User role updated to ${variables.role}`);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update role");
    },
  });

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && userData?.role?.toUpperCase() !== "ADMIN") {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
    }
  }, [authLoading, userData, navigate]);

  if (authLoading || usersLoading) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }

  if (userData?.role?.toUpperCase() !== "ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Shield className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          You need admin privileges to access System Configuration.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-[#4A7C59]/90 transition-colors"
        >
          Return to Overview
        </button>
      </div>
    );
  }

  const handleUserRoleChange = (userId, newRole) => {
    updateRoleMutation.mutate({ id: userId, role: newRole });
  };

  const handleUserStatusToggle = (userId) => {
    toast.success(`User ${userId} status toggled`);
  };

  const handleRefreshUsers = () => {
    queryClient.invalidateQueries(["users"]);
    toast.info("Refreshing users...");
  };

  const users = usersData || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Configuration</h1>
        <Button onClick={handleRefreshUsers} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissions</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>

                {/* ✅ Role Column */}
                <TableCell>
                  {user.role === "CUSTOMER" ? (
                    <span className="text-gray-600 uppercase">{user.role}</span>
                  ) : (
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleUserRoleChange(user.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm uppercase"
                      disabled={updateRoleMutation.isPending}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="OWNER">OWNER</option>
                      <option value="SPECIALIST">SPECIALIST</option>
                    </select>
                  )}
                </TableCell>

                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    {user.permissions.report && (
                      <Check className="text-green-500" size={16} />
                    )}
                    {user.permissions.feedback && (
                      <Check className="text-green-500" size={16} />
                    )}
                    {user.permissions.systemConfig && (
                      <Check className="text-green-500" size={16} />
                    )}
                  </div>
                </TableCell>

                {/* <TableCell>
                  <Button
                    onClick={() => handleUserStatusToggle(user.id)}
                    variant="outline"
                    size="sm"
                    className={user.isActive ? "text-red-600" : "text-primary"}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Feature Permissions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Feature Permissions</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-700 mb-2">
              Allow users to view and export reports.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable-reports"
                checked={reportEnabled}
                onCheckedChange={(e) => {
                  setReportEnabled(e);
                  toast.success(`Reports ${e ? "enabled" : "disabled"}`);
                }}
              />
              <label htmlFor="enable-reports" className="text-sm font-medium">
                Enable Reports
              </label>
            </div>
          </div>

          <div>
            <p className="text-gray-700 mb-2">
              Allow users to submit feedback and comments.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable-feedback"
                checked={feedbackEnabled}
                onCheckedChange={(e) => {
                  setFeedbackEnabled(e);
                  toast.success(`Feedback ${e ? "enabled" : "disabled"}`);
                }}
              />
              <label htmlFor="enable-feedback" className="text-sm font-medium">
                Enable Feedback
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">System Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {users.length}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {users.filter((u) => u.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === "ADMIN").length}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {users.filter((u) => u.role === "OWNER").length}
            </div>
            <div className="text-sm text-gray-600">Plant Owners</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;
