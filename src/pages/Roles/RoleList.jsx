import React, { useState, useEffect } from 'react';
import { getRole, removeRole, addRole, editRole, findRoleByDescription } from '../../services/roleServices';
import { useNavigate } from 'react-router-dom';
import RoleModal from './RoleModal';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
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
        <div className="p-6 bg-neutral-light min-h-screen">
            <h1 className="text-3xl font-bold text-neutral-dark mb-6">Roles</h1>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-full md:w-1/3"
                />
                  <button
                    onClick={() => handleSearch()}
                    className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto"
                >
                    Buscar
                </button>
                <button
                    onClick={() => {
                        setCurrentRole(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Agregar Roles
                </button>
            </div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="border-b p-2">Tipo de Acceso</th>
                        <th className="border-b p-2">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length > 0 ? (
                      roles.map((role) => (

                        <tr key={role._id}>
                            <td className="border-b p-2">{role.description}</td>
                            <td className="border-b p-2">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setCurrentRole(role);
                                            setIsModalOpen(true);
                                        }}
                                        className="bg-yellow-500 text-white py-1 px-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(role._id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                    >
                                        Delete
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


