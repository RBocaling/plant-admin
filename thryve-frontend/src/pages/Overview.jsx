import { useState } from 'react';
import { format } from 'date-fns';
import {
  PieChart, Pie, ResponsiveContainer, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import useGetUserList from '../hooks/useGetUserList';
import useGetFeedBack from '../hooks/useGetFeedBack';
import useGetAdvisory from '../hooks/useGetAdvisory';
import useGetPlant from '../hooks/useGetPlant';
import useGetUserInfo from '../hooks/useGetUserInfo';
import useUserAuth from '../hooks/useUserAuth';

const AdminOverview = () => {
  const [timeRange, setTimeRange] = useState('This Week');

  const { data: userList, isLoading: userLoading } = useGetUserList();
  const { data: feedbackList, isLoading: feedbackLoading } = useGetFeedBack();
  const { data: advisoryList, isLoading: advisoryLoading } = useGetAdvisory();
  const { data: historyList, isLoading: historyLoading } = useGetPlant();
  const { data: userInfoData, isLoading: userInfo } = useGetUserInfo();
  


  
  if (userLoading || feedbackLoading || advisoryLoading || historyLoading) {
    return <div className='text-2xl font-bold'>loading..</div>;
  }

  const statsCards = [
    {
      title: 'Total Users',
      value: userList?.length || 0,
      description: 'Active accounts',
      color: 'bg-purple-600',
      textColor: 'text-white',
    },
    {
      title: 'Total Scanned History',
      value: historyList?.length || 0,
      description: 'Last 30 days',
      color: 'bg-indigo-900',
      textColor: 'text-white',
    },
    {
      title: 'Total Care Advisory',
      value: advisoryList?.length || 0,
      description: 'Monthly entries',
      color: 'bg-blue-900',
      textColor: 'text-white',
    },
    {
      title: 'Total IT Admin',
      value: advisoryList?.length || 0,
      description: 'Monthly entries',
      color: 'bg-blue-900',
      textColor: 'text-white',
    },
    {
      title: 'Total Feedback',
      value: feedbackList?.length || 0,
      description: 'Current users',
      color: 'bg-blue-600',
      textColor: 'text-white',
    },
  ];

  // Recent system activities (based on historyList)
  const recentActivities = historyList
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map(item => ({
      user: `User ID: ${item.userId}`,
      action: `Scanned ${item.plant_name}`,
      timestamp: format(new Date(item.createdAt), 'MMM d, yyyy h:mm a'),
    })) || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-lg shadow-md p-6 text-center`}>
            <h2 className="text-4xl font-bold mb-2 text-white">{card.value}</h2>
            <p className={`${card.textColor} opacity-90`}>{card.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Scanned Activities</h2>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{activity.user}</p>
                  <p className="text-gray-600">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activities found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
