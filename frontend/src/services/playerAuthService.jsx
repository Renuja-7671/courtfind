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