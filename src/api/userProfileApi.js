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

export const getAllUsers = async (page = 1, limit = 10) => {
    try {
        // Convertir `page` y `limit` en números y validar
        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) {
            throw new Error("El parámetro 'page' debe ser un número mayor o igual a 1.");
        }
        if (isNaN(limit) || limit < 1) {
            throw new Error("El parámetro 'limit' debe ser un número mayor o igual a 1.");
        }

        // Realizar la petición con paginación
        const response = await axios.get(`${API_URL}/`, {
            params: { page, limit },
            timeout: 5000 // Timeout de 5 segundos
        });

        // Extraer la respuesta del servidor
        const { data } = response;

        // Validar que la estructura de `data` sea la esperada
        if (!data || !data.success || !Array.isArray(data.data)) {
            throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Retornar la respuesta completa con paginación
        return {
            success: data.success,
            users: data.data,
            pagination: data.pagination || {}
        };

    } catch (error) {
        console.error("Error en getAllUsers:", error);

        if (error.response) {
            throw new Error(error.response.data?.message || "Error en la respuesta del servidor");
        } else if (error.request) {
            throw new Error("No se recibió respuesta del servidor");
        } else {
            throw new Error("Error al procesar la solicitud");
        }
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

export const getUserByName = async (name, page = 1, limit = 10) => {
    try {
        // Validación de `name`
        if (!name || typeof name !== "string" || !name.trim()) {
            throw new Error("El nombre es requerido y debe ser una cadena válida.");
        }

        // Validación de `page` y `limit`
        page = Number(page);
        limit = Number(limit);
        if (isNaN(page) || page < 1) {
            throw new Error("El parámetro 'page' debe ser un número mayor o igual a 1.");
        }
        if (isNaN(limit) || limit < 1) {
            throw new Error("El parámetro 'limit' debe ser un número mayor o igual a 1.");
        }

        // Realiza la petición con los parámetros adecuados
        const response = await axios.get(`${API_URL}/search`, {
            params: {
                name: encodeURIComponent(name.trim()),
                page,
                limit
            },
            timeout: 5000 // Timeout de 5 segundos para evitar bloqueos
        });


        const { data } = response;

        // Validar que la estructura de `data` sea la esperada
        if (!data || !data.success || !Array.isArray(data.data)) {
            throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        // Retornar la respuesta completa con paginación
        return {
            success: data.success,
            users: data.data,
            pagination: data.pagination || {}
        };

        // return response.data;
    } catch (error) {
        console.error("Error en getUserByName:", error);

        if (error.response) {
            throw new Error(error.response.data?.message || "Error en la respuesta del servidor");
        } else if (error.request) {
            throw new Error("No se recibió respuesta del servidor");
        } else {
            throw new Error("Error al procesar la solicitud");
        }
    }
};

