import api from "../services/api";

export const getDiseasesCategory = async () => {
  try {
    const response = await api.get("/diseases/admin-category");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch plants");
  }
};
export const getDiseases = async () => {
  try {
    const response = await api.get("/diseases/admin-diseases");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch plants");
  }
};


export const addDisease = async (payload) => {
  try {
    const response = await api.post("/diseases", payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create disease");
  }
};

export const updateDisease = async (data) => {
  try {
    const response = await api.put(`/diseases/${data?.id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update disease");
  }
};

export const deleteDisease = async (id) => {
  try {
    const response = await api.delete(`/diseases/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete disease");
  }
};
