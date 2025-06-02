import { useQuery } from "@tanstack/react-query"
import { getUserList } from "../api/userApi"

const useGetUserList = () => {
    const { data, isError, isLoading , refetch} = useQuery({
        queryKey: ["get=user"],
        queryFn: getUserList
    });

    
   return {
    data: data?.data,
    isLoading,
  };

}


export default useGetUserList