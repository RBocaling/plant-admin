import { useQuery } from "@tanstack/react-query"
import { getUserList } from "../api/userApi"
import { getFeedbackList } from "../api/feedBack";
import { getPlantAdvisory } from "../api/plantAdvisory";
import { plantHisotryApi } from "../api/plant";

const useGetPlant = () => {
    const { data, isError, isLoading , refetch} = useQuery({
        queryKey: ["get-history"],
        queryFn: plantHisotryApi
    });

    
   return {
    data: data?.data,
    isLoading,
  };

}


export default useGetPlant