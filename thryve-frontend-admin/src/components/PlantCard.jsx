import React from 'react';

const PlantCard = ({ plant, onPlantClick }) => {
  const lowestPrice = Math.min(...plant.sizes.map(size => size.price));
  const availableSizes = plant.sizes.map(size => size.size);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
      <div 
        className="cursor-pointer"
        onClick={() => onPlantClick(plant)}
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-poppins font-semibold text-lg text-thryve-green mb-2 hover:text-thryve-orange transition-colors">
            {plant.name}
          </h3>
          <p className="font-inter text-sm text-gray-600 mb-3 italic">
            {plant.scientificName}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-poppins font-bold text-thryve-orange text-lg">
              ₱{lowestPrice.toFixed(2)}
            </span>
            <div className="flex gap-1">
              {availableSizes.map(size => (
                <span
                  key={size}
                  className="inline-block px-2 py-1 text-xs font-inter font-medium bg-thryve-light-green text-white rounded"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;