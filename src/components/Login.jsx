import React, { useState } from 'react';
import { TextField, PrimaryButton, DefaultButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
import { FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import fondoLogin from '../assets/FondoLogin.webp';

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

      if (accessToken) {
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
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(15deg, #f3f4f6 0%, #e5e7eb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%'
    }}>
      
      {/* Sección de imagen */}
      <div style={{
        flex: 1,
        maxWidth: '600px',
        position: 'relative',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '600px',
          backgroundImage: `url(${fondoLogin})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.1))',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(15deg, rgba(26,35,126,0.05) 0%, transparent 50%)'
          }} />
        </div>
      </div>

      {/* Formulario compacto */}
      <div style={{
        flex: 1,
        maxWidth: '400px', // Más compacto
        background: 'rgba(255, 255, 255, 0.97)',
        borderRadius: '20px',
        padding: '32px', // Reducido de 40px
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.03)',
        position: 'relative',
        zIndex: 2,
        backdropFilter: 'blur(6px)',
        animation: 'formEntry 1s ease-out'
      }}>
        <form onSubmit={handleSubmit}>
          <Stack tokens={{ childrenGap: 16 }}> {/* Espaciado reducido */}
            <h2 style={{ 
              textAlign: 'center', 
              color: '#1a237e',
              fontSize: '1.8rem', // Tamaño reducido
              marginBottom: '4px', // Menor margen
              fontWeight: 700
            }}>
              Acceso
            </h2>
            
            <p style={{ 
              textAlign: 'center', 
              color: '#4b5563',
              fontSize: '0.9rem', // Tamaño reducido
              marginBottom: '24px', // Menor margen
              lineHeight: '1.4'
            }}>
              Ingresa tus credenciales
            </p>

            <TextField
              label="Usuario"
              value={username}
              onChange={(e, newValue) => setUsername(newValue)}
              styles={{
                fieldGroup: {
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: '#9ca3af' },
                  '&:focus-within': { 
                    borderColor: '#1a237e',
                    boxShadow: 'none',
                    outline: 'none'
                  }
                }
              }}
            />

            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <TextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e, newValue) => setPassword(newValue)}
                styles={{
                  fieldGroup: {
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    paddingRight: '40px',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#9ca3af' },
                    '&:focus-within': { 
                      borderColor: '#1a237e',
                      boxShadow: 'none',
                      outline: 'none'
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '75%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#4b5563',
                  padding: '4px',
                  transition: 'all 0.2s ease',
                  ':hover': { 
                    color: '#1a237e',
                    transform: 'translateY(-50%) scale(1.1)'
                  }
                }}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {/* Botón recuperar contraseña */}
            <div style={{ 
              textAlign: 'right', 
              margin: '-8px 0 12px 0',
              fontSize: '0.85rem'
            }}>
              <button
                type="button"
                onClick={() => navigate('/recover-password')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1a237e',
                  cursor: 'pointer',
                  padding: '2px',
                  textDecoration: 'underline',
                  ':hover': {
                    color: '#303f9f',
                    textDecoration: 'none'
                  }
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <MessageBar 
                messageBarType={MessageBarType.error}
                styles={{
                  root: {
                    borderRadius: '6px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    fontSize: '0.9rem',
                    marginBottom: '12px'
                  }
                }}
              >
                {error}
              </MessageBar>
            )}

            <PrimaryButton
              text={loading ? "Cargando..." : "Ingresar"}
              type="submit"
              disabled={loading}
              styles={{
                root: {
                  height: '42px', // Altura reducida
                  borderRadius: '8px',
                  backgroundColor: '#1a237e',
                  fontSize: '14px', // Tamaño reducido
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    backgroundColor: '#2d3a8c',
                    transform: 'translateY(-1px)'
                  }
                }
              }}
            />

            <DefaultButton
              text="Crear cuenta"
              onClick={() => navigate('/register')}
              styles={{
                root: {
                  height: '42px', // Altura reducida
                  borderRadius: '8px',
                  border: '2px solid #1a237e',
                  color: '#1a237e',
                  fontSize: '14px', // Tamaño reducido
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                    transform: 'translateY(-1px)'
                  }
                }
              }}
              iconProps={{ 
                iconName: 'FiUserPlus',
                styles: { root: { fontSize: '16px', marginRight: '6px' } }
              }}
            />
          </Stack>
        </form>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @keyframes formEntry {
            0% { 
              opacity: 0;
              transform: translateY(20px);
            }
            100% { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { TextField, PrimaryButton, DefaultButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
// import { FiEye, FiEyeOff, FiUserPlus, FiArrowRight } from 'react-icons/fi';
// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';
// import fondoLogin from '../assets/FondoLogin.webp';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { accessToken, login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (username.trim() === '' || password.trim() === '') {
//       setError('Todos los campos son obligatorios.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await login(username, password);

//       if (accessToken) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div style={{
//       position: 'relative',
//       height: '100vh',
//       overflow: 'hidden',
//       background: 'linear-gradient(15deg, #f3f4f6 0%, #e5e7eb 100%)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: '0 5%'
//     }}>
      
//       {/* Sección de personas integradas */}
//       <div style={{
//         flex: 1,
//         maxWidth: '600px',
//         position: 'relative',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         {/* Grupo de personas con efecto parallax */}
//         <div style={{
//           position: 'relative',
//           width: '100%',
//           height: '600px',
//           backgroundImage: `url(${fondoLogin})`,
//           backgroundSize: 'contain',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//           filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.1))',
//           animation: 'float 6s ease-in-out infinite'
//         }}>
//           {/* Efecto de profundidad */}
//           <div style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             background: 'linear-gradient(15deg, rgba(26,35,126,0.05) 0%, transparent 50%)'
//           }} />
//         </div>
//       </div>

//       {/* Formulario de Login */}
//       <div style={{
//         flex: 1,
//         maxWidth: '450px',
//         background: 'rgba(255, 255, 255, 0.97)',
//         borderRadius: '20px',
//         padding: '40px',
//         boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
//         border: '1px solid rgba(0, 0, 0, 0.03)',
//         position: 'relative',
//         zIndex: 2,
//         backdropFilter: 'blur(6px)',
//         transform: 'translateY(0)',
//         animation: 'formEntry 1s ease-out'
//       }}>
//         <form onSubmit={handleSubmit}>
//           <Stack tokens={{ childrenGap: 24 }}>
//             <h2 style={{ 
//               textAlign: 'center', 
//               color: '#1a237e',
//               fontSize: '2.2rem',
//               marginBottom: '8px',
//               fontWeight: 700,
//               letterSpacing: '-0.5px'
//             }}>
//               Login
//             </h2>
            
//             <p style={{ 
//               textAlign: 'center', 
//               color: '#4b5563',
//               fontSize: '1rem',
//               marginBottom: '32px',
//               lineHeight: '1.5'
//             }}>
//               Accede a tu cuenta
//             </p>

//             <TextField
//               label="Usuario"
//               value={username}
//               onChange={(e, newValue) => setUsername(newValue)}
//               styles={{
//                 fieldGroup: {
//                   border: '2px solid #e5e7eb',
//                   borderRadius: '8px',
//                   transition: 'all 0.2s ease',
//                   '&:hover': { borderColor: '#9ca3af' },
//                   '&:focus-within': { 
//                     borderColor: '#1a237e',
//                     boxShadow: '0 0 0 3px rgba(26, 35, 126, 0.1)'
//                   }
//                 }
//               }}
//             />

//             <div style={{ position: 'relative' }}>
//               <TextField
//                 label="Contraseña"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e, newValue) => setPassword(newValue)}
//                 styles={{
//                   fieldGroup: {
//                     border: '2px solid #e5e7eb',
//                     borderRadius: '8px',
//                     paddingRight: '40px',
//                     transition: 'all 0.2s ease',
//                     '&:hover': { borderColor: '#9ca3af' },
//                     '&:focus-within': { 
//                       borderColor: '#1a237e',
//                       boxShadow: '0 0 0 3px rgba(26, 35, 126, 0.1)'
//                     }
//                   }
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: 'absolute',
//                   right: '12px',
//                   top: '38px',
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   color: '#4b5563',
//                   padding: '4px',
//                   transition: 'all 0.2s ease',
//                   '&:hover': { color: '#1a237e' }
//                 }}
//               >
//                 {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//               </button>
//             </div>

//             {error && (
//               <MessageBar 
//                 messageBarType={MessageBarType.error}
//                 styles={{
//                   root: {
//                     borderRadius: '8px',
//                     backgroundColor: '#fef2f2',
//                     border: '2px solid #fecaca'
//                   }
//                 }}
//               >
//                 {error}
//               </MessageBar>
//             )}

//             <PrimaryButton
//               text={loading ? "Cargando..." : "Acceder"}
//               type="submit"
//               disabled={loading}
//               styles={{
//                 root: {
//                   height: '48px',
//                   borderRadius: '8px',
//                   backgroundColor: '#1a237e',
//                   fontSize: '16px',
//                   fontWeight: 600,
//                   transition: 'all 0.2s ease',
//                   '&:hover': { 
//                     backgroundColor: '#2d3a8c',
//                     transform: 'translateY(-1px)'
//                   }
//                 }
//               }}
//             />

//             <DefaultButton
//               text="Crear cuenta"
//               onClick={() => navigate('/register')}
//               styles={{
//                 root: {
//                   height: '48px',
//                   borderRadius: '8px',
//                   border: '2px solid #1a237e',
//                   color: '#1a237e',
//                   fontWeight: 600,
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     backgroundColor: '#f8fafc',
//                     transform: 'translateY(-1px)'
//                   }
//                 }
//               }}
//               iconProps={{ 
//                 iconName: 'FiUserPlus',
//                 styles: { root: { fontSize: '18px', marginRight: '8px' } }
//               }}
//             />
//           </Stack>
//         </form>
//       </div>

//       {/* Animaciones CSS */}
//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0); }
//             50% { transform: translateY(-20px); }
//           }

//           @keyframes formEntry {
//             0% { 
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             100% { 
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';
// import fondoLogin from '../assets/FondoLogin.webp';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { accessToken, login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (username.trim() === '' || password.trim() === '') {
//       setError('Todos los campos son obligatorios.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await login(username, password);

//       if (accessToken) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div style={{
//       position: 'relative',
//       height: '100vh',
//       overflow: 'hidden',
//       background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)'
//     }}>
//       {/* Imagen decorativa en el fondo */}
//       <img 
//         src={fondoLogin} 
//         alt="Decoración de Fondo" 
//         style={{
//           position: 'absolute',
//           top: '10%',
//           right: '5%',
//           width: '40%',
//           opacity: 0.2,
//           zIndex: -1
//         }}
//       />

//       {/* Barra superior transparente */}
//       <div 
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '10px 20px',
//           backgroundColor: 'rgba(255, 255, 255, 0.3)',
//           backdropFilter: 'blur(10px)',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//           zIndex: 2,
//           width: '100%',
//           position: 'absolute',
//           top: 0,
//         }}
//       >
//         <div>
//           <img 
//             src="/images/logo.png" 
//             alt="Logo" 
//             style={{ height: '25px', cursor: 'pointer' }}
//             onClick={() => navigate('/')}
//           />
//         </div>
//         <div>
//           <PrimaryButton
//             text="Crear Cuenta"
//             onClick={() => navigate('/registro')}
//             styles={{
//               root: {
//                 backgroundColor: '#0078D4',
//                 borderColor: 'transparent',
//                 color: '#fff',
//                 fontWeight: 'bold',
//               },
//               rootHovered: {
//                 backgroundColor: '#005A9E',
//               }
//             }}
//           />
//         </div>
//       </div>

//       <div 
//         style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '100vh', 
//           position: 'relative' 
//         }}
//       >
//         <form onSubmit={handleSubmit} style={{ zIndex: 1, marginTop: '80px' }}>
//           <Stack
//             tokens={{ childrenGap: 20 }}
//             styles={{
//               root: {
//                 width: 400,
//                 padding: 40,
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//                 borderRadius: 8,
//                 backgroundColor: 'rgba(255, 255, 255, 0.85)', 
//                 backdropFilter: 'blur(10px)',
//               },
//             }}
//           >
//             <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
//             <TextField
//               label="Usuario"
//               value={username}
//               onChange={(e, newValue) => setUsername(newValue)}
//               required
//             />

//             <div style={{ position: 'relative' }}>
//               <TextField
//                 label="Contraseña"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e, newValue) => setPassword(newValue)}
//                 required
//                 styles={{
//                   fieldGroup: {
//                     paddingRight: '30px'
//                   }
//                 }}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: 'absolute',
//                   right: 10,
//                   top: 35,
//                   cursor: 'pointer',
//                   color: '#999'
//                 }}
//               >
//                 {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//               </span>
//             </div>

//             {error && (
//               <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
//                 {error}
//               </MessageBar>
//             )}
//             <PrimaryButton
//               text={loading ? "Cargando..." : "Iniciar Sesión"}
//               type="submit"
//               disabled={loading}
//               styles={{
//                 root: {
//                   width: '100%',
//                   height: 40,
//                   fontWeight: 'bold'
//                 }
//               }}
//             />
//           </Stack>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { accessToken, login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (username.trim() === '' || password.trim() === '') {
//       setError('Todos los campos son obligatorios.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await login(username, password);

//       if (accessToken) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//       {/* Barra superior transparente */}
//       <div 
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '10px 20px',
//           backgroundColor: 'rgba(255, 255, 255, 0.3)',
//           backdropFilter: 'blur(10px)',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//           zIndex: 2,
//           width: '100%',
//           position: 'absolute',
//           top: 0,
//         }}
//       >
//         {/* Logo a la izquierda */}
//         <div>
//           <img 
//             src="/images/logo.png" 
//             alt="Logo" 
//             style={{ height: '25px', cursor: 'pointer' }}
//             onClick={() => navigate('/')}
//           />
//         </div>
//         {/* Botón de Registro a la derecha */}
//         <div>
//           <PrimaryButton
//             text="Crear Cuenta"
//             onClick={() => navigate('/registro')}
//             styles={{
//               root: {
//                 backgroundColor: '#0078D4',
//                 borderColor: 'transparent',
//                 color: '#fff',
//                 fontWeight: 'bold',
//               },
//               rootHovered: {
//                 backgroundColor: '#005A9E',
//               }
//             }}
//           />
//         </div>
//       </div>

//       {/* Video de fondo responsive */}
//       <video
//         autoPlay
//         loop
//         muted
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           width: '100vw',
//           height: '100vh',
//           objectFit: 'cover',
//           transform: 'translate(-50%, -50%)',
//           zIndex: -1
//         }}
//       >
//         <source src="/videos/FondoLogin.mp4" type="video/mp4" />
//         Tu navegador no soporta el video de fondo.
//       </video>

//       <div 
//         style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '100vh', 
//           position: 'relative' 
//         }}
//       >
//         <form onSubmit={handleSubmit} style={{ zIndex: 1, marginTop: '80px' }}>
//           <Stack
//             tokens={{ childrenGap: 20 }}
//             styles={{
//               root: {
//                 width: 400,
//                 padding: 40,
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//                 borderRadius: 8,
//                 backgroundColor: 'rgba(255, 255, 255, 0.85)', 
//                 backdropFilter: 'blur(10px)',
//               },
//             }}
//           >
//             <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
//             <TextField
//               label="Usuario"
//               value={username}
//               onChange={(e, newValue) => setUsername(newValue)}
//               required
//             />

//             <div style={{ position: 'relative' }}>
//               <TextField
//                 label="Contraseña"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e, newValue) => setPassword(newValue)}
//                 required
//                 styles={{
//                   fieldGroup: {
//                     paddingRight: '30px'
//                   }
//                 }}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: 'absolute',
//                   right: 10,
//                   top: 35,
//                   cursor: 'pointer',
//                   color: '#999'
//                 }}
//               >
//                 {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//               </span>
//             </div>

//             {error && (
//               <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
//                 {error}
//               </MessageBar>
//             )}
//             <PrimaryButton
//               text={loading ? "Cargando..." : "Iniciar Sesión"}
//               type="submit"
//               disabled={loading}
//               styles={{
//                 root: {
//                   width: '100%',
//                   height: 40,
//                   fontWeight: 'bold'
//                 }
//               }}
//             />
//           </Stack>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { accessToken, login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (username.trim() === '' || password.trim() === '') {
//       setError('Todos los campos son obligatorios.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await login(username, password);

//       if (accessToken) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//       {/* Barra superior */}
//       <div 
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '10px 20px',
//           backgroundColor: 'rgba(255, 255, 255, 0.85)',
//           backdropFilter: 'blur(10px)',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//           zIndex: 2,
//           width: '100%',
//           position: 'absolute',
//           top: 0,
//         }}
//       >
//         {/* Logo a la izquierda */}
//         <div>
//           <img 
//             src="/images/logo.png" 
//             alt="Logo" 
//             style={{ height: '25px', cursor: 'pointer' }}
//             onClick={() => navigate('/')}
//           />
//         </div>
//         {/* Botón de Registro a la derecha */}
//         <div>
//           <PrimaryButton
//             text="Crear Cuenta"
//             onClick={() => navigate('/registro')}
//             styles={{
//               root: {
//                 backgroundColor: '#0078D4',
//                 borderColor: 'transparent',
//                 color: '#fff',
//                 fontWeight: 'bold',
//               },
//               rootHovered: {
//                 backgroundColor: '#005A9E',
//               }
//             }}
//           />
//         </div>
//       </div>

//       <video
//         autoPlay
//         loop
//         muted
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           minWidth: '100%',
//           minHeight: '100%',
//           width: 'auto',
//           height: 'auto',
//           transform: 'translate(-50%, -50%)',
//           zIndex: -1
//         }}
//       >
//         <source src="/videos/FondoLogin.mp4" type="video/mp4" />
//         Tu navegador no soporta el video de fondo.
//       </video>

//       <div 
//         style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '100vh', 
//           position: 'relative' 
//         }}
//       >
//         <form onSubmit={handleSubmit} style={{ zIndex: 1, marginTop: '80px' }}>
//           <Stack
//             tokens={{ childrenGap: 20 }}
//             styles={{
//               root: {
//                 width: 400,
//                 padding: 40,
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//                 borderRadius: 8,
//                 backgroundColor: 'rgba(255, 255, 255, 0.85)', 
//                 backdropFilter: 'blur(10px)',
//               },
//             }}
//           >
//             <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
//             <TextField
//               label="Usuario"
//               value={username}
//               onChange={(e, newValue) => setUsername(newValue)}
//               required
//             />

//             <div style={{ position: 'relative' }}>
//               <TextField
//                 label="Contraseña"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e, newValue) => setPassword(newValue)}
//                 required
//                 styles={{
//                   fieldGroup: {
//                     paddingRight: '30px'
//                   }
//                 }}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: 'absolute',
//                   right: 10,
//                   top: 35,
//                   cursor: 'pointer',
//                   color: '#999'
//                 }}
//               >
//                 {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//               </span>
//             </div>

//             {error && (
//               <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
//                 {error}
//               </MessageBar>
//             )}
//             <PrimaryButton
//               text={loading ? "Cargando..." : "Iniciar Sesión"}
//               type="submit"
//               disabled={loading}
//               styles={{
//                 root: {
//                   width: '100%',
//                   height: 40,
//                   fontWeight: 'bold'
//                 }
//               }}
//             />
//           </Stack>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { accessToken, login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (username.trim() === '' || password.trim() === '') {
//       setError('Todos los campos son obligatorios.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await login(username, password);

//       if (accessToken) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//       <video
//         autoPlay
//         loop
//         muted
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           minWidth: '100%',
//           minHeight: '100%',
//           width: 'auto',
//           height: 'auto',
//           transform: 'translate(-50%, -50%)',
//           zIndex: -1
//         }}
//       >
//         <source src="/videos/FondoLogin.mp4" type="video/mp4" />
//         Tu navegador no soporta el video de fondo.
//       </video>

//       <div 
//         style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '100vh', 
//           position: 'relative' 
//         }}
//       >
//         <form onSubmit={handleSubmit} style={{ zIndex: 1 }}>
//           <Stack
//             tokens={{ childrenGap: 20 }}
//             styles={{
//               root: {
//                 width: 400,
//                 padding: 40,
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//                 borderRadius: 8,
//                 backgroundColor: 'rgba(255, 255, 255, 0.85)', 
//                 backdropFilter: 'blur(10px)',
//               },
//             }}
//           >
//             <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
//             <TextField
//               label="Usuario"
//               value={username}
//               onChange={(e, newValue) => setUsername(newValue)}
//               required
//             />

//             <div style={{ position: 'relative' }}>
//               <TextField
//                 label="Contraseña"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e, newValue) => setPassword(newValue)}
//                 required
//                 styles={{
//                   fieldGroup: {
//                     paddingRight: '30px'
//                   }
//                 }}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 style={{
//                   position: 'absolute',
//                   right: 10,
//                   top: 35,
//                   cursor: 'pointer',
//                   color: '#999'
//                 }}
//               >
//                 {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//               </span>
//             </div>

//             {error && (
//               <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
//                 {error}
//               </MessageBar>
//             )}
//             <PrimaryButton
//               text={loading ? "Cargando..." : "Iniciar Sesión"}
//               type="submit"
//               disabled={loading}
//               styles={{
//                 root: {
//                   width: '100%',
//                   height: 40,
//                   fontWeight: 'bold'
//                 }
//               }}
//             />
//           </Stack>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { accessToken, login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (username.trim() === '' || password.trim() === '') {
//       setError('Todos los campos son obligatorios.');
//       setLoading(false);
//       return;
//     }

//     try {
//       await login(username, password);

//       if (accessToken) {
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//       <video
//         autoPlay
//         loop
//         muted
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           zIndex: -1
//         }}
//       >
//         <source src="/videos/Fondo.mp4" type="video/mp4" />
//         Tu navegador no soporta el video de fondo.
//       </video>

//       <form onSubmit={handleSubmit} style={{ zIndex: 1 }}>
//         <Stack
//           tokens={{ childrenGap: 20 }}
//           styles={{
//             root: {
//               width: 400,
//               padding: 40,
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//               borderRadius: 8,
//               backgroundColor: 'rgba(255, 255, 255, 0.85)', // Transparencia para destacar el formulario
//               backdropFilter: 'blur(10px)',
//               position: 'relative',
//               zIndex: 1
//             },
//           }}
//         >
//           <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
//           <TextField
//             label="Usuario"
//             value={username}
//             onChange={(e, newValue) => setUsername(newValue)}
//             required
//           />

//           <div style={{ position: 'relative' }}>
//             <TextField
//               label="Contraseña"
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={(e, newValue) => setPassword(newValue)}
//               required
//               styles={{
//                 fieldGroup: {
//                   paddingRight: '30px'
//                 }
//               }}
//             />
//             <span
//               onClick={togglePasswordVisibility}
//               style={{
//                 position: 'absolute',
//                 right: 10,
//                 top: 35,
//                 cursor: 'pointer',
//                 color: '#999'
//               }}
//             >
//               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </span>
//           </div>

//           {error && (
//             <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
//               {error}
//             </MessageBar>
//           )}
//           <PrimaryButton
//             text={loading ? "Cargando..." : "Iniciar Sesión"}
//             type="submit"
//             disabled={loading}
//             styles={{
//               root: {
//                 width: '100%',
//                 height: 40,
//                 fontWeight: 'bold'
//               }
//             }}
//           />
//         </Stack>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType } from '@fluentui/react';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { accessToken, login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (username.trim() === '' || password.trim() === '') {
//       setError('Todos los campos son obligatorios.');
//       setLoading(false);
//       return;
//     }

//     try {

//       await login(username, password);
      
//       if(accessToken){
//       navigate('/dashboard');
//       }
      
//     } catch (err) {
//       setError(err.message);

//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#f0f2f5'
//     }}>
//       <form onSubmit={handleSubmit}>
//         <Stack
//           tokens={{ childrenGap: 20 }}
//           styles={{
//             root: {
//               width: 400,
//               padding: 40,
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//               borderRadius: 8,
//               backgroundColor: '#fff'
//             },
//           }}
//         >
//           <h2 style={{ textAlign: 'center', color: '#333' }}>Iniciar Sesión</h2>
//           <TextField
//             label="Usuario"
//             value={username}
//             onChange={(e, newValue) => setUsername(newValue)}
//             required
//           />

//           <div style={{ position: 'relative' }}>
//             <TextField
//               label="Contraseña"
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={(e, newValue) => setPassword(newValue)}
//               required
//               styles={{
//                 fieldGroup: {
//                   paddingRight: '30px' // Espacio para el ícono
//                 }
//               }}
//             />
//             <span
//               onClick={togglePasswordVisibility}
//               style={{
//                 position: 'absolute',
//                 right: 10,
//                 top: 35,
//                 cursor: 'pointer',
//                 color: '#999'
//               }}
//             >
//               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </span>
//           </div>

//           {error && (
//             <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
//               {error}
//             </MessageBar>
//           )}
//           <PrimaryButton
//             text={loading ? "Cargando..." : "Iniciar Sesión"}
//             type="submit"
//             disabled={loading}
//             styles={{
//               root: {
//                 width: '100%',
//                 height: 40,
//                 fontWeight: 'bold'
//               }
//             }}
//           />
//         </Stack>
//       </form>
//     </div>
//   );
// };

// export default Login;




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
