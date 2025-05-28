import api from "./api";

export const createBooking = async (bookingData, token) => {
  try {
    console.log("Booking Data:", bookingData);
    const response = await api.post('/player/create-booking', bookingData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }); 
    return response.data;
  } catch (error) {
    console.error("Booking failed:", error);
    return { success: false, error: error.response?.data?.error || "Unknown error" };
  }
};