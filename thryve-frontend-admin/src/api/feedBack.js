import api from "../services/api";

export const getFeedbackList = async () => {
    try {
        const response = await api.get("/feedback/get-feedback");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const getFeedbackPerUser = async () => {
    try {
        const response = await api.get("/feedback/get-feedback-byuser");
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const createFeedback = async (data) => {
    try {
        const response = await api.get("/feedback/create-feedback", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const createResponse = async (data) => {
    try {
        const response = await api.get("/feedback/make-response", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

export const updateStatus = async (data) => {
    try {
        const response = await api.get("/feedback/update-status", data);
        return response.data
    } catch (error) {
        throw new Error("Invalid Credentials")
    }
}

// //kapag may params
// export const createResponses = async (data) => {
//     try {
//         const response = await api.get(`/feedback/create-feed/${data?.id}`, data);
//         return response.data
//     } catch (error) {
//         throw new Error("Invalid Credentials")
//     }
// }