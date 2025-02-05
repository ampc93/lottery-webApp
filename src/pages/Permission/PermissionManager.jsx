import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  Checkbox,
  Stack,
  PrimaryButton,
  Spinner,
  Label,
  Text
} from '@fluentui/react';
import { getRole as fetchRoles } from '../../services/roleServices.js';
import { getOptions } from '../../services/optionService.js';
import {
  fetchPermissions,
  addPermission,
  editPermission,
  removePermission
} from '../../services/permissionService.js';

const PermissionManager = () => {
  const [roles, setRoles] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [rolesData, optionsData] = await Promise.all([fetchRoles(), getOptions()]);
        setRoles(rolesData);
        setOptions(optionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadPermissions = async () => {
      if (selectedRoleId) {
        setLoading(true);
        try {
          const permissionsData = await fetchPermissions(selectedRoleId);
          setPermissions(permissionsData.filter(p => p.roleId === selectedRoleId));
        } catch (error) {
          console.error('Error loading permissions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setPermissions([]);
      }
    };
    loadPermissions();
  }, [selectedRoleId]);

  const handlePermissionChange = async (option, subOption, action, checked) => {
    if (!selectedRoleId) {
      alert('Por favor seleccione un rol primero');
      return;
    }

    const targetId = subOption ? subOption._id : option._id;
    const existingPermission = permissions.find(p =>
      p.roleId === selectedRoleId &&
      (subOption ? p.subOptionId === targetId : p.optionId === targetId)
    );

    let newActions = existingPermission ? [...existingPermission.actions] : [];
    if (checked) {
      if (!newActions.includes(action)) newActions.push(action);
    } else {
      newActions = newActions.filter(a => a !== action);
    }

    try {
      if (existingPermission) {
        if (newActions.length > 0) {
          await editPermission(existingPermission._id, { actions: newActions });
        } else {
          await removePermission(existingPermission._id);
        }
      } else if (newActions.length > 0) {
        await addPermission({
          roleId: selectedRoleId,
          [subOption ? 'subOptionId' : 'optionId']: targetId,
          actions: newActions
        });
      }
      setPermissions(await fetchPermissions(selectedRoleId));
    } catch (error) {
      console.error('Error updating permission:', error);
      alert('Error al actualizar el permiso');
    }
  };

  const renderOptions = () => {
    return options.map(option => {
      const optionPermissions = permissions.filter(p => p.optionId === option._id && !p.subOptionId);

      return (
        <Stack key={`option-${option._id}`} styles={{
          root: { backgroundColor: '#ffffff', borderRadius: 10, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: 20, padding: '15px' }
        }}>
          <Stack>
            <Label styles={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}>{option.description || option.name}</Label>
            <Stack horizontal tokens={{ childrenGap: 15 }}>
              {['read', 'write', 'delete', 'update'].map(action => {
                const hasPermission = optionPermissions.some(p => p.actions.includes(action));
                return (
                  <Checkbox
                    key={`${option._id}-${action}`}
                    label={action}
                    checked={hasPermission}
                    onChange={(_, checked) => handlePermissionChange(option, null, action, checked)}
                    styles={{
                      root: { color: '#0078D4', fontWeight: 'bold' },
                      label: { color: '#0078D4' },
                      checkbox: { borderColor: '#0078D4', '&:hover': { backgroundColor: '#0078D4', color: '#fff' } }
                    }}
                  />
                );
              })}
            </Stack>
          </Stack>

          {option.subOptions?.map(subOption => {
            const subOptionPermissions = permissions.filter(p => p.subOptionId === subOption._id);
            return (
              <Stack key={`suboption-${subOption._id}`} styles={{
                root: { marginTop: 20, padding: '10px', backgroundColor: '#F3F2F1', borderRadius: 10 }
              }}>
                <Stack tokens={{ marginLeft: 15 }}>
                  <Label styles={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>{subOption.description || subOption.name}</Label>
                  <Stack horizontal tokens={{ childrenGap: 15 }}>
                    {['read', 'write', 'delete', 'update'].map(action => {
                      const hasPermission = subOptionPermissions.some(p => p.actions.includes(action));
                      return (
                        <Checkbox
                          key={`${subOption._id}-${action}`}
                          label={action}
                          checked={hasPermission}
                          onChange={(_, checked) => handlePermissionChange(option, subOption, action, checked)}
                          styles={{
                            root: { color: '#0078D4', fontWeight: 'bold' },
                            label: { color: '#0078D4' },
                            checkbox: { borderColor: '#0078D4', '&:hover': { backgroundColor: '#0078D4', color: '#fff' } }
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      );
    });
  };

  return (
    <Stack tokens={{ padding: 20, maxWidth: 800 }} styles={{
      background: '#f4f4f4', 
      borderRadius: 15, 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '95%'
    }}>
      <Text variant="xLarge" block styles={{
        fontWeight: 'bold', 
        color: '#333', 
        textAlign: 'center',
        marginBottom: 30
      }}>
        Gestión de Permisos
      </Text>

      <Dropdown
        placeholder="Seleccionar rol"
        options={roles.map(role => ({ key: role._id, text: role.description }))}
        onChange={(_, item) => setSelectedRoleId(item?.key || null)}
        selectedKey={selectedRoleId}
        styles={{
          dropdown: {
            width: 300, 
            backgroundColor: '#ffffff', 
            color: '#0078D4', 
            borderColor: '#0078D4',
            borderRadius: 5
          }
        }}
      />

      {loading ? (
        <Spinner label="Cargando permisos..." />
      ) : selectedRoleId ? (
        <Stack tokens={{ marginTop: 20 }}>
          <Text variant="large" styles={{
            fontWeight: 'semibold', 
            marginBottom: 10, 
            color: '#333'
          }}>
            Permisos para el rol: {roles.find(r => r._id === selectedRoleId)?.description}
          </Text>
          {renderOptions()}
        </Stack>
      ) : (
        <Text variant="medium" styles={{
          marginTop: 20, 
          color: '#f0f0f0', 
          textAlign: 'center'
        }}>
          Seleccione un rol para gestionar permisos.
        </Text>
      )}
    </Stack>
  );
};

export default PermissionManager;

