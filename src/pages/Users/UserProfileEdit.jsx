import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { updateUser } from '../../services/userProfileService.js';
import { Persona, PersonaSize } from '@fluentui/react';

const UserProfileEdit = () => {

  const { user, setUser } = useAuth();
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const base64Image = user?.photo?.data 
    ? btoa(String.fromCharCode(...new Uint8Array(user.photo.data))) 
    : '';

  // Cargar la imagen de perfil al montar el componente
  useEffect(() => {
    if (user?.photo) {
      setPreviewImage(`data:image/jpeg;base64,${base64Image}`);
    }
  }, [user, base64Image]);

  // Función para manejar el cambio de imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setProfileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para actualizar la imagen de perfil
  const handleUpdateProfile = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('photo', profileImage);

      try {
        const updatedUser = await updateUser(user._id, formData);
        setUser(updatedUser);
        alert('¡Imagen de perfil actualizada con éxito!');
      } catch (error) {
        console.error('Error al actualizar la imagen de perfil:', error);
        alert('Hubo un error al actualizar la imagen de perfil.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
      <div className="flex items-center">
        {/* Imagen de perfil */}
        <div className="relative">
          <Persona
            imageUrl={previewImage}
            size={PersonaSize.size100} 
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

        {/* Información del usuario */}
        <div className="ml-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Nombre Completo:</label>
            <p className="text-gray-800">{`${user?.name ?? ''} ${user?.lastname ?? ''}`}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Correo Electrónico:</label>
            <p className="text-gray-800">{user?.email ?? 'correo@example.com'}</p>
          </div>

          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
