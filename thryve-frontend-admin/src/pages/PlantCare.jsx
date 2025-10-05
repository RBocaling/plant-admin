import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ArrowUpDown, Download, Leaf, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useGetAdvisory from '../hooks/useGetAdvisory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitSpecialistResponse } from '../api/plantAdvisory';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


const PlantCare = () => {
  // Sample plant care advisory data
  const { data, isLoading } = useGetAdvisory();

  console.log("advisory",);
  const advisoryItems = data?.map((i) => {
    const customer = i?.user;
    return {
      id: i?.id,
      plantName: i?.plant_name,
      requestType: i?.request_type,
      customer: `${customer?.firstName} ${customer?.lastName}`,
      email: customer?.email,
      createdAt: i?.createdAt,
      description: i?.description,
      date: i?.createdAt ? new Date(i?.createdAt).toLocaleDateString() : '-',
      status: i?.status,
      priority: i?.priority,
      response: i?.response
    };
  }) ?? [];

 const exportToPDF = () => {
  if (!advisoryItems || advisoryItems.length === 0) {
    toast.warning("No advisory data available to export.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("Plant Advisory Report", 14, 20);

  const tableColumn = [
    "Plant Name",
    "Type",
    "Status",
    "Priority",
    "Customer",
    "Email",
    "Created Date",
    "Response"
  ];

  const tableRows = advisoryItems.map((item) => [
    item.plantName || "-",
    item.requestType || "-",
    item.status || "-",
    item.priority || "-",
    item.customer || "-",
    item.email || "-",
    item.date || "-",
    item.response || "-"
  ]);

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    headStyles: { fillColor: [74, 124, 89] }
  });

  doc.save("plant-advisory-report.pdf");
};
  // const [advisoryItems, setAdvisoryItems] = useState(advisory || []);

  // Sample care guides for the Knowledge Base
  const careGuides = [
    {
      id: 1,
      title: 'Complete Care Guide for Monstera Deliciosa',
      category: 'Tropical Plants',
      author: 'Dr. Green Thumb',
      date: '2023-04-10',
      excerpt: 'Everything you need to know about caring for your Monstera Deliciosa, from watering to propagation.'
    },
    {
      id: 2,
      title: 'Common Houseplant Diseases and Treatment',
      category: 'Plant Health',
      author: 'Dr. Green Thumb',
      date: '2023-03-15',
      excerpt: 'Learn to identify and treat common diseases affecting indoor plants.'
    },
    {
      id: 3,
      title: 'Seasonal Care Tips for Succulents',
      category: 'Succulents',
      author: 'Sandy Desert',
      date: '2023-02-20',
      excerpt: 'How to adjust your succulent care routine throughout the changing seasons.'
    },
    {
      id: 4,
      title: 'Repotting Techniques for Root-Bound Plants',
      category: 'General Care',
      author: 'Potting Professional',
      date: '2023-01-05',
      excerpt: 'Step-by-step guide for safely repotting plants that have outgrown their containers.'
    }
  ];

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);
  const [responseText, setResponseText] = useState('');
      const queryClient = useQueryClient();

  // Filter advisory items based on search term, status, and priority filters
  const filteredAdvisory = advisoryItems?.filter(item => {
    const matchesSearch = 
      item?.plantName?.toLowerCase().includes(search.toLowerCase()) || 
      item?.description?.toLowerCase().includes(search.toLowerCase()) ||
      item?.customer?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? item?.status === filterStatus : true;
    const matchesPriority = filterPriority ? item?.priority === filterPriority : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort advisory items based on sort field and direction
  const sortedAdvisory = [...filteredAdvisory].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Handle sorting when clicking on column header
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle selecting an advisory item for response
  const handleSelectAdvisory = (advisory) => {
    setSelectedAdvisory(advisory);
    setResponseText(advisory.response || '');
  };


  const { mutateAsync: responseAdvisory } = useMutation({
    mutationFn: submitSpecialistResponse,
    onSuccess: () => {
      toast.success('Response submit successfully')
                   queryClient.invalidateQueries({ queryKey: ["get=user"] });

    },
    onError: () => toast.error('Update failed'),
  });


  // Handle submitting a response to advisory
  const handleSubmitResponse = () => {
    if (!selectedAdvisory) return;
    
    if (selectedAdvisory.status === 'RESOLVED') {
    toast.warning("This advisory has already been resolved. You cannot submit a new response.");
    return;
     }

    responseAdvisory({id:selectedAdvisory?.id, response:responseText || ""})
    const updatedAdvisory = advisoryItems.map(item => {
      if (item.id === selectedAdvisory.id) {
        return {
          ...item,
          response: responseText
        };
      }
      return item;
    });
    
    console.log("test", selectedAdvisory);
    
    setAdvisoryItems(updatedAdvisory);
    setSelectedAdvisory(null);
    setResponseText('');
  };

  

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-100 text-blue-800';
      case 'INPROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'URGENT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  console.log("selectedAdvisory", selectedAdvisory);
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plant Care Advisory</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90"
            onClick={exportToPDF}
          >
            Export Data
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="requests" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">Advisory Requests</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="pt-4">
          {/* Search and Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search plants, customers, or descriptions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center">
                  <Filter className="mr-2 text-gray-500" size={18} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">All Status</option>
                    <option value="OPEN">Open</option>
                    <option value="INPROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <Filter className="mr-2 text-gray-500" size={18} />
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">All Priority</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Advisory Requests List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          className="px-4 py-3 cursor-pointer"
                          onClick={() => handleSort("plantName")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Plant</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 cursor-pointer"
                          onClick={() => handleSort("requestType")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Request Type</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 cursor-pointer"
                          onClick={() => handleSort("customer")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Customer</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 cursor-pointer"
                          onClick={() => handleSort("date")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Date</span>
                            <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sortedAdvisory.length > 0 ? (
                        sortedAdvisory.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">
                              {item.plantName}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {item.requestType}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {item.customer}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  item.status
                                )}`}
                              >
                                {item.status}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSelectAdvisory(item)}
                              >
                                <Leaf size={16} className="mr-1" />
                                {item.response ? "View" : "Respond"}
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-4 py-3 text-center text-gray-500"
                          >
                            No advisory requests found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Advisory Response Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4">
                  {selectedAdvisory ? "Provide Care Advice" : "Select Request"}
                </h2>

                {selectedAdvisory ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium">
                          {selectedAdvisory.plantName}
                        </p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                            selectedAdvisory.priority
                          )}`}
                        >
                          {selectedAdvisory.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {selectedAdvisory.requestType} •{" "}
                        {new Date(selectedAdvisory.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {selectedAdvisory.customer} ({selectedAdvisory.email})
                      </p>
                      <p className="text-gray-700 mt-2">
                        {selectedAdvisory.description}
                      </p>
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-sm">
                        Your Care Advice
                      </label>
                      <Textarea
                        placeholder="Type your care advice here..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows={8}
                        className="w-full"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAdvisory(null)}
                        className="w-full sm:w-auto flex items-center text-red-500 hover:bg-red-600 justify-center"
                      >
                        <X size={16} className="mr-2 " />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSubmitResponse}
                        disabled={!responseText.trim()}
                        className="w-full sm:w-auto flex items-center justify-center bg-white text-[#4A7C59] disabled:opacity-60"
                      >
                        <Check size={16} className="mr-2" />
                        Submit Advice
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Leaf className="mx-auto mb-2 text-gray-400" size={32} />
                    <p>Select an advisory request to provide care advice</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                <h3 className="font-medium mb-2">Advisory Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Total Requests
                    </span>
                    <span className="font-medium">{advisoryItems?.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Pending Requests
                    </span>
                    <span className="font-medium">
                      {
                        advisoryItems?.filter((item) => item.status === "OPEN")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      High Priority Requests
                    </span>
                    <span className="font-medium">
                      {
                        advisoryItems?.filter(
                          (item) => item.priority === "High"
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{guide.title}</h3>
                  <Badge variant="outline" className="bg-green-50">
                    {guide.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  By {guide.author} •{" "}
                  {new Date(guide.date).toLocaleDateString()}
                </p>
                <p className="mt-3 text-gray-700">{guide.excerpt}</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    View Full Guide
                  </Button>
                </div>
              </div>
            ))}

            {/* <div className="bg-primary/5 border border-primary/20 rounded-lg shadow-sm p-4 flex items-center justify-center">
              <Button variant="outline">
                + Create New Care Guide
              </Button>
            </div> */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlantCare;