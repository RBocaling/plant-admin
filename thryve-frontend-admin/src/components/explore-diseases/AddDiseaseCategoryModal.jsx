import React, { useState } from "react";
import { X, Upload, Image, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageToCloudinary } from "../../lib/uploadImageToCloudinary";
import { addDisease } from "../../api/diseases"; // create this API function
import { useDiseaseCategories } from "../../hooks/useDiseaseCategories";

export default function AddDiseaseModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();
  const { categoryList } = useDiseaseCategories();
  const categoryOptions = categoryList || [];

  const [formData, setFormData] = useState({
    disease: "",
    image: "",
    causedBy: "",
    mainSymptoms: "",
    preventionControl: "",
    categoryId: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: addDisease,
    onSuccess: () => {
      alert("Disease added successfully!");
      handleClose();
      queryClient.invalidateQueries(["diseases"]);
    },
    onError: (err) => {
      alert(err.message || "Something went wrong");
    },
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert("Image upload failed. Try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload an image first");
    if (!formData.categoryId) return alert("Please select a category");

    mutate(formData);
  };

  const handleClose = () => {
    onClose();
    setFormData({
      disease: "",
      image: "",
      causedBy: "",
      mainSymptoms: "",
      preventionControl: "",
      categoryId: null,
    });
    setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add Disease</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Disease Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disease Name *
            </label>
            <input
              type="text"
              required
              value={formData.disease}
              onChange={(e) => handleInputChange("disease", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Disease Name"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Image *
            </label>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
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

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.categoryId || ""}
              onChange={(e) =>
                handleInputChange("categoryId", Number(e.target.value))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              <option value="">Select category</option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={Number(cat.id)}>
                  {cat.diseaseTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Caused By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caused By *
            </label>
            <textarea
              required
              rows={2}
              value={formData.causedBy}
              onChange={(e) => handleInputChange("causedBy", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="What causes this disease..."
            />
          </div>

          {/* Main Symptoms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Symptoms *
            </label>
            <textarea
              required
              rows={2}
              value={formData.mainSymptoms}
              onChange={(e) =>
                handleInputChange("mainSymptoms", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Main symptoms of the disease..."
            />
          </div>

          {/* Prevention & Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prevention & Control *
            </label>
            <textarea
              required
              rows={2}
              value={formData.preventionControl}
              onChange={(e) =>
                handleInputChange("preventionControl", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Prevention and control measures..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Add Disease"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
