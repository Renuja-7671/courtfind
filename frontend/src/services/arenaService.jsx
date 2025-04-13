import api from './api';

export const getAllArenas = async () => {
    const response = await api.get("/arenas");
    return response.data;
};

export const searchArenas = async (filters) => {
    const response = await api.get("/arenas/search", { params: filters });
    return response.data;
};
