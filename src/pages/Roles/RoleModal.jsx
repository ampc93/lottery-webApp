import React, { useState } from 'react';

const RoleModal = ({ role, onClose, loadRoles, addRole, editRole}) => {

    const [description, setDescription] = useState(role ? role.description || '' : '');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validaciones de entrada
        if (!description.trim()) {
            setError('La descripción es obligatoria.');
            return;
        }
    
        if (description.length < 3) {
            setError('La descripción debe tener al menos 3 caracteres.');
            return;
        }
    
        // Construye el objeto role
        const updatedRole = role?._id
            ? { ...role, description } // Si el rol ya existe (edición)
            : { description };        // Si es un nuevo rol (creación)
        
        try {
            // Llamada al servicio de creación o edición
            let response;
            if (updatedRole._id) {
                response = await editRole(updatedRole._id, updatedRole);
            } else {
                response = await addRole(updatedRole);
            }
            
            // Manejo de respuesta exitosa
            if (response.success) {
                setError(''); // Limpia los errores
                onClose();    // Cierra el modal
                loadRoles();  // Recarga la lista de roles
            } else {
                // Manejo de error en la respuesta
                setError(response.message || 'Ocurrió un error inesperado.');
            }

        } catch (error) {
            // Manejo de error en la llamada a la API
            setError(error.message || 'Error al guardar el rol. Inténtalo nuevamente.');
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="bg-white rounded p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-6 text-center">
                    {role ? 'Editar Rol' : 'Agregar Rol'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo de selección */}
                    <div>
                        <label className="block text-sm font-bold mb-2">
                            Tipo de Acceso
                        </label>
                        <input 
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Ingrese la descripcion'
                            className={`border rounded w-full px-3 py-2 ${error ? 'border-red-500': ''}`}/>
                        {
                            error && (<p className='text-red-500 text-sm mt-1'>{error}</p>)
                        }
                    </div>

                    {/* Botones */}
                    <div className="flex flex-wrap justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black py-2 px-4 rounded w-full sm:w-auto"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleModal;