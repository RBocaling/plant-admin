import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "../api/plant";

const useGetAllPlants = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["get-all-plants"],
    queryFn: getAllPlants,
  });

  return {
    data: data?.data,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetAllPlants;
