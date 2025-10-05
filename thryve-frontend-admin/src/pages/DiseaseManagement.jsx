import React, { useState } from "react";
import { Eye, Search, AlertTriangle, Plus } from "lucide-react";
import { getDiseases } from "../api/diseases";
import ViewDiseasesModal from "../components/explore-diseases/ViewDiseasesCategoryModal";
import { useQuery } from "@tanstack/react-query";
import UpdatePlantModal from "../components/explore-diseases/UpdateDiseaseCategoryModal";
import AddPlantModal from "../components/explore-diseases/AddDiseaseCategoryModal";
import { useDiseaseCategories } from "../hooks/useDiseaseCategories";

function DiseasesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All Diseases");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { categoryList } = useDiseaseCategories(); // ✅ dynamic tabs

  const { data: diseases, isLoading: diseasesLoading } = useQuery({
    queryKey: ["get-diseases"],
    queryFn: getDiseases,
  });

  const openViewModal = (plant) => {
    setSelectedPlant(plant);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => setIsViewModalOpen(false);

  const openUpdateModal = (plant) => {
    setSelectedPlant(plant);
    setIsUpdateModalOpen(true);
  };

  // Filter diseases by active tab and search term
  const filteredDiseases = diseases
    ?.filter((d) => {
      if (activeTab === "All Diseases") return true;
      return d.categoryId === Number(activeTab); // activeTab now stores category.id
    })
    ?.filter((d) => d.disease.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header + Search + Add */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Inventory</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              Add Disease
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("All Diseases")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "All Diseases"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200"
            }`}
          >
            All Diseases
          </button>

          {categoryList?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === cat.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200"
              }`}
            >
              {cat.diseaseTitle}
            </button>
          ))}
        </div>

        {/* Loading */}
        {diseasesLoading && (
          <p className="text-gray-500">Loading diseases...</p>
        )}

        {/* Disease Grid */}
        {!diseasesLoading && filteredDiseases?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDiseases.map((item) => (
              <div
                key={item.id}
                onClick={() => openViewModal(item)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.disease}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-green-50">
                      <Eye size={16} className="inline mr-2" />
                      View
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {item.disease}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    <strong>Caused by:</strong> {item.causedBy}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Symptoms:</strong> {item.mainSymptoms}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Prevention:</strong> {item.preventionControl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!diseasesLoading && filteredDiseases?.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <AlertTriangle className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Diseases Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or add new disease entries.
              </p>
            </div>
          </div>
        )}
      </div>

      <ViewDiseasesModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        plant={selectedPlant}
        onEdit={openUpdateModal}
      />
      <UpdatePlantModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        disease={selectedPlant}
      />
      <AddPlantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

export default DiseasesList;
