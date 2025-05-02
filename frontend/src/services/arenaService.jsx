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

