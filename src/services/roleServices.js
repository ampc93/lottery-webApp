import { fetchRoles, createRole, updateRole, deleteRole, searchRoleByDescription} from '../api/roleApi.js';

export const getRole = async () => {
    return await fetchRoles();
};

export const addRole = async (role) =>{
    return await createRole(role);
};

export const editRole = async (id, role) =>{
    return await updateRole(id, role);
};

export const removeRole = async(id) =>{
    return await deleteRole(id);
};

export const findRoleByDescription = async (description) => {
    return await searchRoleByDescription(description);
};