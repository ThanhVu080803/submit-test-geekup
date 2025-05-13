import httpClient from "../services/httpClient";

const getUsers = async () => {
    const res = await httpClient.get("/users");
    return res.data;
};

const getUser = async (id) => {
    const res = await httpClient.get(`/users/${id}`);
    return res.data;
};

export default { getUsers, getUser };
