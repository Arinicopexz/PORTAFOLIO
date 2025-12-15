// Importamos StrictMode de React para detectar problemas potenciales en el desarrollo
import { StrictMode } from 'react'
// Importamos createRoot para renderizar la aplicación en el DOM
import { createRoot } from 'react-dom/client'
// Importamos los estilos globales
import './index.css'
// Importamos el componente principal de la aplicación
import App from './App.jsx'

// Creamos el root de React y renderizamos la aplicación en el elemento con id 'root'
createRoot(document.getElementById('root')).render(
  // Envolvemos la aplicación en StrictMode para activar verificaciones adicionales en desarrollo
  <StrictMode>
    <App />
  </StrictMode>,
)
