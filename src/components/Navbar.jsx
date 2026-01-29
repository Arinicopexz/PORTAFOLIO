import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            MiPortafolio
          </Link>

          {/* MENÚ DE ESCRITORIO (Oculto en móvil) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              CV
            </Link>
            <Link to="/posts" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Blog
            </Link>
            <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Admin
            </Link>
            
            {/* Botón Modo Oscuro */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              aria-label="Cambiar modo oscuro/claro"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          {/* BOTÓN HAMBURGUESA (Solo visible en móvil) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme} 
              className="mr-4 p-2 text-gray-800 dark:text-yellow-300"
              aria-label="Cambiar modo oscuro"
            >
               {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-white focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {/* Icono de hamburguesa o X según estado */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 animate-fade-in">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Hoja de Vida
            </Link>
            <Link 
              to="/posts" 
              onClick={() => setIsOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Blog Técnico
            </Link>
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Administración
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}