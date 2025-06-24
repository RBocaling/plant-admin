import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import useGetActivityLogs from '../hooks/useGetActivityLogs';

const AccessLogs = () => {
    const { data: activityLogData, isLoading: activityLoading } = useGetActivityLogs();
  // { id: 1, userId: 22, username: 'Admin', activity: 'User logged in', timestamp: '2025-05-30T17:37:11.350Z' }
  
 const customData = activityLogData
  ?.slice() // to avoid mutating original data
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // sort descending
  .map((i) => ({
    id: i?.userId || "",
    username: i?.username,
    dateTime: format(new Date(i?.timestamp), "MMMM d, yyyy 'at' h:mm a"),
    activity: i?.activity,
  }));

  // const [logs, setLogs] = useState(customData);

  // const handleDelete = (id) => {
  //   setLogs(logs.filter(log => log.id !== id));
  //   toast.success('Log entry deleted successfully');
  // };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Activity Logs</h1>
      
      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Activity</TableHead>
              {/* <TableHead className="text-right">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customData?.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>{log.username}</TableCell>
                <TableCell>{log.dateTime}</TableCell>
                <TableCell>{log.activity}</TableCell>
                {/* <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-gray-500 hover:text-primary">
                      <Pencil size={18} />
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:text-red-600"
                      onClick={() => handleDelete(log.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccessLogs;