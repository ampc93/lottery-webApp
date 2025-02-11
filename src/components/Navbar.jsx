import React from 'react';

const Navbar = ({ collapsed }) => {
  return (
    <div
      style={{
        background: '#222',
        color: 'white',
        padding: collapsed ? '5px 16px' : '10px 16px', // Ajustar padding según el estado
        height: collapsed ? '40px' : '50px', // Ajustar altura según el estado
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        transition: 'height 0.3s ease-in-out, padding 0.3s ease-in-out', // Transición suave para el cambio
      }}
    >
      <span>Navbar</span>
    </div>
  );
};

export default Navbar;



// import React from 'react';
// import { CommandBar } from '@fluentui/react';

// const Navbar = () => {
//   const items = [
//     {
//       key: 'profile',
//       text: 'Perfil',
//       iconProps: { iconName: 'Contact' },
//       onClick: () => alert('Perfil')
//     }
//   ];

//   return (
//     <CommandBar
//       items={items}
//       styles={{ root: { padding: '10px', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' } }}
//     />
//   );
// };

// export default Navbar;



// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-neutral-dark text-neutral-light px-6 py-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <NavLink to="/" className="hover:text-primary transition">
//           Home
//         </NavLink>
//         <NavLink to="/roles" className="hover:text-primary transition">
//           Roles
//         </NavLink>
//         <NavLink to="/permission" className="hover:text-primary transition">
//           Permisos
//         </NavLink>
//         <NavLink to="/PermissionManager" className="hover:text-primary transition">
//           Asignacion de Permisos
//         </NavLink>
//         <NavLink to="/users" className="hover:text-primary transition">
//           Gestion de Usuarios
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;