/**
 * Convierte un ArrayBuffer o Uint8Array en una cadena Base64.
 *
 * @param {ArrayBuffer | Uint8Array} buffer - El buffer de datos binarios a convertir.
 * @returns {string} La cadena en formato Base64.
 * @throws {Error} Si el argumento no es un ArrayBuffer o Uint8Array.
 */
const convertBufferToBase64 = (buffer) => {
    // Verifica si el buffer es un ArrayBuffer o Uint8Array
    if (!(buffer instanceof ArrayBuffer || buffer instanceof Uint8Array)) {
        throw new Error('El argumento debe ser un ArrayBuffer o Uint8Array');
    }

    // Convierte el buffer a un Uint8Array
    const bytes = new Uint8Array(buffer);
    
    // Crea una cadena binaria a partir de los bytes
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    // Convierte la cadena binaria a Base64
    return btoa(binary);  // `btoa` está disponible en el entorno del navegador
};

export default convertBufferToBase64;

