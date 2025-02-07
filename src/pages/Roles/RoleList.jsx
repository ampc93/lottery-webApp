import React, { useState, useEffect } from 'react';
import { getRole, removeRole, addRole, editRole, findRoleByDescription } from '../../services/roleServices';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash, FiSearch, FiPlus } from 'react-icons/fi';
import RoleModal from './RoleModal';
import { Stack, TextField, PrimaryButton, DefaultButton, DetailsList, DetailsListLayoutMode, SelectionMode, IconButton } from '@fluentui/react';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadRoles();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                handleSearch();
            } else {
                loadRoles();
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const loadRoles = async () => {
        const data = await getRole();
        setRoles(Array.isArray(data) ? data : []);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar el rol?')) {
            await removeRole(id);
            loadRoles();
        }
    };

    const handleSearch = async () => {
        try {
            const data = await findRoleByDescription(search);
            setRoles(Array.isArray(data) ? data : []);
            setMessage('');
        } catch (error) {
            setMessage(error.message || 'Error al buscar roles');
            setRoles([]);
        }
    };

    const columns = [
        { key: 'description', name: 'Tipo de Acceso', fieldName: 'description', minWidth: 200, maxWidth: 400, isResizable: true },
        {
            key: 'actions',
            name: 'Acción',
            minWidth: 150,
            onRender: (role) => (
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <IconButton iconProps={{ iconName: 'Edit' }} title="Editar" onClick={() => { setCurrentRole(role); setIsModalOpen(true); }} />
                    <IconButton iconProps={{ iconName: 'Delete' }} title="Eliminar" onClick={() => handleDelete(role._id)} />
                </Stack>
            )
        }
    ];

    return (
        <Stack tokens={{ childrenGap: 15 }} className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Gestión de Roles</h1>

            <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
                <TextField
                    placeholder="Buscar roles..."
                    value={search}
                    onChange={(e, newValue) => setSearch(newValue || '')}
                    iconProps={{ iconName: 'Search' }}
                    styles={{ root: { maxWidth: 300 } }}
                />
                <PrimaryButton iconProps={{ iconName: 'Add' }} text="Agregar Rol" onClick={() => { setCurrentRole(null); setIsModalOpen(true); }} />
            </Stack>

            <DetailsList
                items={roles}
                columns={columns}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.fixedColumns}
                compact={true}
                styles={{ root: { backgroundColor: 'white', padding: '10px', borderRadius: '5px' } }}
            />

            {roles.length === 0 && <p className="text-center text-gray-500">No se encontraron roles</p>}

            {isModalOpen && (
                <RoleModal 
                    role={currentRole}
                    onClose={() => setIsModalOpen(false)}
                    loadRoles={loadRoles}
                    addRole={addRole}
                    editRole={editRole}
                />
            )}
        </Stack>
    );
};

export default RoleList;

