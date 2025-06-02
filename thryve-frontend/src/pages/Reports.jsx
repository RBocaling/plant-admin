import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, FileText, Calendar, BarChart, PieChart, LineChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminReports = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportType, setReportType] = useState('sales');

  // Sample data for the reports
  const salesData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 10000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 13500 },
    { month: 'May', sales: 18000 },
    { month: 'Jun', sales: 16500 },
  ];

  const categoryData = [
    { name: 'Indoor Plants', value: 55, color: '#4A7C59' },
    { name: 'Outdoor Plants', value: 30, color: '#8CB369' },
    { name: 'Succulents', value: 15, color: '#E07A5F' },
  ];

  const trendData = [
    { month: 'Jan', inStore: 4000, online: 2400 },
    { month: 'Feb', inStore: 3000, online: 1398 },
    { month: 'Mar', inStore: 5000, online: 3800 },
    { month: 'Apr', inStore: 4500, online: 4300 },
    { month: 'May', inStore: 6000, online: 5800 },
    { month: 'Jun', inStore: 5500, online: 5400 },
  ];

  // Report types
  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: BarChart },
    { id: 'category', name: 'Category Distribution', icon: PieChart },
    { id: 'trend', name: 'Sales Trends', icon: LineChart },
  ];

  // Function to render the appropriate chart based on report type
  const renderChart = () => {
    switch (reportType) {
      case 'sales':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₱${value.toLocaleString()}`, 'Sales']} />
              <Bar dataKey="sales" fill="#4A7C59" name="Sales" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case 'category':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₱${value.toLocaleString()}`, 'Sales']} />
              <Legend />
              <Line type="monotone" dataKey="inStore" stroke="#4A7C59" name="In-Store Sales" />
              <Line type="monotone" dataKey="online" stroke="#E07A5F" name="Online Sales" />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  // Generate report title
  const getReportTitle = () => {
    const selectedReport = reportTypes.find(r => r.id === reportType);
    return selectedReport ? selectedReport.name : '';
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      const title = getReportTitle();

      // Add title
      doc.setFontSize(16);
      doc.text(title, 14, 15);

      // Add date range
      doc.setFontSize(10);
      doc.text(
        `Date Range: ${fromDate && toDate ? `${fromDate} - ${toDate}` : 'Last 6 months'}`,
        14, 25
      );

      const tableConfig = {
        startY: 30,
        head: [],
        body: [],
      };

      // Add table data based on report type
      if (reportType === 'sales') {
      tableConfig.head = [['Month', 'Sales']];
      tableConfig.body = salesData.map(item => [
        item.month,
        `₱${item.sales.toLocaleString()}`
      ]);
    } else if (reportType === 'category') {
      tableConfig.head = [['Category', 'Percentage']];
      tableConfig.body = categoryData.map(item => [
        item.name,
        `${item.value}%`
      ]);
    } else if (reportType === 'trend') {
      tableConfig.head = [['Month', 'In-Store Sales', 'Online Sales']];
      tableConfig.body = trendData.map(item => [
        item.month,
        `₱${item.inStore.toLocaleString()}`,
        `₱${item.online.toLocaleString()}`
      ]);
    }

    // Generate table
    autoTable(doc, tableConfig);

      // Save the PDF
      doc.save(`${title.toLowerCase().replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check console for details.');
    }
  };

  const exportToCSV = () => {
    let csvContent = '';
    const title = getReportTitle();

    // Create CSV content based on report type
    if (reportType === 'sales') {
      csvContent = 'Month,Sales\n';
      csvContent += salesData.map(item =>
        `${item.month},${item.sales}`
      ).join('\n');
    } else if (reportType === 'category') {
      csvContent = 'Category,Percentage\n';
      csvContent += categoryData.map(item =>
        `${item.name},${item.value}`
      ).join('\n');
    } else if (reportType === 'trend') {
      csvContent = 'Month,In-Store Sales,Online Sales\n';
      csvContent += trendData.map(item =>
        `${item.month},${item.inStore},${item.online}`
      ).join('\n');
    }

    // Create and save the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${title.toLowerCase().replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports Generation</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90" onClick={exportToPDF}>
            Export to PDF
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90" onClick={exportToCSV}>
            Export to CSV
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <div className="flex flex-col space-y-2">
              {reportTypes.map((type) => (
                <div
                  key={type.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer border ${reportType === type.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  onClick={() => setReportType(type.id)}
                >
                  <type.icon className={`mr-3 ${reportType === type.id ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={reportType === type.id ? 'font-semibold text-primary' : 'text-gray-600'}>
                    {type.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      type="date"
                      placeholder="From Date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      type="date"
                      placeholder="To Date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button variant="default" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Display */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FileText className="mr-2 text-primary" size={24} />
            <h2 className="text-xl font-semibold">{getReportTitle()}</h2>
          </div>
          <p className="text-sm text-gray-500">
            {fromDate && toDate ? `${fromDate} - ${toDate}` : 'Last 6 months'}
          </p>
        </div>

        <div className="mb-6">
          {renderChart()}
        </div>

        {/* Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold">₱85,000.00</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Average Monthly Sales</p>
            <p className="text-2xl font-bold">₱14,166.67</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Most Profitable Month</p>
            <p className="text-2xl font-bold">May</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;