import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit2, Trash2, ArrowUpDown, Filter, Download } from 'lucide-react';

const AdminInventory = () => {
  // Sample inventory data
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Monstera Deliciosa', category: 'Indoor', price: 850, stock: 15, status: 'In Stock' },
    { id: 2, name: 'Snake Plant', category: 'Indoor', price: 550, stock: 23, status: 'In Stock' },
    { id: 3, name: 'Fiddle Leaf Fig', category: 'Indoor', price: 1250, stock: 8, status: 'Low Stock' },
    { id: 4, name: 'Bird of Paradise', category: 'Indoor', price: 1100, stock: 12, status: 'In Stock' },
    { id: 5, name: 'Rose Bush', category: 'Outdoor', price: 350, stock: 20, status: 'In Stock' },
    { id: 6, name: 'Hibiscus', category: 'Outdoor', price: 280, stock: 5, status: 'Low Stock' },
    { id: 7, name: 'Lavender', category: 'Outdoor', price: 220, stock: 0, status: 'Out of Stock' },
    { id: 8, name: 'Jasmine', category: 'Outdoor', price: 300, stock: 10, status: 'In Stock' },
  ]);

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('');
  
  // Filter inventory based on search term and category filter
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Sort inventory based on sort field and direction
  const sortedInventory = [...filteredInventory].sort((a, b) => {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline"  className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90">
            Export to CSV
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="default"className="bg-[#4A7C59] text-white hover:bg-[#4A7C59]/90">
            Add New Plant
            <Plus className="ml-2 h-4 w-4" />
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
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex items-center">
              <Filter className="mr-2 text-gray-500" size={18} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Categories</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('id')}>
                  <div className="flex items-center space-x-1">
                    <span>ID</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Plant Name</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('category')}>
                  <div className="flex items-center space-x-1">
                    <span>Category</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('price')}>
                  <div className="flex items-center space-x-1">
                    <span>Price (₱)</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('stock')}>
                  <div className="flex items-center space-x-1">
                    <span>Stock</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('status')}>
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedInventory.length > 0 ? (
                sortedInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">₱{item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{item.stock}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'In Stock'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'Low Stock'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No plants found matching your criteria
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

export default AdminInventory;
