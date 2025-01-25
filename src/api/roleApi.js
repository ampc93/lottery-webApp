import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/roles`;

// Obtener todos los roles
export const fetchRoles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Asumiendo que la respuesta tiene 'data' con los roles
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener roles');
    }
};

// Crear un nuevo rol
export const createRole = async (role) => {
    try {
        const response = await axios.post(API_URL, role);
        return response.data; // Asumiendo que la respuesta tiene 'data' con el rol creado
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear el rol');
    }
};

// Actualizar un rol existente
export const updateRole = async (id, role) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, role);
        return response.data; // Asumiendo que la respuesta tiene 'data' con el rol actualizado
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al actualizar rol');
    }
};

// Eliminar un rol
export const deleteRole = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // Asumiendo que la respuesta tiene 'data' con el estado de la eliminación
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al eliminar rol');
    }
};

// Buscar roles por descripción
export const searchRoleByDescription = async (description) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { description },
        });
        return response.data; // Asumiendo que la respuesta tiene 'data' con los roles encontrados
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al buscar rol por descripción');
    }
};