import api from "./api";

//get all bookings of the player
export const getPlayerBookings = async (token) => {
    try {
        const response = await api.get('/player/bookings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching player bookings:', error);
        throw error;
    }
};

// Fetch player profile
export const getPlayerProfile = async (token) => {
    try {
        const response = await api.get("/player/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("The details of the player:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

// Update player profile
export const updatePlayerProfile = async (token, profileData) => {
    try {
        const response = await api.put("/player/profile", profileData, {
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
    console.log("The form data is added:", formData);

    const response = await api.post("/player/profile/upload", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("The profile image path is:", response.data.imageUrl);
    return response.data.imageUrl;
};

// Get profile image (playerAuthService.jsx)
export const getProfileImage = async (token) => {
    const response = await api.get("/player/profile/image", {
        headers: { Authorization: `Bearer ${token}` }, // Add auth token
    });
    console.log("The response is: ", response);
    console.log("The image service URL: ", response.data);
    return response.data;
};


// Player change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
      const response = await api.put("/player/change-password", { currentPassword, newPassword });
      return response.data;
  } catch (error) {
      throw error.response?.data?.message || "Failed to change password";
  }
};