import React, { useState } from "react";
import { Plus, Eye, Search, Filter, Leaf, ShoppingBag } from "lucide-react";
import { useGetPlants } from "../hooks/useExplorePlants";
import ViewPlantModal from "../components/explore-plant/ViewPlantModal";
import AddPlantModal from "../components/explore-plant/AddPlantModal";
import UpdatePlantModal from "../components/explore-plant/UpdatePlantModal";
import { otherItem, plantTypes } from "../constant/plantType";

function App() {
  const { plants, isLoading } = useGetPlants();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddModalOpenOther, setIsAddModalOpenOther] = useState(false);
  const [isPlantTab, setIsPlantTab] = useState("plant");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All Plants");

  const openViewModal = (plant) => {
    setSelectedPlant(plant);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openUpdateModal = (plant) => {
    setSelectedPlant(plant);
    setIsUpdateModalOpen(true);
  };

  // 🔎 Search + Tab Filter
  const filteredPlants = plants
    ?.filter(
      (plant) =>
        plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((plant) => {
      if (activeTab === "All Plants") return true;
      return plant.type?.toLowerCase() === activeTab.toLowerCase();
    });

  const filteredPlants2 = plants
    ?.filter((item) =>
      plantTypes.map((p) => p.toLowerCase()).includes(item.type?.toLowerCase())
    )
    ?.filter(
      (plant) =>
        plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((plant) => {
      if (activeTab === "All Plants") return true;
      return plant.type?.toLowerCase() === activeTab.toLowerCase();
    });

  const filteredOthers = plants
    ?.filter((item) =>
      otherItem.map((o) => o.toLowerCase()).includes(item.type?.toLowerCase())
    )
    ?.filter(
      (plant) =>
        plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((plant) => {
      if (activeTab === "All Plants") return true;
      return plant.type?.toLowerCase() === activeTab.toLowerCase();
    });

  console.log("filteredPlants2", filteredPlants2);
  console.log("filteredOthers", filteredOthers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Search and Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Add Items
              </button>
              <button
                onClick={() => setIsAddModalOpenOther(true)}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Add Other Items
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 mb-9">
          <button
            onClick={() => setIsPlantTab("plant")}
            className={`text-lg font-medium text ${
              isPlantTab == "plant" ? "text-primary underline" : "text-black"
            }`}
          >
            Plants List
          </button>
          <button
            onClick={() => setIsPlantTab("others")}
            className={`text-lg font-medium text ${
              isPlantTab == "others" ? "text-primary underline" : "text-black"
            }`}
          >
            Others
          </button>
        </div>
        {isPlantTab == "plant" ? (
          <>
            {" "}
            {/* Plant Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {plantTypes?.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Plant Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlants2?.map((plant) => (
                <div
                  key={plant.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => openViewModal(plant)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={plant.ims_url}
                      alt={plant.commonName}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openViewModal(plant);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-green-50"
                      >
                        <Eye size={16} className="inline mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {plant.commonName}
                    </h3>
                    <p className="text-sm text-gray-500 italic mb-3">
                      {plant.scientificName}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {plant.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-primary" />
                        <span className="text-sm text-gray-600">
                          {plant.plantSizes.length} sizes
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          ₱
                          {Math.min(
                            ...plant.plantSizes.map((size) =>
                              parseInt(size.price)
                            )
                          )}{" "}
                          - ₱
                          {Math.max(
                            ...plant.plantSizes.map((size) =>
                              parseInt(size.price)
                            )
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Size Options Preview */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-sm">
                        {plant.plantSizes.map((size) => (
                          <div key={size.id} className="text-center">
                            <p className="text-gray-500 text-xs">{size.size}</p>
                            <p className="font-semibold text-primary">
                              ₱{size.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* No Plants */}
            {filteredPlants2?.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg p-12">
                  <Leaf className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Plants Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or add a new plant to the
                    collection.
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Your First Plant
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {" "}
            {/* Other item Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {otherItem?.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Plant Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredOthers?.map((plant) => (
                <div
                  key={plant.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => openViewModal(plant)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={plant.ims_url}
                      alt={plant.commonName}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openViewModal(plant);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-primary px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-green-50"
                      >
                        <Eye size={16} className="inline mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {plant.commonName}
                    </h3>
                    <p className="text-sm text-gray-500 italic mb-3">
                      {plant.scientificName}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {plant.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-primary" />
                        <span className="text-sm text-gray-600">
                          {plant.plantSizes.length} sizes
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          ₱
                          {Math.min(
                            ...plant.plantSizes.map((size) =>
                              parseInt(size.price)
                            )
                          )}{" "}
                          - ₱
                          {Math.max(
                            ...plant.plantSizes.map((size) =>
                              parseInt(size.price)
                            )
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Size Options Preview */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-sm">
                        {plant.plantSizes.map((size) => (
                          <div key={size.id} className="text-center">
                            <p className="text-gray-500 text-xs">{size.size}</p>
                            <p className="font-semibold text-primary">
                              ₱{size.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* No Plants */}
            {filteredOthers?.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg p-12">
                  <Leaf className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Plants Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or add a new plant to the
                    collection.
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Your First Plant
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <ViewPlantModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        plant={selectedPlant}
        onEdit={openUpdateModal}
      />
      <AddPlantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        type="plant"
      />
      {/* add others */}
      <AddPlantModal
        isOpen={isAddModalOpenOther}
        onClose={() => setIsAddModalOpenOther(false)}
        type="other"
      />
      <UpdatePlantModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        plant={selectedPlant}
      />
    </div>
  );
}

export default App;
