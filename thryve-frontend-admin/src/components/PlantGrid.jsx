import React from 'react';
import PlantCard from './PlantCard';

const PlantGrid = ({ plants, onPlantClick }) => {
  if (plants.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="text-gray-500 font-inter">
          <p className="text-lg mb-2">No plants found</p>
          <p className="text-sm">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plants.map(plant => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onPlantClick={onPlantClick}
        />
      ))}
    </div>
  );
};

export default PlantGrid;