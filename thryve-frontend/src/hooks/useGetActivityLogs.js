import { useQuery } from "@tanstack/react-query"
import { getActivityLogs } from "../api/logs";

const useGetActivityLogs = () => {
    const { data, isError, isLoading , refetch} = useQuery({
        queryKey: ["get-activityLogs"],
        queryFn: getActivityLogs
    });

    
   return {
    data: data?.data,
    isLoading,
  };

}


export default useGetActivityLogs