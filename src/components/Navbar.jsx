import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Nombre que lleva al inicio */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Mi Portafolio
        </Link>

        {/* Enlaces y Botón */}
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 font-medium">
            CV
          </Link>
          <Link to="/posts" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 font-medium">
            Blog
          </Link>
          
          {/* Botón de Modo Oscuro */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition shadow-sm"
            title="Cambiar tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}