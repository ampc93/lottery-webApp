import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { accessToken, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (username.trim() === '' || password.trim() === '') {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    try {

      await login(username, password);
      console.log(accessToken);
      if(accessToken){
      navigate('/dashboard');
      }
      
    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <form onSubmit={handleSubmit}>
        <Stack
          tokens={{ childrenGap: 20 }}
          styles={{
            root: {
              width: 400,
              padding: 40,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: 8,
              backgroundColor: '#fff'
            },
          }}
        >
          <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
          <TextField
            label="Usuario"
            value={username}
            onChange={(e, newValue) => setUsername(newValue)}
            required
          />

          <div style={{ position: 'relative' }}>
            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e, newValue) => setPassword(newValue)}
              required
              styles={{
                fieldGroup: {
                  paddingRight: '30px' // Espacio para el ícono
                }
              }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 10,
                top: 35,
                cursor: 'pointer',
                color: '#999'
              }}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {error && (
            <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
              {error}
            </MessageBar>
          )}
          <PrimaryButton
            text={loading ? "Cargando..." : "Iniciar Sesión"}
            type="submit"
            disabled={loading}
            styles={{
              root: {
                width: '100%',
                height: 40,
                fontWeight: 'bold'
              }
            }}
          />
        </Stack>
      </form>
    </div>
  );
};

export default Login;




// import React, { useState } from 'react';
// import { TextField, PrimaryButton, Stack } from '@fluentui/react';
// import { loginUser } from '../services/authService';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {
//       const response = await loginUser(username, password);
//       console.log(response.result);
//       if (response?.result?.token) {

//         localStorage.setItem('authToken', response.token);
//         navigate('/');

//       } else {
//         setError('Usuario o contraseña incorrectos.');
//       }
//     } catch (err) {
//       setError('Error al iniciar sesión. Intente nuevamente.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300, margin: 'auto', padding: 50 } }}>
//         <h2>Iniciar Sesión</h2>
//         <TextField
//           label="Usuario"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <TextField
//           label="Contraseña"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <PrimaryButton text="Iniciar Sesión" type="submit" />
//       </Stack>
//     </form>
//   );
// };

// export default Login;
