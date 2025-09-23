import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";


export default function AddPlantModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    commonName: "",
    scientificName: "",
    description: "",
    funFact: "",
    ims_url: "",
    plantSizes: [{ size: "", price: "", img_url: "" }],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSizeChange = (
    index,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      plantSizes: prev.plantSizes.map((size, i) =>
        i === index ? { ...size, [field]: value } : size
      ),
    }));
  };

  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      plantSizes: [...prev.plantSizes, { size: "", price: "", img_url: "" }],
    }));
  };

  const removeSize = (index) => {
    if (formData.plantSizes.length > 1) {
      setFormData((prev) => ({
        ...prev,
        plantSizes: prev.plantSizes.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Plant data submitted:", formData);
    onClose();
    setFormData({
      commonName: "",
      scientificName: "",
      description: "",
      funFact: "",
      ims_url: "",
      plantSizes: [{ size: "", price: "", img_url: "" }],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add New Plant</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Common Name *
              </label>
              <input
                type="text"
                required
                value={formData.commonName}
                onChange={(e) =>
                  handleInputChange("commonName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="e.g., Snake Plant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scientific Name *
              </label>
              <input
                type="text"
                required
                value={formData.scientificName}
                onChange={(e) =>
                  handleInputChange("scientificName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="e.g., Sansevieria trifasciata"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              required
              value={formData.ims_url}
              onChange={(e) => handleInputChange("ims_url", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="https://example.com/plant-image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Describe the plant and its characteristics..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fun Fact *
            </label>
            <textarea
              required
              rows={2}
              value={formData.funFact}
              onChange={(e) => handleInputChange("funFact", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Share an interesting fact about this plant..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Plant Sizes *
              </label>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={16} />
                Add Size
              </button>
            </div>

            <div className="space-y-4">
              {formData.plantSizes.map((size, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Size
                      </label>
                      <input
                        type="text"
                        required
                        value={size.size}
                        onChange={(e) =>
                          handleSizeChange(index, "size", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Small Pot"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        required
                        value={size.price}
                        onChange={(e) =>
                          handleSizeChange(index, "price", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        required
                        value={size.img_url}
                        onChange={(e) =>
                          handleSizeChange(index, "img_url", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://example.com/size-image.jpg"
                      />
                    </div>
                  </div>
                  {formData.plantSizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Add Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
