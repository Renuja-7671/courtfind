import api from "./api";

// Fetch owner profile
export const getOwnerProfile = async (token) => {
    try {
        const response = await api.get("/owner/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("The response is for data: ", response);
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
    console.log("The form data is added:", formData);

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

export const getDashboardStats = async (token ) => {
    try {
        const response = await api.get('/owner/dashboard/stats', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log("stats dataaaaaaaaaaaa are:",response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

export const getIncomeOverview = async (token) => {
    try {
        const response = await api.get('/owner/dashboard/income-overview', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching income overview:', error);
        throw error;
    }
};

export const getRecentBookings = async (token) => {
    try {
        const response = await api.get('/owner/dashboard/recent-bookings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recent bookings:', error);
        throw error;
    }
};

export const getPaymentHistory = async (token) => {
    try {
        const response = await api.get('/owner/dashboard/payment-history', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching payment history:', error);
        throw error;
    }
};




