import api from "../services/api";

export const loginApi = async (data) => {
    try {
        const response = await api.post("/auth/login", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const getUsserInfo = async () => {
    try {
        const response = await api.get("/auth/get-info");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}
