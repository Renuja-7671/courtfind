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
    console.log("Token received:", response.data.token); // Debugging line
    localStorage.setItem("token", response.data.token); // Store JWT token
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message || "Login failed";
    console.error("Login Error:", errorMessage); // Debugging line
    throw errorMessage;
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
        const response = await api.post("/forgot-password", { email });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong. Try again.";
    }
};

// Reset password page
export const resetPassword = async (password, token) => {
    try {
        const response = await api.post("/reset-password", { password, token });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Password reset failed";
    }
};