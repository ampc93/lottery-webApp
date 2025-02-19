import * as lotteryApi from '../api/lotteriesApi.js';

// Obtener todas las loterías con paginación
export const getLotteries = async (page = 1, limit = 10) => {
    try {
        const response = await lotteryApi.fetchLotteries(page, limit);
        return response || []; // Devolver un array vacío si la API no responde con datos
    } catch (error) {
        console.error('Error al obtener loterías:', error);
        return [];
    }
};

// Crear una nueva lotería
export const addLottery = async (lottery) => {
    try {
        return await lotteryApi.createLottery(lottery);
    } catch (error) {
        console.error('Error al agregar lotería:', error);
        return null;
    }
};

// Obtener una lotería por ID
export const getLottery = async (id) => {
    try {
        return await lotteryApi.getLotteryById(id);
    } catch (error) {
        console.error(`Error al obtener lotería con ID ${id}:`, error);
        return null;
    }
};

// Actualizar una lotería
export const editLottery = async (id, lottery) => {
    try {
        return await lotteryApi.updateLottery(id, lottery);
    } catch (error) {
        console.error(`Error al actualizar lotería con ID ${id}:`, error);
        return null;
    }
};

// Eliminar una lotería
export const removeLottery = async (id) => {
    try {
        return await lotteryApi.deleteLottery(id);
    } catch (error) {
        console.error(`Error al eliminar lotería con ID ${id}:`, error);
        return null;
    }
};

// Buscar loterías por descripción con paginación
export const findLotteryByDescription = async (description, page = 1, limit = 10) => {
    try {
        const response = await lotteryApi.searchLotteryByDescription(description, page, limit);
        return response || [];
    } catch (error) {
        console.error(`Error al buscar lotería por descripción "${description}":`, error);
        return [];
    }
};


// import * as lotteryApi from '../api/lotteriesApi.js';

// // Obtener todas las loterías
// export const getLotteries = async () => {
//     return await lotteryApi.fetchLotteries();
// };

// // Crear una nueva lotería
// export const addLottery = async (lottery) => {
//     return await lotteryApi.createLottery(lottery);
// };

// // Obtener una lotería por ID
// export const getLottery = async (id) => {
//     return await lotteryApi.getLotteryById(id);
// };

// // Actualizar una lotería
// export const editLottery = async (id, lottery) => {
//     return await lotteryApi.updateLottery(id, lottery);
// };

// // Eliminar una lotería
// export const removeLottery = async (id) => {
//     return await lotteryApi.deleteLottery(id);
// };

// // Buscar loterías por descripción
// export const findLotteryByDescription = async (description) => {
//     return await lotteryApi.searchLotteryByDescription(description);
// };
