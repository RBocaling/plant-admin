import React, { useState } from "react";
import { useGetPlant, useGetPlants } from "../hooks/useExplorePlants";

const ExplorePlants = () => {
  const { plants, isLoading } = useGetPlants();
  const [selectedId, setSelectedId] = useState(null);
  const { plant, isLoading: loadingPlant } = useGetPlant(selectedId);

  console.log("plant", plant);
  
  if (isLoading) return <p>Loading plants...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Explore Plants</h1>

      {/* Plant Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {plants?.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded-lg shadow cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedId(p.id)}
          >
            <img
              src={p.ims_url}
              alt={p.commonName}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{p.commonName}</h3>
            <p className="text-sm italic text-gray-500">{p.scientificName}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedId && plant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setSelectedId(null)}
            >
              ✖
            </button>
            {loadingPlant ? (
              <p>Loading details...</p>
            ) : (
              <>
                <img
                  src={plant.ims_url}
                  alt={plant.commonName}
                  className="w-full h-56 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold">{plant.commonName}</h2>
                <p className="italic text-gray-500">{plant.scientificName}</p>
                <p className="mt-2 text-gray-700">{plant.description}</p>
                <p className="mt-2 text-sm text-gray-500 italic">
                  🌿 Fun Fact: {plant.funFact}
                </p>
                <h3 className="mt-4 font-semibold">Sizes & Prices</h3>
                <ul className="flex gap-2 mt-2">
                  {plant.plantSizes.map((size) => (
                    <li
                      key={size.id}
                      className="border px-3 py-2 rounded shadow text-center"
                    >
                      {size.size} - ₱{size.price}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePlants;
