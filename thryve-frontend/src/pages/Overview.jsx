import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, ResponsiveContainer, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { BarChart3, FileText, Settings } from 'lucide-react';
import useGetUserList from '../hooks/useGetUserList';
import useGetFeedBack from '../hooks/useGetFeedBack';
import useGetAdvisory from '../hooks/useGetAdvisory';
import useGetPlant from '../hooks/useGetPlant';
import useGetUserInfo from '../hooks/useGetUserInfo';
import useUserAuth from '../hooks/useUserAuth';
import Analytics from './Analytics';

const AdminOverview = () => {
  const [timeRange, setTimeRange] = useState('This Week');
  const navigate = useNavigate();

  const { data: userList, isLoading: userLoading } = useGetUserList();
  const { data: feedbackList, isLoading: feedbackLoading } = useGetFeedBack();
  const { data: advisoryList, isLoading: advisoryLoading } = useGetAdvisory();
  const { data: historyList, isLoading: historyLoading } = useGetPlant();
  const { data: userInfoData, isLoading: userInfo } = useGetUserInfo();
  const { data: userData } = useUserAuth();
  


  
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Overview</h1>
        <div className="flex gap-3">
          {userData?.role === 'admin' && (
            <button
              onClick={() => navigate('/system-config')}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Settings className="h-5 w-5 mr-2" />
              System Config
            </button>
          )}
          <button
            onClick={() => navigate('/reports')}
            className="flex items-center px-4 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-[#4A7C59]/90 transition-colors"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Generate Reports
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-lg shadow-md p-6 text-center`}>
            <h2 className="text-4xl font-bold mb-2 text-white">{card.value}</h2>
            <p className={`${card.textColor} opacity-90`}>{card.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Reports Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <FileText className="mr-2 text-[#4A7C59]" />
            Quick Analytics
          </h2>
          <button
            onClick={() => navigate('/reports')}
            className="text-[#4A7C59] hover:text-[#4A7C59]/80 font-medium"
          >
            View Full Reports →
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Recent Feedback Trends</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feedbackList?.slice(-7) || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="createdAt" tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rating" stroke="#4A7C59" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Plant Advisory Distribution</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={advisoryList?.slice(0, 5) || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    dataKey="id"
                    nameKey="request_type"
                  >
                    {advisoryList?.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
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
