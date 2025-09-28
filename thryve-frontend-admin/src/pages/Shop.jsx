import React, { useState } from "react";
import { useShop } from "../hooks/useShop";
import { uploadImageToCloudinary } from "../lib/uploadImageToCloudinary";

const tabs = [
  { key: "plants", label: "Plants" },
  { key: "fertilizers", label: "Fertilizers" },
  { key: "pots", label: "Pots" },
];

export default function Shop() {
  const [activeTab, setActiveTab] = useState("plants");
  const {
    items,
    createItem,
    editItem,
    removeItem,
    loading: fetchingItems,
    error,
  } = useShop(activeTab);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const openModal = (item = null) => {
    setEditingItem(item);
    setPreview(item?.image_url || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingItem(null);
    setFile(null);
    setPreview(null);
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const product = {
        name: e.target.name.value,
        description: e.target.description.value,
        price: parseFloat(e.target.price.value),
        stocks: parseInt(e.target.stocks.value) || 0,
      };

      // Upload image to Cloudinary if a file is selected
      if (file) {
        const imageUrl = await uploadImageToCloudinary(file);
        product.image_url = imageUrl;
      } else if (editingItem?.image_url) {
        product.image_url = editingItem.image_url;
      }

      if (editingItem) {
        await editItem(editingItem.id, product);
      } else {
        await createItem(product);
      }

      closeModal();
    } catch (err) {
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Plant Shop</h1>

      {/* Tabs + Add button */}
      <div className="flex items-center gap-4 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === t.key
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          onClick={() => openModal()}
          className="ml-auto px-4 py-2 rounded-md bg-primary text-white shadow-md hover:bg-green-500 transition"
        >
          Add {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loading indicator while fetching items */}
      {fetchingItems && <p className="text-gray-600 mb-4">Loading items...</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-gray-600 font-medium">Image</th>
              <th className="p-3 text-left text-gray-600 font-medium">Name</th>
              <th className="p-3 text-left text-gray-600 font-medium">
                Description
              </th>
              <th className="p-3 text-left text-gray-600 font-medium">Price</th>
              <th className="p-3 text-left text-gray-600 font-medium">
                Stocks
              </th>
              <th className="p-3 text-left text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className={`transition hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded-md border"
                    />
                  )}
                </td>
                <td className="p-3 font-semibold text-gray-800">{item.name}</td>
                <td className="p-3 text-gray-600">{item.description}</td>
                <td className="p-3 font-bold text-gray-800">${item.price}</td>
                <td className="p-3 text-gray-700">{item.stocks}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingItem ? "Update" : "Add"} {activeTab.slice(0, -1)}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                defaultValue={editingItem?.name || ""}
                placeholder="Name"
                required
                className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="description"
                defaultValue={editingItem?.description || ""}
                placeholder="Description"
                className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={editingItem?.price || ""}
                placeholder="Price"
                className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="stocks"
                type="number"
                defaultValue={editingItem?.stocks || ""}
                placeholder="Stocks"
                className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
              />
              <input type="file" onChange={handleFileChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-20 w-20 object-cover mt-2 rounded-md border"
                />
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
