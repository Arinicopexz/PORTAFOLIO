import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';

// --- NUEVAS IMPORTACIONES ---
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // 1. Envolvemos todo con el Proveedor de Tema (Modo Oscuro)
    <ThemeProvider>
      {/* 2. Habilitamos el enrutamiento */}
      <BrowserRouter>
        
        {/* Contenedor principal */}
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          
          <Navbar />

          {/* Área principal */}
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Blog />} />
              <Route path="/posts/:id" element={<PostDetail />} />

              {/* --- NUEVAS RUTAS DE ADMINISTRACIÓN --- */}
              
              {/* Ruta de Login (Pública) */}
              <Route path="/login" element={<Login />} />
              
              {/* Ruta Protegida: Solo se puede entrar si estás logueado */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />

            </Routes>
          </main>

          <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800 dark:text-gray-400">
            © 2026 Mi Portafolio Profesional - Construido con React & Tailwind
          </footer>

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;