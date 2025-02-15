import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Persona, PersonaSize } from '@fluentui/react';
import { useAuth } from '../context/authContext';

const generateColorFromRole = (roleName) => {
  if (!roleName) return '#ccc'; // Color por defecto si el nombre del rol no está definido
  let hash = 0;
  for (let i = 0; i < roleName.length; i++) {
    hash = roleName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`; 
};

const Navbar = ({ collapsed }) => {

  const { user, logout } = useAuth(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const base64Image = user?.photo?.data 
    ? btoa(String.fromCharCode(...new Uint8Array(user.photo.data))) 
    : '';
  const roleColor = generateColorFromRole(user?.role_id?.description);

  // Verifica si los datos de usuario están disponibles
  useEffect(() => {
    console.log('Datos del usuario:', user);
  }, [user]);

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    try {
      await logout(user?._id);
      setIsModalOpen(false);
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div
      style={{
        background: '#222',
        color: 'white',
        padding: collapsed ? '5px 16px' : '5px 16px',
        height: '55px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        transition: 'height 0.3s ease-in-out, padding 0.3s ease-in-out',
      }}
    >
      {/* Nombre de la empresa en la parte izquierda */}
      <span className="text-xl font-bold">{user?.organization_id?.description}</span>

      <div 
        style={{ marginLeft: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
        onClick={handleOpenModal}
      >
        <Persona
          imageUrl={user?.photo ? `data:image/jpeg;base64,${base64Image}` : undefined}
          size={PersonaSize.size40} 
        />

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="absolute top-full mt-2 right-0 w-72 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-slide-down"
          >
            {/* Triángulo (flecha) arriba de la modal */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 transform origin-bottom-left shadow-lg z-10"></div>

            <div className="p-4">
              <div className="flex items-center mb-4">
                <Persona
                  imageUrl={user?.photo ? `data:image/jpeg;base64,${base64Image}` : undefined} 
                  size={PersonaSize.size56} 
                />
                <div className="ml-4 overflow-hidden">
                  <p className="font-semibold text-gray-800 truncate">{ `${user?.name ?? 'Nombre'} ${user?.lastname ?? 'Apellido'}`}</p>
                  <p className="text-sm text-gray-600 truncate">{user?.email ?? 'correo@example.com'}</p>
                  
                  {/* Sección de Rol o Tipo de Acceso */}
                  <div 
                    className="mt-2 inline-block text-white text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: roleColor }}
                  >
                    {user?.role_id?.description ?? 'Sin Rol'}
                  </div>

                </div>
              </div>

              <a
                as={Link}
                href="/perfil"
                className="w-full text-blue-500 hover:underline block text-center mb-2"
              >
                Editar Perfil
              </a>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
