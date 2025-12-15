import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Pedimos la lista completa de posts al servidor
    client.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Blog Técnico
      </h1>
      
      <div className="grid gap-6">
        {posts.map(post => (
          <article key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              <Link to={`/posts/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-mono">
              📅 {post.date}
            </p>
            <Link 
              to={`/posts/${post.id}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Leer artículo 
              <span className="ml-1">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}