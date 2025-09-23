import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllContactSupportApi,
  replyToContactSupportApi,
} from "../api/customerSupportApi";

export const useGetCustomerSupport = () => {
  return useQuery({
    queryKey: ["customerSupport"],
    queryFn: getAllContactSupportApi,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.parents || [],
  });
};

export const useReplyToContactSupport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: replyToContactSupportApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["customerSupport"]);
    },
  });
};
