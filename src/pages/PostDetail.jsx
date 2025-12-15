import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../api/client';

export default function PostDetail() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Pedimos solo el post específico
    client.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="text-center mt-20">Cargando artículo...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/posts" className="text-blue-500 hover:underline mb-6 inline-block font-medium">
        ← Volver al blog
      </Link>
      
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 border-b pb-4 dark:border-gray-700">
          Publicado el {post.date}
        </p>
        
        {/* Contenedor del contenido HTML */}
        <div 
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm leading-relaxed text-gray-800 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}