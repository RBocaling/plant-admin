import api from "../services/api";

export const plantHisotryApi = async () => {
    try {
        const response = await api.get("/history/get-all-history");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const addPlant = async (data) => {
    try {
        const response = await api.post("/plants/add-plant", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const updatePlant = async (id, formData) => {
  try {
    const response = await api.put(`/plants/edit-plant/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update plant");
  }
};



export const getAllPlants = async () => {
    try {
        const response = await api.get("/plants/get-plants");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const deletePlant = async (id) => {
  try {
    const response = await api.delete(`/plants/delete-plant/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete plant");
  }
};



