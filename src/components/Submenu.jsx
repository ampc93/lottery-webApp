import React from 'react';

const Submenu = () => {
  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.5)', // Fondo transparente
        color: 'white',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinea las opciones hacia la izquierda
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
        height: '40px', // Altura constante
        position: 'relative',
        overflowX: 'auto', // Scroll horizontal cuando las opciones excedan
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '10px', // Espacio entre las opciones
        }}
      >
        {/* Opción 1 */}
        <div
          style={{
            backgroundColor: '#444',
            padding: '8px 20px',
            borderRadius: '20px', // Opciones ovaladas
            whiteSpace: 'nowrap', // Evitar que el texto se parta
            cursor: 'pointer',
          }}
        >
          Opción 1
        </div>

        {/* Opción 2 */}
        <div
          style={{
            backgroundColor: '#444',
            padding: '8px 20px',
            borderRadius: '20px', // Opciones ovaladas
            whiteSpace: 'nowrap', // Evitar que el texto se parta
            cursor: 'pointer',
          }}
        >
          Opción 2
        </div>

        {/* Opción 3 */}
        <div
          style={{
            backgroundColor: '#444',
            padding: '8px 20px',
            borderRadius: '20px', // Opciones ovaladas
            whiteSpace: 'nowrap', // Evitar que el texto se parta
            cursor: 'pointer',
          }}
        >
          Opción 3
        </div>

        {/* Opción 4 */}
        <div
          style={{
            backgroundColor: '#444',
            padding: '8px 20px',
            borderRadius: '20px', // Opciones ovaladas
            whiteSpace: 'nowrap', // Evitar que el texto se parta
            cursor: 'pointer',
          }}
        >
          Opción 4
        </div>

        {/* Opción 5 */}
        <div
          style={{
            backgroundColor: '#444',
            padding: '8px 20px',
            borderRadius: '20px', // Opciones ovaladas
            whiteSpace: 'nowrap', // Evitar que el texto se parta
            cursor: 'pointer',
          }}
        >
          Opción 5
        </div>

        {/* Opción 6 */}
        <div
          style={{
            backgroundColor: '#444',
            padding: '8px 20px',
            borderRadius: '20px', // Opciones ovaladas
            whiteSpace: 'nowrap', // Evitar que el texto se parta
            cursor: 'pointer',
          }}
        >
          Opción 6
        </div>
      </div>
    </div>
  );
};

export default Submenu;



