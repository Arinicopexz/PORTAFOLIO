import axios from 'axios';

// Creamos una instancia de Axios con la dirección de tu servidor
const client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default client;