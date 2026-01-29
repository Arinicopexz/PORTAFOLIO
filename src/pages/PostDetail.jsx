import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Agregamos useNavigate
import client from '../api/client';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    client.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        console.error(err);
        // Si el post no existe, avisamos y regresamos al blog
        alert("El artículo que buscas no existe.");
        navigate('/posts');
      });
  }, [id, navigate]);

  if (!post) return (
    <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
      <p className="animate-pulse">Cargando artículo...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in">
      <Link to="/posts" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center font-medium transition-colors">
        ← Volver al blog
      </Link>
      
      <article className="mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
            <span>📅 {post.date}</span>
          </div>
        </header>
        
        {/* Contenedor del contenido HTML con estilo de tarjeta */}
        <div 
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 leading-relaxed text-gray-800 dark:text-gray-200 prose-headings:font-bold prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2 prose-p:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}