import api from "./api";

export const submitContactForm = async (formData) => {
    try {
        const response = await api.post("/common/contact", formData);
        return { success: true, message: response.data.message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong!" };
    }
};