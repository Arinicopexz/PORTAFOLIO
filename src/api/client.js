// Importamos la librería Axios para hacer peticiones HTTP
import axios from 'axios';

// Creamos una instancia de Axios con la dirección de tu servidor
const client = axios.create({
  // Configuramos la URL base del servidor
  baseURL: 'http://localhost:3000',
  headers: {
    // Establecemos el tipo de contenido por defecto para las peticiones
    'Content-Type': 'application/json'
  }
});

// Exportamos la instancia configurada para usarla en otros archivos
export default client;
