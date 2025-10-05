"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, ArrowUpDown, Download } from "lucide-react";
import useGetFeedBack from "../hooks/useGetFeedBack";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Feedback = () => {
  const { data } = useGetFeedBack();
  const [feedbackItems, setFeedbackItems] = useState([]);

  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc" > "desc");

  useEffect(() => {
    if (data) {
      const mapped = data.map((i) => {
        const customer = i?.user;
        return {
          id: i?.id,
          customer: `${customer?.firstName} ${customer?.lastName}`,
          email: customer?.email,
          date: format(new Date(i?.createdAt), "MMM dd, yyyy"),
          message: i?.description,
          rating: i?.rating,
        };
      });
      setFeedbackItems(mapped);
    }
  }, [data]);

  const filteredFeedback = feedbackItems.filter((item) => {
    const matchesSearch =
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    const matchesRating = filterRating
      ? item.rating === Number(filterRating)
      : true;
    return matchesSearch && matchesRating;
  });

  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleExport = () => {
    if (!feedbackItems.length) {
      alert("No feedback to export.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Customer Feedback Report", 14, 20);

    const headers = [["Customer", "Email", "Date", "Rating", "Message"]];

    const data = feedbackItems.map((item) => [
      item.customer,
      item.email,
      item.date,
      item.rating.toString(),
      item.message ?? "",
    ]);

    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [74, 124, 89] },
    });

    doc.save("feedback_report.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Feedback</h1>
        <Button
          variant="outline"
          className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90"
          onClick={handleExport}
        >
          Export Feedback
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search by customer name or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center">
            <Filter className="mr-2 text-gray-500" size={18} />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">All Ratings</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
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
                  onClick={() => handleSort("rating")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Rating</span>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedFeedback.length > 0 ? (
                sortedFeedback.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{item.customer}</p>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No feedback found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
