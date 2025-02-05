import { createPermission,
         getPermissions,
         getPermissionById,
         updatePermission,
         deletePermission,} from '../api/permissionApi.js'; 


export const fetchPermissions = async () =>{
    return await getPermissions();
};

export const addPermission = async (permission) => {
    return await createPermission(permission);
};

export const fetchPermissionById = async (id) =>{
    return await getPermissionById(id);
};

export const editPermission = async (id, permission) =>{
    return await updatePermission(id, permission);
};

export const removePermission = async (id) =>{
    return deletePermission(id);
};