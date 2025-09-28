import React from 'react';
import { X, Info, Lightbulb, ShoppingBag, Edit } from 'lucide-react';

export default function ViewPlantModal({ isOpen, onClose, plant, onEdit }) {
  if (!isOpen || !plant) return null;

  const handleEdit = () => {
    onEdit(plant);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{plant.commonName}</h2>
              <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={plant.ims_url}
                alt={plant.commonName}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Info className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{plant.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="text-yellow-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Fun Fact</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{plant.funFact}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <ShoppingBag className="text-primary" size={20} />
              Available Sizes & Prices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plant.plantSizes.map((size) => (
                <div key={size.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-md transition-all border border-green-100">
                  <div className="text-center">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-2xl font-bold text-primary">{size.size.charAt(0)}</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{size.size} Size</h4>
                    <p className="text-2xl font-bold text-primary">₱{size.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={handleEdit}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Edit size={16} />
              Edit Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}