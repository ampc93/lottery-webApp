import axios from 'axios';

const API_URL =    `${import.meta.env.VITE_API_BASE_URL}/users`;

export const createUser = async (data) =>{

    try {
        const response = await axios.post(`${API_URL}/`, data);
        return response.data;
    } catch (error) {
       throw new Error( error.response?.data?.message || 'Error al crear al usuario'); 
    }

};

export const getAllUsers = async () =>{

    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
      throw new Error( error.response?.data?.message || 'Error al obtener los usuarios');  
    }

};

export const getUserById = async (id) => {

    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error el obtener al usuario');
    }
};

export const updateUser = async (id, data) =>{

    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
       throw new Error(error.response?.data?.message || 'Error al actualizar el usuario'); 
    }

};

export const deleteUser = async (id) =>{

    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.response || 'Error al eliminar el usuario');  
    }

};

export const getUserByName = async (name) =>{

    try {
        const response = await axios.get(`${API_URL}/search?name=${encodeURIComponent(name)}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener los datos');
    }

};

