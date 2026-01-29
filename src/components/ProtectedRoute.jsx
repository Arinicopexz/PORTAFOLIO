import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Verificamos si existe la "llave" en el navegador
  const isAuth = localStorage.getItem('isAdmin') === 'true';

  if (!isAuth) {
    // Si no es admin, lo mandamos al login
    return <Navigate to="/login" replace />;
  }

  return children;
}