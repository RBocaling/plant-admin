import { useQuery } from "@tanstack/react-query";
import { getUserAuth } from "../api/userApi";
import { getUsserInfo } from "../api/auth";
import { useAuthStore } from "../store/authStore";

const useUserAuth = () => {
  const { accessToken } = useAuthStore.getState();

  const { data, isError, isLoading , refetch} = useQuery({
    queryKey: ["get-user-info"],
        queryFn: getUsserInfo,
    enabled: !!accessToken, 
    refetchOnWindowFocus: true,
  });

  console.log( 'dddd',{ accessToken, data });
  
  return {
    data,
    role: data?.role || null,
    isError,
    isLoading,
    refetch,
    isAuthenticated: Boolean(data && accessToken),
  };
};

export default useUserAuth;
