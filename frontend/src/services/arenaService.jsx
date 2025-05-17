import api from './api';

export const getAllArenas = async () => {
    const response = await api.get("/arena/");
    return response.data;
};

export const searchArenas = async (filters) => {
    console.log("Filters in service:", filters); // Debugging line
    const response = await api.get("/arena/search", { params: filters });
    return response.data;
};

export const addArena = async (arenaData, token) => {
    const response = await api.post("/arena/", arenaData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const uploadArenaImage = async (file, token) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post("/arena/upload", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getAllSports = async (token) => {
    try{
      const response = await api.get("/arena/sports", {
          headers: { Authorization: `Bearer ${token}` },
      });
      console.log("The response is: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching sports:", error);
      throw error;
    }
  };

