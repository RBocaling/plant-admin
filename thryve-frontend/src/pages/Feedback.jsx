import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Star, 
  Check, 
  X, 
  ArrowUpDown,
  Download
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import useGetFeedBack from '../hooks/useGetFeedBack';
import { format } from 'date-fns';

const Feedback = () => {


  const { data, isLoading } = useGetFeedBack();

  const feedBack = data?.map((i) => {
    const customer = i?.user;

    return {
       id: i?.id,
      customer: `${customer?.firstName} ${customer?.lastName}`,
      email: customer?.email,
      date: format(new Date(i?.createdAt), "MMM dd, yyyy"),
      message: i?.description,
      rating: i?.rating,
      status: i?.status,
      response: i?.response
    }
  })
  const [feedbackItems, setFeedbackItems] = useState(feedBack || []);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [responseText, setResponseText] = useState('');
  
  // Filter feedback based on search term and status filter
  const filteredFeedback = feedbackItems.filter(item => {
    const matchesSearch = 
      item.customer.toLowerCase().includes(search.toLowerCase()) || 
      item.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Sort feedback based on sort field and direction
  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
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

  // Handle selecting a feedback item for response
  const handleSelectFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setResponseText(feedback.response || '');
  };

  // Handle submitting a response to feedback
  const handleSubmitResponse = () => {
    if (!selectedFeedback) return;
    
    const updatedFeedback = feedbackItems.map(item => {
      if (item.id === selectedFeedback.id) {
        return {
          ...item,
          status: 'Resolved',
          response: responseText
        };
      }
      return item;
    });
    
    setFeedbackItems(updatedFeedback);
    setSelectedFeedback(null);
    setResponseText('');
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Feedback</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90">
            Export Feedback
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <Input
              type="text"
              placeholder="Search by customer name or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex items-center">
              <Filter className="mr-2 text-gray-500" size={18} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('customer')}>
                      <div className="flex items-center space-x-1">
                        <span>Customer</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('rating')}>
                      <div className="flex items-center space-x-1">
                        <span>Rating</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedFeedback.length > 0 ? (
                    sortedFeedback.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{item.customer}</p>
                            <p className="text-sm text-gray-500">{item.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSelectFeedback(item)}
                          >
                            <MessageSquare size={16} className="mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                        No feedback found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Feedback Response Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">
              {selectedFeedback ? 'Respond to Feedback' : 'Select Feedback'}
            </h2>
            
            {selectedFeedback ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium">{selectedFeedback.customer}</p>
                  <p className="text-sm text-gray-500 mb-2">{new Date(selectedFeedback.date).toLocaleDateString()}</p>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < selectedFeedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{selectedFeedback.message}</p>
                </div>
                
                {/* <div>
                  <label className="block mb-1 font-medium text-sm">Your Response</label>
                  <Textarea 
                    placeholder="Type your response here..." 
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={5}
                    className="w-full"
                  />
                </div> */}
                
                <div className="flex justify-start space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedFeedback(null)}
                  >
                    <X size={16} className="mr-1 text-red-500" />
                    Close
                  </Button>
                  {/* <Button 
                    size="sm"
                    onClick={handleSubmitResponse}
                    disabled={!responseText.trim()}
                    className="text-white bg-[#4A7C59] hover:bg-[#4A7C59]/90"
                  >
                    <Check size={16} className="mr-1" />
                    Submit Response
                  </Button> */}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="mx-auto mb-2 text-gray-400" size={32} />
                <p>Select a feedback from the list to respond</p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
            <h3 className="font-medium mb-2">Feedback Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Feedback</span>
                <span className="font-medium">{feedbackItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Rating</span>
                <span className="font-medium">
                  {(feedbackItems.reduce((acc, item) => acc + item.rating, 0) / feedbackItems.length).toFixed(1)} / 5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending Responses</span>
                <span className="font-medium">{feedbackItems.filter(item => item.status !== 'Resolved').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;