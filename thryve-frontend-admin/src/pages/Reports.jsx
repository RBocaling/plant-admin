import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  FileText,
  Calendar,
  BarChart,
  PieChart,
  LineChart,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { getUserList } from "@/api/userApi";
import { getPlantAdvisory } from "../api/plantAdvisory";
import { getFeedbackList } from "../api/feedBack";

const AdminReports = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportType, setReportType] = useState("sales");

  const [users, setUsers] = useState([]);
  const [plantTypes, setPlantTypes] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const userRes = await getUserList();
        setUsers(userRes.data);

        const feedbackRes = await getFeedbackList();
        const feedbackData = feedbackRes.data;
        setFeedbacks(feedbackData);

        const feedbackGrouped = {};
        feedbackData.forEach((item) => {
          const date = new Date(item.createdAt || new Date())
            .toISOString()
            .slice(0, 10);
          feedbackGrouped[date] = (feedbackGrouped[date] || 0) + 1;
        });

        const feedbackSorted = Object.entries(feedbackGrouped)
          .sort(([a], [b]) => new Date(a) - new Date(b))
          .map(([date, users]) => ({ date, users }));

        setTrendData(feedbackSorted);

        const plantRes = await getPlantAdvisory();
        const plantData = plantRes.data;
        setPlants(plantData);

        const typeCount = {};
        plantData.forEach((p) => {
          typeCount[p.request_type] = (typeCount[p.request_type] || 0) + 1;
        });
        const formattedTypes = Object.entries(typeCount).map(
          ([name, value]) => ({
            name,
            value,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          })
        );
        setPlantTypes(formattedTypes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllData();
  }, []);

  const reportTypes = [
    { id: "sales", name: "User Registrations", icon: BarChart },
    { id: "category", name: "Plant Advisory Categories", icon: PieChart },
    { id: "trend", name: "Feedback Submissions", icon: LineChart },
  ];

  const getFilteredTrendData = () => {
    if (!fromDate || !toDate) return trendData;
    return trendData.filter((d) => d.date >= fromDate && d.date <= toDate);
  };

  const getReportTitle = () => {
    return reportTypes.find((r) => r.id === reportType)?.name || "";
  };

  // ✅ Export to Excel
  const exportToExcel = () => {
    let data = [];

    if (reportType === "sales") {
      if (!users.length) return alert("No user data to export.");
      data = users.map((item) => ({
        "Date Registered": new Date(item.createdAt).toLocaleDateString(),
        "Full Name": `${item.firstName} ${item.lastName}`,
        Email: item.email,
        Role: item.role,
      }));
    }

    if (reportType === "trend") {
      if (!feedbacks.length) return alert("No feedback data to export.");
      data = feedbacks.map((f) => ({
        Rating: f.rating,
        Description: f.description || "N/A",
        "Date & Time": new Date(f.createdAt).toLocaleString(),
        Status: f.status,
        Response: f.response || "No Response",
        "User Name": `${f.user.firstName} ${f.user.lastName}`,
        "User Email": f.user.email,
      }));
    }

    if (reportType === "category") {
      if (!plants.length) return alert("No plant data to export.");
      data = plants.map((p) => ({
        "Plant Name": p.plant_name,
        "Request Type": p.request_type,
        Response: p.response || "No Response",
        Status: p.status,
        "User Name": `${p.user.firstName} ${p.user.lastName}`,
        "User Email": p.user.email,
      }));
    }

    if (!data.length) return alert("No data available to export.");

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, getReportTitle());

    const fileName = `${getReportTitle().toLowerCase().replace(/\s+/g, "_")}_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  const renderChart = () => {
    const filteredData = getFilteredTrendData();

    if (reportType !== "category" && filteredData.length === 0) {
      return (
        <p className="text-center text-gray-500 py-10">
          No data available for the selected date range.
        </p>
      );
    }

    switch (reportType) {
      case "sales":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="users" fill="#4A7C59" name="New Users" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case "category":
        return plantTypes.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={plantTypes}
                cx="50%"
                cy="50%"
                outerRadius={150}
                dataKey="value"
                label
              >
                {plantTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ marginTop: "20px" }} />
            </RechartsPieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-10">No data available.</p>
        );
      case "trend":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4A7C59"
                name="Feedbacks"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports Generation</h1>
        <Button onClick={exportToExcel} className="bg-[#4A7C59] text-white">
          Export to Excel <Download className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded shadow">
        {reportTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setReportType(type.id)}
            className={`flex items-center cursor-pointer border p-3 rounded-lg ${
              reportType === type.id
                ? "bg-[#4A7C59]/10 border-[#4A7C59]"
                : "hover:bg-gray-50"
            }`}
          >
            <type.icon
              className={`mr-3 ${
                reportType === type.id ? "text-[#4A7C59]" : "text-gray-500"
              }`}
            />
            <span
              className={`font-medium ${
                reportType === type.id ? "text-[#4A7C59]" : ""
              }`}
            >
              {type.name}
            </span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm text-gray-600 mb-1">From Date</label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">To Date</label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="bg-white mt-6 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FileText className="mr-2 text-[#4A7C59]" />
            <h2 className="text-xl font-semibold">{getReportTitle()}</h2>
          </div>
          <p className="text-sm text-gray-500">
            {fromDate && toDate ? `${fromDate} - ${toDate}` : "All Time"}
          </p>
        </div>
        {renderChart()}
      </div>
    </div>
  );
};

export default AdminReports;
