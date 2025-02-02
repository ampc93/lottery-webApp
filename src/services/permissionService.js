import { assignOptionToRole, deleteOptionFromRole} from '../api/permissionApi'; 

export const assignOption = async (data) => {
    return await assignOptionToRole(data);
};

export const removeOptionFromRole = async (data) =>{
    return await deleteOptionFromRole(data);
};