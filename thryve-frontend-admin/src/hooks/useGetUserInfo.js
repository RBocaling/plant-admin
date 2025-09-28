import { useQuery } from "@tanstack/react-query"
import { getUsserInfo } from "../api/auth";

const useGetUserInfo = () => {
    const { data, isError, isLoading , refetch} = useQuery({
        queryKey: ["get-user-info"],
        queryFn: getUsserInfo
    });

    
   return {
    data: data,
    isLoading,
  };

}


export default useGetUserInfo