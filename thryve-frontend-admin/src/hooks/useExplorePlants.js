import { useQuery } from "@tanstack/react-query";
import { getPlantsApi, getPlantByIdApi } from "../api/explorePlantApi";

export const useGetPlants = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["explore-plants"],
    queryFn: getPlantsApi,
  });

  return {
    plants: data,
    isLoading,
    isError,
    refetch,
  };
};

export const useGetPlant = (id) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["explore-plant", id],
    queryFn: () => getPlantByIdApi(id),
    enabled: !!id, 
  });

  return {
    plant: data,
    isLoading,
    isError,
    refetch,
  };
};
