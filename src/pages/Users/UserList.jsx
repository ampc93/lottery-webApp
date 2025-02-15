import { useState, useEffect } from 'react';
import { getUsers, deleteUser, findUserByName } from '../../services/userProfileService.js';
import { getRole } from '../../services/roleServices';
import UserForm from './UserForm';
import { Stack, Text, PrimaryButton, IconButton, Persona, Panel, PanelType, TextField, DefaultButton } from '@fluentui/react';

// Función para generar un color basado en el nombre del rol
const generateColorFromRole = (roleName) => {
  let hash = 0;
  for (let i = 0; i < roleName.length; i++) {
    hash = roleName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`; 
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([]);
  
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5); // Ajustable según la resolución

    const cleanBase64Data = (base64String) => {
          if (!base64String) return ""; // Manejar null o undefined

          // 1. Reemplazar saltos de línea y retornos de carro
          let cleanedString = base64String.replace(/\r\n/g, '');

          // 2. Reemplazar espacios en blanco al principio y al final
          cleanedString = cleanedString.trim();

          // 3. Reemplazar caracteres no Base64 con una expresión regular más amplia
          cleanedString = cleanedString.replace(/[^A-Za-z0-9+/=]/g, ''); // Elimina todo lo que no sea Base64

          return cleanedString;
      };
  
  // Función para cargar los usuarios
  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      
      if (usersData && usersData.success && Array.isArray(usersData.users)) {
        setUsers(usersData.users);
        setFilteredUsers(usersData.users);
        
        // Actualizar la paginación con los datos reales de la API
        setTotalPages(Math.ceil(usersData.users.length / usersPerPage)); // Asegurarse de que totalPages esté calculado correctamente
      } else {
        setUsers([]);
        setFilteredUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setUsers([]);
      setFilteredUsers([]);
      setTotalPages(1);
    }
  };

  // Función para cargar roles
  const fetchRoles = async () => {
    try {
      const rolesData = await getRole();
      setRoles(Array.isArray(rolesData) ? rolesData : []);
    } catch (error) {
      console.error('Error al obtener roles:', error);
      setRoles([]);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Ajustar la cantidad de usuarios por página según el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      if (windowHeight > 800) {
        setUsersPerPage(10); // Más registros si la ventana es grande
      } else {
        setUsersPerPage(5); // Menos registros si la ventana es pequeña
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim() !== '') {
        try {
          const result = await findUserByName(searchTerm);
          setFilteredUsers(Array.isArray(result.users) ? result.users : []); // Asegúrate de acceder a `result.users`
        } catch (error) {
          console.error('Error al buscar usuario:', error);
          setFilteredUsers([]); // En caso de error, muestra una lista vacía
        }
      } else {
        setFilteredUsers(users); // Cuando no hay término de búsqueda, se muestran todos los usuarios
      }
      setCurrentPage(1); // Restablecer la página a la primera
    }, 500);
  
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, users]); // Dependencia solo en `searchTerm` y `users`
  
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowPanel(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowPanel(true);
  };

  useEffect(() => {
    if (!showPanel) {
      fetchUsers();
    }
  }, [showPanel]);

  // Cálculo de paginación
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xLarge" styles={{ root: { fontWeight: 'bold' } }}>
          Gestión de Usuarios (Solo Administradores)
        </Text>
      </Stack>

      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <TextField
          placeholder='Buscar usuario...'
          value={searchTerm}
          iconProps={{ iconName: 'Search' }}
          onChange={(e, newValue) => setSearchTerm(newValue || '')}
          styles={{ root: { maxWidth: 300 } }}
        />
        <PrimaryButton
          text="Crear Usuario"
          iconProps={{ iconName: 'AddFriend' }}
          onClick={handleCreateUser}
        />
      </Stack>

      <Stack tokens={{ childrenGap: 15 }}>
        {displayedUsers.map((user) => {
          const roleName = user?.role_id?.description || 'Sin rol asignado';
          const roleColor = generateColorFromRole(roleName);

          return (
            <Stack
              key={user._id}
              horizontal
              verticalAlign="center"
              tokens={{ childrenGap: 10 }}
              styles={{
                root: {
                  padding: 10,
                  borderRadius: 8,
                  background: '#f3f2f1',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                  alignItems: 'center',
                  justifyContent: 'space-between', // Asegura que los botones siempre estén alineados
                  width: '100%',
                },
              }}
            >
              {/* Contenedor de nombre y rol */}
              <Stack horizontal verticalAlign="center" styles={{ root: { flexGrow: 1, overflow: 'hidden' } }}>
                {/* Nombre del usuario */}
                <Persona
                  imageUrl={user.photo ? `data:image/jpeg;base64,${user.photo}` : undefined} 
                  initialsColor="blue"
                  text={`${user.name} ${user.lastname}`}
                  secondaryText={user.email}
                  size={40}
                  styles={{
                    root: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 1 },
                  }}
                />
                {/* Rol del usuario */}
                <Stack
                  styles={{
                    root: {
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: roleColor,
                      fontWeight: 'bold',
                      fontSize: '12px',
                      color: 'white',
                      textTransform: 'capitalize',
                      textAlign: 'center',
                      minWidth: '80px',
                      flexShrink: 0,
                      marginLeft: '10px', // Pequeño espacio entre nombre y rol
                    },
                  }}
                >
                  {roleName}
                </Stack>
              </Stack>

              {/* Botones de acción */}
              <Stack
                horizontal
                tokens={{ childrenGap: 10 }}
                styles={{
                  root: {
                    marginLeft: 'auto', // Empuja los botones hacia la derecha sin importar el tamaño del nombre
                  },
                }}
              >
                <IconButton
                  iconProps={{ iconName: 'Edit' }}
                  title="Editar"
                  onClick={() => handleEdit(user)}
                  styles={{
                    root: {
                      backgroundColor: '#0078d4',
                      color: 'white',
                      borderRadius: 4,
                      border: 'none',
                      // padding: '2px',
                      ':hover': { backgroundColor: '#005a9e' },
                    },
                  }}
                />
                <IconButton
                  iconProps={{ iconName: 'Delete' }}
                  title="Eliminar"
                  onClick={() => handleDelete(user._id)}
                  styles={{
                    root: {
                      backgroundColor: '#d83b01',
                      color: 'white',
                      borderRadius: 4,
                      border: 'none',
                      // padding: '2px',
                      ':hover': { backgroundColor: '#a22e01' },
                    },
                  }}
                />
              </Stack>
            </Stack>

          );
        })}

      </Stack>

      {/* Paginación Manual */}
      <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 20 } }}>
        <DefaultButton
          text="Anterior"
          iconProps={{ iconName: 'ChevronLeft' }}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
        <Text variant="mediumPlus">{`Página ${currentPage} de ${totalPages}`}</Text>
        <DefaultButton
          text="Siguiente"
          iconProps={{ iconName: 'ChevronRight' }}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        />
      </Stack>

      <Panel isOpen={showPanel} onDismiss={() => setShowPanel(false)} type={PanelType.medium} headerText={selectedUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}>
        <UserForm currentUser={selectedUser} closeModal={() => setShowPanel(false)} roles={roles} fetchUsers={fetchUsers} />
      </Panel>
    </Stack>
  );
};

export default UserList;
