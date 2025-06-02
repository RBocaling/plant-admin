import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

const SystemConfig = () => {
  const [users, setUsers] = useState([
    { id: '1001', role: 'Plant Owner', name: 'Dan Pol E. Dewao', username: 'planTito69', permissions: { report: true, feedback: false } },
    { id: '1002', role: 'Plant Specialist', name: 'Carl Justine Villanueva', username: 'admin123', permissions: { report: true, feedback: false } },
    { id: '1003', role: 'Plant Owner', name: 'Dan Pol E. Dewao', username: 'planTito69', permissions: { report: true, feedback: false } },
  ]);
  
  const [reportEnabled, setReportEnabled] = useState(false);
  const [feedbackEnabled, setFeedbackEnabled] = useState(false);
  
  const handleReportToggle = (e) => {
    setReportEnabled(e.target.checked);
    toast.success(`Reports ${e.target.checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleFeedbackToggle = (e) => {
    setFeedbackEnabled(e.target.checked);
    toast.success(`Feedback ${e.target.checked ? 'enabled' : 'disabled'}`);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Configuration</h1>
      
      {/* Role Permission Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <h2 className="text-xl font-bold p-6 pb-3">Role Permission</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>User Role</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-center">Permission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-8">
                    <Check className="text-green-500" size={24} />
                    <X className="text-red-500" size={24} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Report and Feedback Permission */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Report and Feedback Permission</h2>
          
          <div className="space-y-4 mt-4">
            <div>
              <p className="text-gray-700 mb-2">Allow users to view and export reports.</p>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enable-reports" 
                  checked={reportEnabled}
                  onCheckedChange={handleReportToggle}
                />
                <label htmlFor="enable-reports" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Enable Reports.
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
                <label htmlFor="enable-feedback" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Enable Feedbacks.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;