import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { getDiseases, getDiseasesCategory } from "../api/diseases";

export const useDiseaseCategories = () => {
  const queryClient = useQueryClient();

  const addCategory = useMutation({
    mutationFn: async (newCategory) => {
      const res = await api.post("/diseases", newCategory);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["diseaseCategories"]),
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/diseases/${id}`, data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["diseaseCategories"]),
  });

  const deleteCategory = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/diseases/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(["diseaseCategories"]),
  });
    
    
     const { data: categoryList, isLoading: categoryListloading } = useQuery({
       queryKey: ["disease-Categmories"],
       queryFn: getDiseasesCategory,
     });
     const { data: diseasesList, isLoading: diseasesListLoading } = useQuery({
       queryKey: ["disease-dibksease"],
       queryFn: getDiseases,
     });

  return {
    addCategory,
    updateCategory,
    deleteCategory,

    diseasesList,
    diseasesListLoading,
    categoryList,
    categoryListloading,
  };
};
