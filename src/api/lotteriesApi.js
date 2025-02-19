import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/lotteries`;

// Obtener todas las loterías con paginación
export const fetchLotteries = async (page = 1, limit = 10) => {
    try {
        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) {
            throw new Error("El parámetro 'page' debe ser un número mayor o igual a 1.");
        }
        if (isNaN(limit) || limit < 1) {
            throw new Error("El parámetro 'limit' debe ser un número mayor o igual a 1.");
        }

        const response = await axios.get(API_URL, {
            params: { page, limit },
            timeout: 5000
        });

        const { data } = response;
        if (!data || !data.success || !Array.isArray(data.data)) {
            throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        return {
            success: data.success,
            lotteries: data.data,
            pagination: data.pagination || {}
        };

    } catch (error) {
        console.error("Error en fetchLotteries:", error);
        if (error.response) {
            throw new Error(error.response.data?.message || "Error en la respuesta del servidor");
        } else if (error.request) {
            throw new Error("No se recibió respuesta del servidor");
        } else {
            throw new Error("Error al procesar la solicitud");
        }
    }
};

// Crear una nueva lotería
export const createLottery = async (lottery) => {
    try {
        const response = await axios.post(API_URL, lottery);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear la lotería');
    }
};

// Obtener una lotería por ID
export const getLotteryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener la lotería');
    }
};

// Actualizar una lotería
export const updateLottery = async (id, lottery) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, lottery);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al actualizar la lotería');
    }
};

// Eliminar una lotería
export const deleteLottery = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al eliminar la lotería');
    }
};

// Buscar loterías por descripción con paginación
export const searchLotteryByDescription = async (description, page = 1, limit = 10) => {
    try {
        if (!description || typeof description !== "string" || !description.trim()) {
            throw new Error("La descripción es requerida y debe ser una cadena válida.");
        }

        page = Number(page);
        limit = Number(limit);
        if (isNaN(page) || page < 1) {
            throw new Error("El parámetro 'page' debe ser un número mayor o igual a 1.");
        }
        if (isNaN(limit) || limit < 1) {
            throw new Error("El parámetro 'limit' debe ser un número mayor o igual a 1.");
        }

        const response = await axios.get(`${API_URL}/search`, {
            params: {
                description: encodeURIComponent(description.trim()),
                page,
                limit
            },
            timeout: 5000
        });

        const { data } = response;
        if (!data || !data.success || !Array.isArray(data.data)) {
            throw new Error("La respuesta del servidor no tiene el formato esperado.");
        }

        return {
            success: data.success,
            lotteries: data.data,
            pagination: data.pagination || {}
        };

    } catch (error) {
        console.error("Error en searchLotteryByDescription:", error);
        if (error.response) {
            throw new Error(error.response.data?.message || "Error en la respuesta del servidor");
        } else if (error.request) {
            throw new Error("No se recibió respuesta del servidor");
        } else {
            throw new Error("Error al procesar la solicitud");
        }
    }
};


// import axios from 'axios';

// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/lotteries`;

// // Obtener todas las loterías
// export const fetchLotteries = async () => {
//     try {
//         const response = await axios.get(API_URL);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || 'Error al obtener las loterías');
//     }
// };

// // Crear una nueva lotería
// export const createLottery = async (lottery) => {
//     try {
//         const response = await axios.post(API_URL, lottery);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || 'Error al crear la lotería');
//     }
// };

// // Obtener una lotería por ID
// export const getLotteryById = async (id) => {
//     try {
//         const response = await axios.get(`${API_URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || 'Error al obtener la lotería');
//     }
// };

// // Actualizar una lotería
// export const updateLottery = async (id, lottery) => {
//     try {
//         const response = await axios.put(`${API_URL}/${id}`, lottery);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || 'Error al actualizar la lotería');
//     }
// };

// // Eliminar una lotería
// export const deleteLottery = async (id) => {
//     try {
//         const response = await axios.delete(`${API_URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || 'Error al eliminar la lotería');
//     }
// };

// // Buscar loterías por descripción
// export const searchLotteryByDescription = async (description) => {
//     try {
//         const response = await axios.get(`${API_URL}/search`, {
//             params: { description },
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || 'Error al buscar lotería por descripción');
//     }
// };
