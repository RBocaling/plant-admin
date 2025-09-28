import { useQuery } from "@tanstack/react-query"
import { getUserList } from "../api/userApi"
import { getFeedbackList } from "../api/feedBack";
import { getPlantAdvisory } from "../api/plantAdvisory";

const useGetAdvisory = () => {
    const { data, isError, isLoading , refetch} = useQuery({
        queryKey: ["get-advisory"],
        queryFn: getPlantAdvisory
    });

    
   return {
    data: data?.data,
    isLoading,
  };

}


export default useGetAdvisory