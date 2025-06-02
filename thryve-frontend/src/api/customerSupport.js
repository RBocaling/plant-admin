import api from "../services/api";

export const getAllConcern = async () => {
    try {
        const response = await api.get("/supports/get-all-concern");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const replyResponse = async (data) => {
    try {
        const response = await api.get("/supports/reply-response", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
}
}

export const getConcernById = async (data) => {
    try {
        const response = await api.get(`/supports/get-concern/${data?.id}`, data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}