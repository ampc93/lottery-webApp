import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export const loginUser = async (username, password) => {

    try {
       const response = await axios.post(`${API_URL}/login`, { username, password });
       return response.data; 
    } catch (error) {
       throw new Error(error.response?.data || error.message);
    }

};

export const logoutUser = async (token) =>{

      try {
         const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: { Authorization: `Bearer ${token}`}
         });
         return response.data;
      } catch (error) {
         throw new Error('No se pudo cerrar sesión');
      }
};

export const verifyToken = async (token) =>{
   
   try {
      const response = await axios.post(`${API_URL}/verify`, {}, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return response.data;
   } catch (error) {
     throw new Error('Token inválido o expirado'); 
   }

};