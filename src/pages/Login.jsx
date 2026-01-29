import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client'; // Usamos nuestra API real

export default function Login() {
  const [username, setUsername] = useState(''); // Añadimos campo usuario
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      // Petición REAL al backend
      const res = await client.post('/login', { username, password });
      
      // Si funciona, guardamos el token y la marca de admin
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', 'true'); // Mantenemos esto para tu ProtectedRoute
      
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Acceso Admin</h1>
        
        {/* Campo Usuario */}
        <label htmlFor="user" className="sr-only">Usuario</label>
        <input 
          id="user"
          type="text" 
          placeholder="Usuario"
          className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Campo Contraseña */}
        <label htmlFor="password" className="sr-only">Contraseña</label>
        <input 
          id="password"
          type="password" 
          placeholder="Contraseña"
          className="border p-2 w-full mb-4 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && <p className="text-red-500 text-sm mb-2">Credenciales incorrectas</p>}
        
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
}