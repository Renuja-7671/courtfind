import api from "./api";

// Register a New User
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message || "An error occurred";
    console.error("Register Error:", errorMessage); // Debugging line
    throw errorMessage;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    console.log("Full API Response:", response); // Debugging line
    console.log("Response Data:", response.data); // Debugging line

    if (!response.data || !response.data.token) {
      throw new Error("Token not received from server!");
    }
    // Save the token to local storage
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message || "Login failed");
    throw error;
  }
};


// Logout User
export const logoutUser = () => {
  console.log("Logging out and removing token"); // Debugging line
  localStorage.removeItem("token"); // Remove token from storage
};

// Check if User is Authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log("Is user authenticated?", !!token); // Debugging line
  return !!token; // Returns true if token exists
};

// Forgot password
export const forgotPassword = async (email) => {
    try {
        const response = await api.post("/auth/forgot-password", { email });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong. Try again.";
    }
};

// Reset password page
export const resetPassword = async (password, token) => {
    try {
        const response = await api.post("/auth/reset-password", { password, token });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Password reset failed";
    }
};

// Owner change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
      const response = await api.put("/owner/change-password", { currentPassword, newPassword });
      return response.data;
  } catch (error) {
      throw error.response?.data?.message || "Failed to change password";
    }
};