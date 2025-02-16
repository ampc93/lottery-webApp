import * as userApi from '../api/userProfileApi.js';

export const getUsers = async (page = 1, limit = 10) => {
    try {
        const response = await userApi.getAllUsers(page, limit);
        return response || []; // Devolver un array vacío si la API no responde con datos
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};

export const getUserById = async (id) => {
    try {
        return await userApi.getUserById(id);
    } catch (error) {
        console.error(`Error al obtener usuario con ID ${id}:`, error);
        return null;
    }
};

export const addUser = async (user) => {
    try {
        return await userApi.createUser(user);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        return null;
    }
};

export const updateUser = async (id, user) => {
    try {
        console.log(user);
        return await userApi.updateUser(id, user);
    } catch (error) {
        console.error(`Error al actualizar usuario con ID ${id}:`, error);
        return null;
    }
};

export const deleteUser = async (id) => {
    try {
        return await userApi.deleteUser(id);
    } catch (error) {
        console.error(`Error al eliminar usuario con ID ${id}:`, error);
        return null;
    }
};

export const findUserByName = async (name, page = 1, limit = 10) => {
    try {
        const response = await userApi.getUserByName(name, page, limit);
        return response || [];
    } catch (error) {
        console.error(`Error al buscar usuario por nombre "${name}":`, error);
        return [];
    }
};
