import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { updateUser } from '../../services/userProfileService.js';
import { Persona, PersonaSize, TextField, PrimaryButton, Link } from '@fluentui/react';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfileEdit = () => {
  const { user, setUser } = useAuth();
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const base64Image = user?.photo?.data 
    ? btoa(String.fromCharCode(...new Uint8Array(user.photo.data))) 
    : '';

  useEffect(() => {
    if (user) {
      setPhone(user.phone || '');
      setAddress(user.address || '');
      if (user?.photo) {
        setPreviewImage(`data:image/jpeg;base64,${base64Image}`);
      }
    }
  }, [user, base64Image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setProfileImage(e.target.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10,15}$/;

    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = 'El teléfono debe contener entre 10 y 15 dígitos';
    }

    if (showPasswordSection) {
      if (!newPassword || !confirmPassword) {
        newErrors.password = 'Por favor, completa ambos campos de contraseña';
      } else if (newPassword !== confirmPassword) {
        newErrors.password = 'Las contraseñas no coinciden';
      } else if (newPassword.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const newErrors = {};

    if (showPasswordSection) {
      if (!newPassword || !confirmPassword) {
        newErrors.password = 'Por favor, completa ambos campos de contraseña';
      } else if (newPassword !== confirmPassword) {
        newErrors.password = 'Las contraseñas no coinciden';
      } else if (newPassword.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
    }

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0);

  }, [newPassword, confirmPassword, showPasswordSection]);

  const handleUpdateProfile = async () => {
    if (!validateFields()) return;

    setIsLoading(true);

    const data = {
      phone,
      address,
    };

    if (profileImage) {
      data.photo = profileImage;
    }

    if (showPasswordSection && newPassword) {
      data.password = newPassword;
    }

    try {
      const response = await updateUser(user?._id, data);
      setUser((prevUser) => ({
        ...prevUser,
        ...response?.data
      }));
      setErrors({});
      alert('Perfil actualizado con éxito!');
      setShowPasswordSection(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
      <div className="flex items-start gap-8">
        <div className="relative flex-shrink-0">
          <Persona
            imageUrl={previewImage}
            size={PersonaSize.size100}
            text={`${user?.name} ${user?.lastname}`}
            secondaryText={user?.username}
            className="cursor-pointer"
            onClick={() => document.getElementById('fileInput').click()}
          />
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Nombre completo"
              value={`${user?.name} ${user?.lastname}` || ''}
              readOnly
              disabled
            />
            <TextField
              label="Correo electrónico"
              value={user?.email || ''}
              readOnly
              disabled
            />
          </div>

          <TextField
            label="Teléfono"
            value={phone || ''}
            onChange={(_, val) => setPhone(val || '')}
            errorMessage={errors.phone}
            placeholder="Ej: 3101234567"
            maxLength={15}
          />

          <TextField
            label="Dirección"
            value={address || ''}
            onChange={(_, val) => setAddress(val || '')}
            placeholder="Ingresa tu dirección completa"
            multiline
            rows={3}
          />

          <Link 
            onClick={() => setShowPasswordSection(!showPasswordSection)} 
            underline
            className="text-blue-600 hover:text-blue-800 cursor-pointer mb-4 mr-4"
          >
            Cambiar contraseña
          </Link>

          <AnimatePresence>
            {showPasswordSection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <TextField
                  label="Nueva Contraseña"
                  type="password"
                  value={newPassword || ''}
                  onChange={(_, val) => setNewPassword(val || '')}
                />
                <TextField
                  label="Confirmar Nueva Contraseña"
                  type="password"
                  value={confirmPassword || ''}
                  onChange={(_, val) => setConfirmPassword(val || '')}
                  errorMessage={errors.password}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <PrimaryButton
            text="Guardar Cambios"
            onClick={handleUpdateProfile}
            disabled={isLoading || isButtonDisabled}
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;

