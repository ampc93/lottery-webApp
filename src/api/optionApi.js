import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/options`;

export const createOption = async (data) =>{

    try {
        const response = await axios.post(`${API_URL}/`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener las opciones");
    }

}

export const getAllOptions = async () =>{

    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
       throw new Error(error.response?.data?.message || error.message);
    }

}

export const getOptionByDescription = async (description) => {

    try {
       const response = await axios.get(`${API_URL}/search`, {
        params: { description },
       });
       return response.data;
    } catch (error) {
       throw new Error(error.response?.data?.message || error.message); 
    }

}

export const getOptionById = async (id) =>{
    try {
       const response = await axios.get(`${API_URL}/${id}`);
       return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

export const updateOption = async (id, data) =>{

    try {
       const response = await axios.put(`${API_URL}/${id}`, data);
       return response.data; 
    } catch (error) {
       throw new Error(error.response?.data?.message || "Error al actualizar la Opcion"); 
    }

}

export const createSubOption = async (id, subOption) =>{

    try {
      const response = await axios.post(`${API_URL}/${id}/suboptions`, subOption);
      return response.data;  
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);  
    }

}

export const deleteSubOption = async (id, subOptionId) => {

    try {
      const response = await axios.delete(`${API_URL}/${id}/suboptions/${subOptionId}`);
      return response.data;  
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);  
    }

} 

export const deleteOption = async (id) =>{

    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;  
    } catch (error) {
       throw new Error(error.reponse?.data?.message || error.message); 
    }

}

