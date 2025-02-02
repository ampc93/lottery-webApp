import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/permissions`;

export const createPermission = async (permissionData) =>{

    try {
        const response = await axios.post(`${API_URL}/`, permissionData);
        return response.data;
    } catch (error) {
       throw new Error(error.response?.data?.message || 'Error al crear el permiso'); 
    }
    
}

export const getPermissions = async () =>{

    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
     throw new Error(error.response?.data?.message || 'Error al obtener los permisos');  
    }

};

export const getPermissionById = async (id) =>{

    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener el permiso');
    }

};

export const updatePermission = async (id, updatedData) =>{

    try {
       const response = await axios.put(`${API_URL}/${id}`, updatedData);
       return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al actualizar el permiso');
    }

};

export const deletePermission = async (id) =>{

    try {
      const response = await axios.delete(`${API_URL}/${id}`) ;
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar el permiso');  
    }

};