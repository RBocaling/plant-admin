import api from "../services/api";

export const getPlantAdvisory = async () => {
    try {
        const response = await api.get("/plant-advisory/get-all-advisory");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const updateAdvisoryStatus = async () => {
    try {
        const response = await api.get("/plant-advisory/update-status");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const updateAdvisoryPriority = async () => {
    try {
        const response = await api.get("/plant-advisory/update-priority");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const getPlantAdvisoryById = async (data) => {
    try {
        const response = await api.get(`/plant-advisory/get-advisory/${data?.id}`, data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}
export const submitSpecialistResponse = async (data) => {
    try {
        const response = await api.post("/plant-advisory/make-response", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}