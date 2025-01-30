import React, { useState, useEffect } from 'react';
import { getRole, removeRole, addRole, editRole, findRoleByDescription } from '../../services/roleServices';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash, FiSearch, FiPlus } from 'react-icons/fi'
import RoleModal from './RoleModal';

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

    useEffect( () => {
        const delayDebounceFn = setTimeout( () => {
            if(search){
                handleSearch();
            }else{
                loadRoles();
            }
        },300);

        return () => clearTimeout(delayDebounceFn);

    }, [search]);

    const loadRoles = async () => {
        const data = await getRole();
        if (Array.isArray(data)) {
            setRoles(data);
        } else {
            console.error("Error: 'getRole' no devuelve un array");
            setRoles([]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Esta seguro que quieres eliminar el registro?')) {
            await removeRole(id);
            loadRoles();
        }
    };

    const handleSearch = async () =>{

        try {

            const data = await findRoleByDescription(search);
            setRoles(Array.isArray(data) ? data : []);
            setMessage('');
            
        } catch (error) {
            setMessage(error.message || 'Error al buscar roles');
            setRoles([]);
        }
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Gestión de Roles</h1>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
                <div className="flex items-stretch w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar roles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-l px-3 py-2 w-full sm:w-80 text-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        onClick={() => handleSearch()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r text-sm hover:bg-blue-600 focus:outline-none"
                    >
                        <FiSearch />
                    </button>
                </div>
                <button
                    onClick={() => {
                        setCurrentRole(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-green-700 focus:outline-none"
                >
                    <FiPlus /> Agregar Rol
                </button>
            </div>
                
            <div className='overflow-x-auto'>
                <table className="w-full border border-gray-300 rounded-md shadow-sm text-sm">
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className="text-left p-1 border-b border-gray-300">Tipo de Acceso</th>
                            <th className="text-right p-1 border-b border-gray-300">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.length > 0 ? (
                        roles.map((role) => (

                            <tr key={role._id} 
                                className={`hover:bg-gray-200 ${
                                    selectedRole && selectedRole._id === role._id
                                        ? 'bg-blue-100'
                                        : ''
                                }`}
                                onClick={() => setSelectedRole(role)}
                            >
                                <td className="p-1 border-b border-gray-300 text-gray-700">{role.description}</td>
                                <td className="p-1 border-b border-gray-300">
                                    <div className="flex justify-end items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setCurrentRole(role);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1 hover:bg-blue-600 focus:outline-none"
                                        >
                                            <FiEdit /> Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(role._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 hover:bg-red-700 focus:outline-none"
                                        >
                                             <FiTrash /> Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        )) 
                    ): (

                        <tr>
                            <td colSpan="2" className="p-4 text-center text-gray-500">
                                No se encontraron roles
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <RoleModal 
                    role={currentRole}
                    onClose={() => setIsModalOpen(false)}
                    loadRoles={loadRoles}
                    addRole={addRole}
                    editRole={editRole}
                />
            )}      

        </div>
    );
};

export default RoleList;


