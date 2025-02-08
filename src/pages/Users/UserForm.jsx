import { useState, useEffect } from 'react';
import { TextField, PrimaryButton, Stack, Dropdown, Toggle } from '@fluentui/react';
import { addUser as createUser, updateUser } from '../../services/userProfileService.js';

const UserForm = ({ user, closeModal, roles }) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [roleId, setRoleId] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLastname(user.lastname || '');
      setEmail(user.email || '');
      setUsername(user.username || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setAvailable(user.available ?? true);
      setPassword(''); // No mostramos la contraseña actual por seguridad
      
      const userRoleId = String(user.role_id?._id || user.role_id);
      const roleIds = roles.map(role => String(role._id));

      if (roleIds.includes(userRoleId)) {
        setRoleId(userRoleId);
      } else {
        console.warn("El role_id del usuario no coincide con ningún rol disponible.", { userRoleId, roleIds });
        setRoleId(null);
      }

    }
  }, [user, roles]);

  const handleSubmit = async () => {
    if (!/^\d{10,15}$/.test(phone)) {
      alert('El teléfono debe contener entre 10 y 15 dígitos.');
      return;
    }

    const userData = { 
      name, lastname, email, username, password, 
      phone, address, role_id: roleId, photo, available 
    };

    if (user) {
      await updateUser(user._id, userData);
    } else {
      await createUser(userData);
    }

    closeModal();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = () => {
      // Convertir a Base64
      const base64String = reader.result.split(",")[1];
      setPhoto(base64String); // Guardamos solo la parte útil
    };
    reader.readAsDataURL(file); //  Usa `readAsDataURL` en lugar de `readAsArrayBuffer`
  };

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <TextField label="Nombre" value={name} onChange={(e, newValue) => setName(newValue)} required />
      <TextField label="Apellido" value={lastname} onChange={(e, newValue) => setLastname(newValue)} required />
      <TextField label="Correo Electrónico" value={email} onChange={(e, newValue) => setEmail(newValue)} required />
      <TextField label="Usuario" value={username} onChange={(e, newValue) => setUsername(newValue)} required />
      <TextField label="Contraseña" type="password" value={password} onChange={(e, newValue) => setPassword(newValue)} required={!user} />
      <TextField label="Teléfono" value={phone} onChange={(e, newValue) => setPhone(newValue)} required />
      <TextField label="Dirección" value={address} onChange={(e, newValue) => setAddress(newValue)} multiline />

      {/* Dropdown para seleccionar el rol */}
      <Dropdown
        label="Rol"
        placeholder="Seleccione un rol"
        options={roles.map(r => ({ key: r._id, text: r.description }))}
        selectedKey={roleId ?? undefined} // Asegura que no haya problemas con null/undefined
        onChange={(e, option) => setRoleId(option.key)} 
        required
      />

      <div>
        <label className="block text-sm font-bold mb-2">Foto</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </div>

      <Toggle
        label="Disponible"
        checked={available}
        onChange={(e, checked) => setAvailable(checked)}
      />

      <PrimaryButton text={user ? "Actualizar Usuario" : "Crear Usuario"} onClick={handleSubmit} />
    </Stack>
  );
};

export default UserForm;


// import { useState, useEffect } from 'react';
// import { TextField, PrimaryButton, Stack, Dropdown, Toggle } from '@fluentui/react';
// import { addUser as createUser, updateUser } from '../../services/userProfileService.js';

// const UserForm = ({ user, closeModal, roles }) => {
//   const [name, setName] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [roleId, setRoleId] = useState(null);
//   const [photo, setPhoto] = useState(null);
//   const [available, setAvailable] = useState(true);

//   useEffect(() => {
//     if (user) {
//       setName(user.name || '');
//       setLastname(user.lastname || '');
//       setEmail(user.email || '');
//       setUsername(user.username || '');
//       setPhone(user.phone || '');
//       setAddress(user.address || '');
//       setRoleId(user.role_id || null);
//       setAvailable(user.available ?? true);
//       setPassword('');
//     }
//   }, [user]);

