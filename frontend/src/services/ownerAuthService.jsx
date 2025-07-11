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
    return response.data;
};

export const getDashboardStats = async (token ) => {
    try {
        const response = await api.get('/owner/dashboard/stats', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
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

export const getBookings = async (token) => {
    try {
        const response = await api.get('/owner/arena-bookings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
        } catch (error) {
                    console.error('Error fetching bookings:', error);
                    throw error;
        }
};

export const updateBookingStatus = async (token, bookingId) => {
    try {
        const response = await api.put(`/owner/arena-bookings/${bookingId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
         });
        return response.data;
        } catch (error) {
                     console.error('Error updating booking status:', error);
                     throw error;
        }
};

export const getArenasOfOwner = async (token) => {
    try {
        const response = await api.get('/owner/arena-bookings/allArenas', {
            headers: {
                Authorization: `Bearer ${token}`,
                },
         });
          return response.data;
          } catch (error) {
             console.error('Error fetching arenas:', error);
             throw error;
        }
};

export const getSelectedArenaBookings = async (token, arenaId) => {
    try {
        const response = await api.get(`/owner/arena-bookings/${arenaId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
         });
         return response.data;
         } catch (error) {
            console.error('Error fetching selected arena bookings:', error);
            throw error;
        }
};     

export const getCourtsByArenaId = async (token, arenaId) => {
    try {
        const response = await api.get(`/owner/arena-bbokings/courts/${arenaId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
            } catch (error) {
                console.error('Error fetching courts by arena id:', error);
                throw error;
            }
};

export const getFilteredArenaBookings = async (token, filters) => {
    try {
        const { arenaId, bookingDate, courtName } = filters;
        const params = new URLSearchParams();

        if (arenaId) params.append("arenaId", arenaId);
        if (bookingDate) params.append("bookingDate", bookingDate);
        if (courtName) params.append("courtName", courtName);

        const response = await api.get(`/owner/arena-bookings/filter?${params.toString()}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching filtered bookings:", error);
        throw error;
    }
};

//FOR MY PROFIT
export const getTotalRevenueService = async (token) => {
  const res = await api.get('/owner/my-profit/total-revenue', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getCurrentMonthRevenueService = async (token) => {
  const res = await api.get('/owner/my-profit/current-month-revenue', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getYearlyChartDataService = async (token, year) => {
  const res = await api.get(`/owner/my-profit/yearly-chart?year=${year}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMonthlyChartDataService = async (token, year, month) => {
  const res = await api.get(`/owner/my-profit/monthly-chart?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllTransactionsService = async (token) => {
  const res = await api.get('/owner/my-profit/transactions', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getPaymentHistoryService = async (token) => {
  const res = await api.get('/owner/my-profit/payment-history', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};








