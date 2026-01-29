# Portafolio Profesional Full Stack (MERN)

Este repositorio contiene el código fuente de mi portafolio profesional, desarrollado como una aplicación web Full Stack para demostrar competencias en desarrollo moderno.

## 🚀 Enlaces de Despliegue
- **Frontend:** Ejecución local en `http://localhost:5173`
- **Backend:** Ejecución local en `http://localhost:3000`

## 🛠 Tecnologías y Justificación

Para este proyecto elegí el stack **MERN** (MongoDB, Express, React, Node.js) por las siguientes razones técnicas:

### Backend: Node.js & Express
- **Unificación del Lenguaje:** Utilizar JavaScript tanto en cliente como en servidor reduce la fricción de cambio de contexto y permite compartir tipos y utilidades.
- **Escalabilidad:** El modelo de I/O no bloqueante de Node.js es ideal para manejar múltiples peticiones concurrentes en una API REST.

### Base de Datos: MongoDB (Atlas)
- **Flexibilidad de Esquema:** A diferencia de SQL (PostgreSQL), MongoDB permite almacenar documentos con estructuras variables. Esto fue crucial para la sección de "Experiencia" y "Proyectos", donde los atributos pueden variar sin necesidad de migraciones complejas.
- **Formato JSON Nativo:** La integración con el frontend es directa, eliminando la necesidad de ORMs pesados para transformar datos.

### Frontend: React + Vite
- **Componentización:** Permite reutilizar elementos de UI (como las tarjetas de los posts).
- **Gestión de Estado:** Uso de Hooks (`useState`, `useEffect`) para manejar la carga de datos asíncrona desde la API.

---

## ⚙️ Instrucciones de Ejecución Local

Sigue estos pasos para clonar y correr el proyecto en tu máquina:

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB Atlas URI (o instancia local)

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd portfolio-react