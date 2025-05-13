import httpClient from "../services/httpClient";

const photoApi = {
  getPhotosByAlbumId: async (albumId) => {
    const res = await httpClient.get(`/albums/${albumId}/photos`);
    return res.data;
  },
};

export default photoApi;
