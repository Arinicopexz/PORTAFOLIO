// Importamos funciones de React para crear contexto y manejar estado
import { createContext, useContext, useEffect, useState } from 'react';

// 1. Creamos el contexto (la "caja" que guardará el dato)
const ThemeContext = createContext();

// Proveedor del contexto de tema que envuelve la aplicación
export const ThemeProvider = ({ children }) => {
  // 2. Estado inicial: Buscamos en localStorage si ya había elegido un tema
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    // Si no, miramos la preferencia de su computadora
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 3. Efecto: Cada vez que 'theme' cambie, actualizamos el HTML y localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 4. Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5. Hook personalizado para usar esto fácil en otros archivos
export const useTheme = () => useContext(ThemeContext);
