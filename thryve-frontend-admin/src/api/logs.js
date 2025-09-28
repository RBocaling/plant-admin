import api from "../services/api"

export const getActivityLogs = async () => {
    try {
        const res = await api.get("/logs/all-activity");
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
}