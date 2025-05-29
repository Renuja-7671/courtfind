import api from "./api";

//create a booking
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

// Get booking times by court ID
export const getBookingTimesByCourtId = async (courtId, date) => {
  try {
    const response = await api.get(`/common/courtBookedTimes/${courtId}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch booking times:", error);
    return { success: false, error: error.response?.data?.error || "Unknown error" };
  }
};