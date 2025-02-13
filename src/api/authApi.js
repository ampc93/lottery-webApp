import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

if (!API_URL) {
   throw new Error('La URL base de la API no está definida. Verifica tu archivo .env');
}

axios.defaults.withCredentials = true;

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, 
            { username, password },
            { withCredentials: true }
        );
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const logoutUser = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, 
            {userId}, 
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw new Error('No se pudo cerrar sesión');
    }
};

export const verifyToken = async () => {
    try {
        const response = await axios.get(`${API_URL}/verify`, 
            {}, 
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error al refrescar el token');
    }
};
