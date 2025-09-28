import React from 'react';
import { X } from 'lucide-react';

const PlantDetailModal = ({ plant, isOpen, onClose, onContactSeller }) => {
  if (!isOpen || !plant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="font-poppins font-bold text-2xl text-thryve-green mb-2">
              {plant.name}
            </h2>
            <p className="font-inter text-gray-600 italic mb-4">
              {plant.scientificName}
            </p>

            <p className="font-inter text-gray-700 mb-6 leading-relaxed">
              {plant.description}
            </p>

            <div className="mb-6">
              <h3 className="font-poppins font-semibold text-lg text-thryve-green mb-3">
                Available Sizes & Prices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {plant.sizes.map(size => (
                  <div
                    key={size.size}
                    className="border border-thryve-light-green rounded-lg p-3 text-center"
                  >
                    <div className="font-poppins font-semibold text-thryve-green mb-1">
                      Size {size.size}
                    </div>
                    <div className="font-inter font-bold text-thryve-orange">
                      ₱{size.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onContactSeller(plant)}
              className="w-full bg-[#569F8B] btn-accent text-white font-poppins font-semibold py-3 px-6 rounded-lg hover:bg-thryve-orange transition-colors duration-300"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailModal;