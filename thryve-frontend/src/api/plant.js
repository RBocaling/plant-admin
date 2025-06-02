import api from "../services/api";

export const plantHisotryApi = async () => {
    try {
        const response = await api.get("/history/get-all-history");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}