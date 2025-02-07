import * as userApi from '../api/userProfileApi.js';

export const getUsers = async () =>{
    return await userApi.getAllUsers();
};

export const getUserById = async (id) =>{
    return await userApi.getUserById(id);
};

export const addUser = async (user) =>{
    return await userApi.createUser(user);
};

export const updateUser = async (id, user) => {
    return await userApi.updateUser(id, user);
};

export const deleteUser = async (id) => {
    return await userApi.deleteUser(id);
};

export const findUserByName = async (name) =>{
    return await userApi.getUserByName(name);
};