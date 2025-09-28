import { useState } from "react";
import { X, Plus, Trash2, Upload, Image, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlantApi } from "../../api/explorePlantApi";
import { uploadImageToCloudinary } from "../../lib/uploadImageToCloudinary";

// ✅ Plant types list
const plantTypes = [
  "All Plants", // for filtering only, excluded in dropdown
  "Flowering",
  "Indoor",
  "Outdoor",
  "Succulent",
  "Herb",
  "Tree",
  "Fern",
  "Cactus",
];

// ✅ Predefined Plant Sizes
const sizeOptions = ["Small", "Medium", "Large", "Extra Large"];

export default function AddPlantModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addPlantApi,
    onSuccess: () => {
      alert("Plant added successfully!");
      setFormData({
        commonName: "",
        scientificName: "",
        description: "",
        funFact: "",
        ims_url: "",
        type: null,
        plantSizes: [{ size: "", price: "" }],
      });
      setImagePreview(null);
      onClose();
      queryClient.invalidateQueries(["explore-plants"]);
    },
    onError: (err) => {
      alert(err.message || "Something went wrong");
    },
  });

  const [formData, setFormData] = useState({
    commonName: "",
    scientificName: "",
    description: "",
    funFact: "",
    ims_url: "",
    type: null,
    plantSizes: [{ size: "", price: "" }],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSizeChange = (index, field, value) => {
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
      plantSizes: [...prev.plantSizes, { size: "", price: "" }],
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

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result);
      reader.readAsDataURL(file);

      const url = await uploadImageToCloudinary(file);

      setFormData((prev) => ({
        ...prev,
        ims_url: url,
      }));
    } catch (err) {
      alert("Image upload failed. Try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      ims_url: "",
    }));
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.ims_url) {
      alert("Please upload an image first");
      return;
    }

    mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Inputs */}
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

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Plant Image *
            </label>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="bg-green-50 p-3 rounded-full">
                    {isUploading ? (
                      <Loader2
                        className="text-primary animate-spin"
                        size={24}
                      />
                    ) : (
                      <Upload className="text-primary" size={24} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {isUploading
                        ? "Uploading image..."
                        : "Click to upload image"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  <Image size={12} className="inline mr-1" />
                  Uploaded
                </div>
              </div>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type (Optional)
            </label>
            <select
              value={formData.type || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value || null,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">Select a type...</option>
              {plantTypes
                .filter((type) => type !== "All Plants")
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>

          {/* Description */}
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

          {/* Fun Fact */}
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

          {/* Plant Sizes */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Plant Sizes *
              </label>
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Size
                      </label>
                      <select
                        required
                        value={size.size}
                        onChange={(e) =>
                          handleSizeChange(index, "size", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select size...</option>
                        {sizeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
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

          {/* Action Buttons */}
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
              disabled={isPending || isUploading}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Add Plant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
