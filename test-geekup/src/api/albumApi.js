import httpClient from "../services/httpClient";

const getAlbums = async () => {
    const res = await httpClient.get("/albums");
    return res.data;
};

const getAlbum = async (id) => {
    const res = await httpClient.get(`/albums/${id}`);
    return res.data;
};

export default { getAlbums, getAlbum };
