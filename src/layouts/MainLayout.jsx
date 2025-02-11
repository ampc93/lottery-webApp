import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Submenu from '../components/Submenu';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar fijo */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Contenedor principal */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: collapsed ? '80px' : '250px',
          transition: 'margin-left 0.3s ease-in-out',
          marginTop: '50px', // Ajustamos un poco para el espacio del Navbar
        }}
      >
        {/* Navbar fijo */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: collapsed ? '80px' : '250px',
            right: 0,
            zIndex: 1000,
            width: `calc(100% - ${collapsed ? '80px' : '250px'})`, // Ajustamos el tamaño del navbar
            transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out', // Animación de transiciones
          }}
        >
          <Navbar collapsed={collapsed} /> {/* Pasamos el estado de colapso */}
        </div>

        {/* Submenu */}
        <div
          style={{
            position: 'fixed',
            top: collapsed ? '40px' : '60px', // Ajustar la posición dependiendo del estado del Navbar
            left: collapsed ? '80px' : '250px',
            right: 0,
            zIndex: 999,
            width: `calc(100% - ${collapsed ? '80px' : '250px'})`,
            transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
            background: '#333',
            height: '40px', // Altura constante para el Submenu
            padding: collapsed ? '5px 16px' : '10px 16px', // Reducir el padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
          }}
        >
          <Submenu />
        </div>

        {/* Contenido con scroll */}
        <div
          style={{
            flex: 1,
            marginTop: '40px' , // Ajuste según la altura de Navbar + Submenu
            padding: '16px',
            overflowY: 'auto',
            height: 'calc(100vh - 120px)', // Altura restante después del navbar y submenu
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;


// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import Submenu from '../components/Submenu';

// const MainLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       {/* Sidebar fijo */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Contenedor principal */}
//       <div
//         style={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           marginLeft: collapsed ? '80px' : '250px',
//           transition: 'margin-left 0.3s ease-in-out',
//           marginTop: '50px', // Ajustamos un poco para el espacio del Navbar
//         }}
//       >
//         {/* Navbar fijo */}
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: collapsed ? '80px' : '250px',
//             right: 0,
//             zIndex: 1000,
//             width: 'calc(100% - 250px)',
//             transition: 'left 0.3s ease-in-out',
//             padding: '10px 16px',
//             background: '#222',
//             color: 'white',
//           }}
//         >
//           <Navbar />
//           <Submenu />
//         </div>

//         {/* Contenido con scroll */}
//         <div
//           style={{
//             flex: 1,
//             marginTop: '100px', // Ajusta según el tamaño del Navbar + Submenu
//             padding: '16px',
//             overflowY: 'auto',
//             height: 'calc(100vh - 100px)' // Altura restante después del navbar y submenu
//           }}
//         >
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;




// import React from 'react';
// import Navbar from '../components/Navbar';

// const MainLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-neutral-light text-neutral-dark">
//       <Navbar />
//       <main className="p-6">{children}</main>
//     </div>
//   );
// };

// export default MainLayout;