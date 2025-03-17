import api from "./api";

// Fetch owner profile
export const getOwnerProfile = async (token) => {
    try {
        const response = await api.get("/owner/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

// Update owner profile
export const updateOwnerProfile = async (token, profileData) => {
    try {
        const response = await api.put("/owner/profile", profileData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

// Upload profile image
export const uploadProfileImage = async (file, token) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/owner/profile/upload", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.imageUrl;
};

// Get profile image (ownerAuthService.jsx)
export const getProfileImage = async (token) => {
    const response = await api.get("/owner/profile/image", {
        headers: { Authorization: `Bearer ${token}` }, // Add auth token
    });
    console.log("The response is: ", response);
    console.log("The image service URL: ", response.data);
    return response.data;
};
