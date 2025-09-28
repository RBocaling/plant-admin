import { useQuery } from "@tanstack/react-query"
import { getUserList } from "../api/userApi"
import { getFeedbackList } from "../api/feedBack";

const useGetFeedBack = () => {
    const { data, isError, isLoading , refetch} = useQuery({
        queryKey: ["get-feedback"],
        queryFn: getFeedbackList
    });

    
   return {
    data: data?.data,
    isLoading,
  };

}


export default useGetFeedBack