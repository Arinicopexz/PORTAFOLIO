import { useEffect, useState } from 'react';
import client from '../api/client';

export default function Home() {
  const [cv, setCv] = useState(null);

  useEffect(() => {
    client.get('/experiencia')
      .then(res => {
        setCv(res.data);
      })
      .catch(err => console.error("Error cargando CV:", err));
  }, []);

  if (!cv) return <div className="text-center mt-20 text-xl">Cargando perfil...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 animate-fade-in">
      
      {/* Encabezado con Datos Básicos */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">{cv.nombre}</h1>
        <h2 className="text-2xl text-blue-600 dark:text-blue-400 font-medium">{cv.titulo}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{cv.resumen}</p>
        
        {/* --- NUEVO: SECCIÓN DE CONTACTO RÁPIDO (Aquí lo agregué) --- */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
           {cv.contacto && cv.contacto.map((c, index) => (
             <div key={index} className="flex gap-4">
                <span>📍 {c.ubicacion}</span>
                <a href={`mailto:${c.email}`} className="hover:text-blue-500 underline">✉️ {c.email}</a>
                <a href={`https://${c.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 underline">🔗 LinkedIn</a>
                <a href={`https://${c.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 underline">🐙 GitHub</a>
             </div>
           ))}
        </div>
      </header>

      {/* Habilidades */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold border-b-2 border-blue-500 mb-4 pb-2 inline-block">Habilidades</h3>
        <div className="flex flex-wrap gap-2">
          {cv.habilidades.map(skill => (
            <span key={skill} className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold dark:bg-blue-900/30 dark:text-blue-200 border border-blue-100 dark:border-blue-800">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experiencia */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Experiencia Laboral</h3>
        <div className="space-y-6">
          {cv.historial.map(exp => (
            <article key={exp.id} className="relative pl-8 border-l-4 border-blue-200 dark:border-blue-900">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h4 className="font-bold text-xl text-gray-900 dark:text-white">{exp.rol}</h4>
                <span className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{exp.periodo}</span>
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{exp.empresa}</p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{exp.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Estudios */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Formación Académica</h3>
        {cv.estudios.map(est => (
          <div key={est.id} className="mb-2">
            <p className="font-bold text-lg">{est.titulo}</p>
            <p className="text-gray-600 dark:text-gray-400">{est.institucion} | <span className="text-blue-500">{est.fecha}</span></p>
          </div>
        ))}
      </section>
    </div>
  );
}