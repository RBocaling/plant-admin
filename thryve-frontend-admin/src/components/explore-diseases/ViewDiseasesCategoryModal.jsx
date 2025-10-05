import React from 'react';
import { X, Info, Lightbulb, ShoppingBag, Edit, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlantApi } from "../../api/explorePlantApi";
import { deleteDisease } from '../../api/diseases';

export default function ViewDiseasesModal({ isOpen, onClose, plant, onEdit }) {
  if (!isOpen || !plant) return null;

  const queryClient = useQueryClient();
  const handleEdit = () => {
    onEdit(plant);
    onClose();
  };
  const { mutate, isPending } = useMutation({
    mutationFn: deleteDisease,
    onSuccess: () => {
      queryClient.invalidateQueries(["explore-plants"]);
      alert("Success");
      onClose();
    },
    onError: () => {
      alert("Errror");
    },
  });

  const handleDelete = () => {
    mutate(plant?.id);
    };
    console.log("plant", plant);
    

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-5">
                {plant.disease}
                <span className='text-sm text-primary border border-primary rounded-full py-2 px-5'>{plant?.category?.diseaseTitle}</span>
              </h2>
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
                src={plant.image}
                alt={plant.disease}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Info className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Caused By
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {plant.causedBy}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="text-yellow-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Main Symptoms
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {plant.mainSymptoms}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="text-yellow-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Prevention Control
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {plant.preventionControl}
                </p>
              </div>
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
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                {!isPending && <Trash size={16} />}
                {isPending ? "Deleting" : "Delete"}
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}