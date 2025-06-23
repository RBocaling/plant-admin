import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash, X } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGetUserList from '../hooks/useGetUserList';
import { createAdmin, editUserApi } from '../api/userApi';
import Pagination from '@/components/Pagination';

const UserManagement = () => {
  const { data = [], isLoading } = useGetUserList();
  const [users, setUsers] = useState(data);
    const queryClient = useQueryClient();

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: '', // Default empty role
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newUser.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!newUser.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!newUser.username.trim()) newErrors.username = 'Username is required';
    if (!newUser.password) newErrors.password = 'Password is required';
    if (newUser.password !== newUser.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!newUser.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) newErrors.email = 'Email is invalid';
    if (!newUser.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutateAsync: addAdmin, isPending: isAdding } = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["get=user"] });

      toast.success('Admin user added successfully')
    },
    onError: () => toast.error('Failed to add admin user'),
  });

  const handleAddUser = async () => {
    if (!validateForm()) return;

    try {
      const response = await addAdmin({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
        confirmPassword: newUser.password,
        email: newUser.email,
        profile: newUser.email,
        role: newUser.role,
      });

      setUsers((prev) => [
        ...prev,
        {
          id: response?.id || `${Date.now()}`,
          ...newUser,
        },
      ]);

      setNewUser({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        role: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { mutateAsync: updateData } = useMutation({
    mutationFn: editUserApi,
    onSuccess: () => {
      toast.success('User updated successfully')
                   queryClient.invalidateQueries({ queryKey: ["get=user"] });

    },
    onError: () => toast.error('Update failed'),
  });

  const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  setUsers(users.filter((user) => user.id !== id));
  toast.success('User deleted successfully');
};

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = () => {
    updateData({
      id: selectedUser?.id,
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      username: selectedUser?.username,
      email: selectedUser?.email,
      role: selectedUser?.role,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>User Role</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-1 text-gray-500 hover:text-primary"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="p-1 text-gray-500 hover:text-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Add User Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            >
              <option value="">-- Select Role --</option>
              {/* <option value="CUSTOMER">CUSTOMER</option> */}
              <option value="ADMIN">ADMIN</option>
              <option value="OWNER">OWNER</option>
              <option value="SPECIALIST">SPECIALIST</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>
          {['firstName', 'lastName', 'username', 'password', 'confirmPassword', 'email'].map(
            (field) => (
              <div key={field} className={field === 'email' ? 'md:col-span-2' : ''}>
                <Label htmlFor={field}>
                  {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                  value={newUser[field]}
                  onChange={handleInputChange}
                  className={errors[field] ? 'border-red-500' : ''}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            )
          )}
        </div>
        <div className="mt-6">
          <Button
            onClick={handleAddUser}
            className="bg-primary text-white"
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="space-y-4">
              {['firstName', 'lastName', 'username'].map((field) => (
                <div key={field}>
                  <Label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    name={field}
                    value={selectedUser[field] || ''}
                    onChange={handleModalInputChange}
                  />
                </div>
              ))}
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  name="role"
                  value={selectedUser.role}
                  onChange={handleModalInputChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="OWNER">OWNER</option>
                  <option value="SPECIALIST">SPECIALIST</option>
                </select>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button
                onClick={handleUpdateUser}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
