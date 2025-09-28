import api from "../services/api";

export const getPlantsApi = async () => {
  try {
    const response = await api.get("/explore-plant");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch plants");
  }
};

export const getPlantByIdApi = async (id) => {
  try {
    const response = await api.get(`/explore-plant/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch plant details");
  }
};

export const addPlantApi = async (data) => {
    try {
      
      
    const response = await api.post(`/explore-plant`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch plant details");
  }
};

export const updatePlantApi = async (data) => {
    console.log("datadata", data);
  try {
    const response = await api.put(`/explore-plant/${data?.id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch plant details");
  }
};
