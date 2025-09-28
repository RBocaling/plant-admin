import { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowDown, ArrowUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useUserAuth from '../hooks/useUserAuth';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('This Week');

  // Sample data for the charts
  const plantTypeData = [
    { name: 'Ornamental Plant', value: 50, color: '#8884d8' },
    { name: 'Flowering Plant', value: 35, color: '#e179c6' },
    { name: 'Foliage Plant', value: 15, color: '#f47b7b' },
  ];

  const diseaseData = [
    { name: 'Downey Mildew', value: 40, color: '#ff4088' },
    { name: 'Bacterial Wilt', value: 35, color: '#36a2eb' },
    { name: 'Fungal Leaf Spot', value: 25, color: '#ffcd56' },
  ];

  const orderData = [
    { month: 'Jan', Rose: 15, ZZPlant: -20, PrayerPlant: 30 },
    { month: 'Feb', Rose: 25, ZZPlant: -10, PrayerPlant: 40 },
    { month: 'Mar', Rose: 30, ZZPlant: 5, PrayerPlant: 45 },
    { month: 'Apr', Rose: 40, ZZPlant: 15, PrayerPlant: 55 },
    { month: 'May', Rose: 45, ZZPlant: 25, PrayerPlant: 50 },
    { month: 'Jun', Rose: 30, ZZPlant: 20, PrayerPlant: 60 },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: 'IT Admins',
      value: '4',
      color: 'bg-purple-600',
      textColor: 'text-white',
    },
    {
      title: 'Plant Specialists',
      value: '2',
      color: 'bg-indigo-900',
      textColor: 'text-white',
    },
    {
      title: 'Plants listed',
      value: '500',
      color: 'bg-blue-900',
      textColor: 'text-white',
    },
    {
      title: 'Pots listed',
      value: '350',
      color: 'bg-blue-600',
      textColor: 'text-white',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90">
            Export to PDF
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90">
            Export to CSV
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div key={index} className={`${card.color} rounded-lg shadow-md p-6 text-center`}>
            <h2 className="text-4xl font-bold mb-2 text-white">{card.value}</h2>
            <p className={`${card.textColor} opacity-90`}>{card.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Plant Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Plant Orders</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-md p-1"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-primary">5,000.00</h3>
            <p className="text-gray-600">50 Orders</p>
          </div>
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Rose" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="ZZPlant" stroke="#e179c6" />
                <Line type="monotone" dataKey="PrayerPlant" stroke="#f47b7b" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sales Overview</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-md p-1"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8CB369" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant Types Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Top 3 Scanned Plant Types</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={plantTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {plantTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center flex-wrap mt-4">
            {plantTypeData.map((entry, index) => (
              <div key={index} className="flex items-center mr-6 mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diseases Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Most Common Diseases</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center flex-wrap mt-4">
            {diseaseData.map((entry, index) => (
              <div key={index} className="flex items-center mr-6 mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;