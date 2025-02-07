import { useState, useEffect } from 'react';
import { getUsers, deleteUser, findUserByName } from '../../services/userProfileService.js';
import { getRole } from '../../services/roleServices';
import UserForm from './UserForm';
import { Stack, Text, PrimaryButton, IconButton, Persona, Panel, PanelType, TextField } from '@fluentui/react';

// Función para generar un color único basado en el nombre del rol
const generateColorFromRole = (roleName) => {
  let hash = 0;
  for (let i = 0; i < roleName.length; i++) {
    hash = roleName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`; // Usa el valor hash para generar un color HSL
  return color;
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    const fetchRoles = async () => {
      const rolesData = await getRole();
      setRoles(rolesData);
    };

    fetchUsers();
    fetchRoles();
  }, []);

  useEffect( () => {

    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim() !== ''){
        const result = await findUserByName(searchTerm);
        setFilteredUsers(result);
      }else {
        setFilteredUsers(users);
      }
    },500);

    return () => clearTimeout(delayDebounceFn);

    

  }, [searchTerm, users]);

  console.log(filteredUsers);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowPanel(true);
  };

  const handleResetPassword = (id) => {
    alert('Contraseña reseteada');
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowPanel(true);
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
      {/* Header */}
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
            onChange={(e, newValue) => setSearchTerm(newValue || ' ')}
            styles={{ root: { maxWidth: 300 } }}
          />
          <PrimaryButton
            text="Crear Usuario"
            iconProps={{ iconName: 'AddFriend' }}
            onClick={handleCreateUser}
          />
      </Stack>


      {/* Lista de Usuarios */}
      <Stack tokens={{ childrenGap: 15 }}>
        {filteredUsers.map((user) => {
          const roleName = user?.role_id?.description || 'Sin rol asignado';
          const roleColor = generateColorFromRole(roleName);

          return (
            <Stack
              key={user._id}
              horizontal
              verticalAlign="center"
              tokens={{ childrenGap: 15 }}
              styles={{
                root: {
                  padding: 15,
                  borderRadius: 8,
                  background: '#f3f2f1',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                },
              }}
            >
              {/* Foto de Perfil */}
              <Persona
                imageUrl={user.photo?.data?.length > 0 ? `data:image/png;base64,${Buffer.from(user.photo.data).toString('base64')}` : undefined}
                initialsColor="blue"
                text={`${user.name} ${user.lastname} `}
                secondaryText={user.email}
                size={40}
              />

              {/* Rol con color dinámico */}
              <Stack
                horizontalAlign="center"
                verticalAlign="center"
                styles={{
                  root: {
                    padding: '5px 10px',
                    borderRadius: 10,
                    background: roleColor,
                    fontWeight: 'bold',
                    color: 'white',
                    textTransform: 'capitalize',
                  },
                }}
              >
                {roleName}
              </Stack>

              {/* Botones de Acción */}
              <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginLeft: 'auto' } }}>
                <IconButton iconProps={{ iconName: 'Edit' }} title="Editar" onClick={() => handleEdit(user)} />
                <IconButton iconProps={{ iconName: 'Refresh' }} title="Resetear contraseña" onClick={() => handleResetPassword(user._id)} />
                <IconButton iconProps={{ iconName: 'Delete' }} title="Eliminar" onClick={() => handleDelete(user._id)} />
              </Stack>
            </Stack>
          );
        })}
      </Stack>

      {/* Panel lateral para Crear/Editar usuario */}
      <Panel
        isOpen={showPanel}
        onDismiss={() => setShowPanel(false)}
        type={PanelType.medium} // Panel más grande
        headerText={selectedUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      >
        <UserForm user={selectedUser} closeModal={() => setShowPanel(false)} roles={roles} />
      </Panel>
    </Stack>
  );
};

export default UserList;