//   const handleSubmit = async () => {
//     if (!/^\d{10,15}$/.test(phone)) {
//       alert('El teléfono debe contener entre 10 y 15 dígitos.');
//       return;
//     }

//     const userData = { 
//       name, lastname, email, username, password, 
//       phone, address, role_id: roleId, photo, available 
//     };

//     if (user) {
//       await updateUser(user._id, userData);
//     } else {
//       await createUser(userData);
//     }

//     closeModal();
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPhoto(reader.result);
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <Stack tokens={{ childrenGap: 15 }}>
//       <TextField label="Nombre" value={name} onChange={(e, newValue) => setName(newValue)} required />
//       <TextField label="Apellido" value={lastname} onChange={(e, newValue) => setLastname(newValue)} required />
//       <TextField label="Correo Electrónico" value={email} onChange={(e, newValue) => setEmail(newValue)} required />
//       <TextField label="Usuario" value={username} onChange={(e, newValue) => setUsername(newValue)} required />
//       <TextField label="Contraseña" type="password" value={password} onChange={(e, newValue) => setPassword(newValue)} required={!user} />
//       <TextField label="Teléfono" value={phone} onChange={(e, newValue) => setPhone(newValue)} required />
//       <TextField label="Dirección" value={address} onChange={(e, newValue) => setAddress(newValue)} multiline />

//       <Dropdown
//         label="Rol"
//         placeholder="Seleccione un rol"
//         options={roles.map(r => ({ key: r._id, text: r.description }))}
//         selectedKey={roleId}
//         onChange={(e, option) => setRoleId(option.key)}
//         required
//       />

//       <div>
//         <label className="block text-sm font-bold mb-2">Foto</label>
//         <input type="file" accept="image/*" onChange={handlePhotoUpload} />
//       </div>

//       <Toggle
//         label="Disponible"
//         checked={available}
//         onChange={(e, checked) => setAvailable(checked)}
//       />

//       <PrimaryButton text={user ? "Actualizar Usuario" : "Crear Usuario"} onClick={handleSubmit} />
//     </Stack>
//   );
// };

// export default UserForm;


// import { useState, useEffect } from 'react';
// import { TextField, PrimaryButton, Stack } from '@fluentui/react';
// import { addUser as createUser, updateUser } from '../../services/userProfileService.js';

// const UserForm = ({ user, closeModal }) => {
//   const [name, setName] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  
//   useEffect(() => {
//     if (user) {
//       setName(user.name || '');
//       setLastname(user.lastname || '');
//       setEmail(user.email || '');
//       setUsername(user.username || '');
//       setPassword(''); // No mostramos la contraseña actual por seguridad
//     }
//   }, [user]);

//   const handleSubmit = async () => {
//     const userData = { name, lastname, email, username, password };

//     if (user) {
//       await updateUser(user._id, userData);
//     } else {
//       await createUser(userData);
//     }

//     closeModal();
//   };

//   return (
//     <Stack tokens={{ childrenGap: 15 }}>
//       <TextField label="Nombre" value={name} onChange={(e, newValue) => setName(newValue)} required />
//       <TextField label="Apellido" value={lastname} onChange={(e, newValue) => setLastname(newValue)} required />
//       <TextField label="Correo Electrónico" value={email} onChange={(e, newValue) => setEmail(newValue)} required />
//       <TextField label="Usuario" value={username} onChange={(e, newValue) => setUsername(newValue)} required />
//       <TextField label="Contraseña" type="password" value={password} onChange={(e, newValue) => setPassword(newValue)} required={!user} />
      
//       <PrimaryButton text={user ? "Actualizar Usuario" : "Crear Usuario"} onClick={handleSubmit} />
//     </Stack>
//   );
// };

// export default UserForm;
