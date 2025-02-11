import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserShield, FaKey, FaUsers, FaTasks, FaBars } from 'react-icons/fa';

const sidebarLinks = [
  { name: 'Inicio', url: '/', icon: <FaHome /> },
  { name: 'Roles', url: '/roles', icon: <FaUserShield /> },
  { name: 'Permisos', url: '/permission', icon: <FaKey /> },
  { name: 'Asignación de Permisos', url: '/PermissionManager', icon: <FaTasks /> },
  { name: 'Gestión de Usuarios', url: '/users', icon: <FaUsers /> }
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <nav style={{
      width: collapsed ? '80px' : '250px',
      height: '100vh',
      background: '#222',
      color: 'white',
      padding: '10px',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto',
      transition: 'width 0.3s ease-in-out',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: '10px'
      }}>
        {!collapsed && <span style={{ fontSize: '20px', fontWeight: 'bold' }}>LOGO</span>}
        <FaBars
          onClick={() => setCollapsed(!collapsed)}
          style={{ cursor: 'pointer', fontSize: '20px' }}
        />
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
        {sidebarLinks.map((link, index) => (
          <li key={index} style={{ margin: '10px 0' }}>
            <NavLink
              to={link.url}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'white',
                textDecoration: 'none',
                padding: '10px',
                borderRadius: '5px',
                fontSize: collapsed ? '20px' : '16px',
                transition: 'background 0.3s'
              }}
            >
              {link.icon}
              {!collapsed && link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <style>
        {`
          .sidebar-link {
            background: transparent;
            transition: background 0.3s;
          }
          .sidebar-link:hover {
            background: #444;
          }
          .sidebar-link.active {
            background: #007BFF;
            font-weight: bold;
          }
        `}
      </style>
    </nav>
  );
};

export default Sidebar;




// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const sidebarLinks = [
//   { name: 'Inicio', url: '/' },
//   { name: 'Roles', url: '/roles' },
//   { name: 'Permisos', url: '/permission' },
//   { name: 'Asignación de Permisos', url: '/PermissionManager' },
//   { name: 'Gestión de Usuarios', url: '/users' }
// ];

// const Sidebar = () => {
//   return (
//     <nav style={{ 
//       width: '250px',
//       height: '100vh',
//       background: '#333',
//       color: 'white',
//       padding: '10px',
//       position: 'fixed',
//       left: 0,
//       top: 0,
//       overflowY: 'auto'
//     }}>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {sidebarLinks.map((link, index) => (
//           <li key={index} style={{ margin: '10px 0' }}>
//             <NavLink 
//               to={link.url} 
//               style={{ color: 'white', textDecoration: 'none' }} 
//               activeStyle={{ fontWeight: 'bold' }}
//             >
//               {link.name}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;



