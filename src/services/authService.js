import * as authApi from '../api/authApi.js';

export const loginUser = async (username, password) => {
    return await authApi.loginUser(username, password);
};

export const logoutUser = async (userId) => {
    return await authApi.logoutUser(userId);
};

export const verifyToken = async () => {
    return await authApi.verifyToken();
};
