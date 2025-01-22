import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/roles`;

export const fetchRoles = async() =>{
    const response = await axios.get(API_URL);
    return response.data;
}

export const createRole = async(role) =>{
    const response = await axios.post(API_URL, role);
    return response.data;
};

export const updateRole = async(id, role) =>{
    const response = await axios.put(`${API_URL}/${id}`, role);
    return response.data;
}

export const deleteRole = async(id) =>{
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}