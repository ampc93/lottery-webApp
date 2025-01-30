import { createOption, getAllOptions, getOptionByDescription, updateOption, createSubOption, deleteSubOption, deleteOption} from '../api/optionApi.js';

export const getOptions = async () => {
    return await getAllOptions();
};

export const addOption = async (option) =>{
    return await createOption(option);
};

export const editOption = async (id, option) =>{
    return await updateOption(id, option);
};

export const addSubOption = async (id, subOption) =>{
    return await createSubOption(id, subOption);
}

export const removeSubOption = async (id, subOptionId) =>{
    return await deleteSubOption(id, subOptionId);
}

export const removeOption = async(id) =>{
    return await deleteOption(id);
};

export const findOptionByDescription = async (description) => {
    return await getOptionByDescription(description);
};