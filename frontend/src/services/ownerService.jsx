import api from "./api";

export const getPendingArenasForOwner = async (token) => {
    try {
        const response = await api.get("/arena/pending-by-owner", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching pending arenas:", error);
        throw error;
    }
};


export const getPricingForNewArena = async (token) => {
    try {
        const response = await api.get("/arena/price-for-new-arena-by-owner", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching pricing for new arena:", error);
        throw error;
    }
};

export const getArenasForOwnerWithStatus = async (token) => {
    try {
        const response = await api.get("/arena/get-arenas-with-arenastatus", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching arenas with status for owner:", error);
        throw error;
    }
}
