import React, { useEffect, useState } from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getUserList } from "../api/userApi";
import { getPlantAdvisory } from "../api/plantAdvisory";
import { getFeedbackList } from "../api/feedBack";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61"];

const UsersAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [advisoryCount, setAdvisoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const processChartData = (userList) => {
    const grouped = {};
    const roles = {};

    userList.forEach((user) => {
      const date = new Date(user.createdAt || new Date()).toISOString().slice(0, 10);
      grouped[date] = (grouped[date] || 0) + 1;
      roles[user.role] = (roles[user.role] || 0) + 1;
    });

    const lineData = Object.entries(grouped)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, users]) => ({ date, users }));

    const pieData = Object.entries(roles).map(([role, count]) => ({ role, count }));

    setChartData(lineData);
    setRoleData(pieData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUserList();
        const users = userRes.data || [];
        setUsers(users);
        processChartData(users);

        const fbRes = await getFeedbackList();
        setFeedbackCount(fbRes.data?.length || 0);

        const advRes = await getPlantAdvisory();
        setAdvisoryCount(advRes.data?.length || 0);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Users Analytics Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Total Feedbacks: ${feedbackCount}`, 14, 30);
    doc.text(`Total Advisories: ${advisoryCount}`, 14, 37);

    autoTable(doc, {
      startY: 45,
      head: [["Email", "Username", "Full Name", "Role"]],
      body: users.map(u => [u.email, u.username, `${u.firstName} ${u.lastName}`, u.role]),
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("users-analytics.pdf");
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Analytics</h1>
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {/* Line Chart */}
      <div className="w-full h-96 bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">User Growth</h2>
        {loading ? <p>Loading chart...</p> : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                name="New Users"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie Chart */}
      <div className="w-full h-96 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">User Roles Distribution</h2>
        {roleData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No user role data available</p>
        )}
      </div>
    </div>
  );
};

export default UsersAnalytics;
