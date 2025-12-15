import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    // 1. Envolvemos todo con el Proveedor de Tema (Modo Oscuro)
    <ThemeProvider>
      {/* 2. Habilitamos el enrutamiento (Navegación sin recargar página) */}
      <BrowserRouter>
        
        {/* Contenedor principal que ocupa toda la pantalla */}
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          
          <Navbar />

          {/* Área principal donde cambian las páginas */}
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Ruta para la Hoja de Vida (Inicio) */}
              <Route path="/" element={<Home />} />
              
              {/* Ruta para el listado del Blog */}
              <Route path="/posts" element={<Blog />} />
              
              {/* Ruta dinámica para cada artículo individual */}
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </main>

          <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800 dark:text-gray-400">
            © 2025 Mi Portafolio Profesional - Construido con React & Tailwind
          </footer>

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;