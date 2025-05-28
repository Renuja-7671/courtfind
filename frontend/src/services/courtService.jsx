import api from './api';

export const uploadCourtImages = async (files, token) => {
    console.log("Files to upload:", files);
    const formData = new FormData();
    files.forEach(file => {
        if (file) formData.append("images", file);
        });
    
        const response = await api.post("/courts/upload-images", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
}});
    console.log("Response From Upload Court Images:", response);
    return response.data.imageUrls;
};

export const createCourt = async (courtData, token) => {
    console.log("Court Data:", courtData);
    const response = await api.post("/courts/create", courtData, {
        headers: { Authorization: `Bearer ${token}` },
})
return response.data;
};

export const getCourtsForBooking = async (courtId) => { 
    console.log("Fetching court for booking with ID:", courtId);
    const response = await api.get(`/common/courtsForBooking/${courtId}`);
    console.log("Response from getCourtsForBooking:", response.data);
    return response.data;
} 