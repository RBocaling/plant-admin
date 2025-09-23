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
