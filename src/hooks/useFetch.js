import { useState, useEffect } from 'react';
import client from '../api/client';

/**
 * Custom Hook para realizar peticiones GET a la API.
 * Gestiona automáticamente el estado de carga y errores.
 * * @param {string} url - El endpoint al que se hará la petición (ej: '/posts')
 * @returns {Object} { data, loading, error }
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reiniciamos estados al cambiar la URL
    setLoading(true);
    setError(null);

    client.get(url)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error("Error en useFetch:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}