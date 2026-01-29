import { useEffect, useState } from 'react';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [cvData, setCvData] = useState({ nombre: '', titulo: '', resumen: '' });
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', content: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const resCV = await client.get('/experiencia');
      setCvData(resCV.data);
      const resPosts = await client.get('/posts');
      setPosts(resPosts.data);
    } catch (error) {
      console.error("Error cargando datos", error);
    }
  };

  const handleUpdateCV = async (e) => {
    e.preventDefault();
    await client.patch('/experiencia', cvData);
    alert('CV Actualizado!');
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (editingPost) {
      await client.put(`/posts/${editingPost.id}`, { ...editingPost, ...formData });
      alert('Post editado');
    } else {
      const newPost = { id: Date.now().toString(), ...formData };
      await client.post('/posts', newPost);
      alert('Post creado');
    }
    setEditingPost(null);
    setFormData({ title: '', date: '', content: '' });
    loadData();
  };

  const handleDeletePost = async (id) => {
    if(!confirm("¿Seguro que quieres borrar este post?")) return;
    await client.delete(`/posts/${id}`);
    loadData();
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, date: post.date, content: post.content });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  // Clases comunes para inputs en modo oscuro/claro
  const inputClass = "w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de Administración</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">Cerrar Sesión</button>
      </div>

      {/* SECCIÓN 1: EDITAR CV */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Editar Perfil (CV)</h2>
        <form onSubmit={handleUpdateCV} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
            <input value={cvData.nombre} onChange={e => setCvData({...cvData, nombre: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Título Profesional</label>
            <input value={cvData.titulo} onChange={e => setCvData({...cvData, titulo: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Resumen Profesional</label>
            <textarea value={cvData.resumen} onChange={e => setCvData({...cvData, resumen: e.target.value})} rows="3" className={inputClass} />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">Guardar Cambios CV</button>
        </form>
      </section>

      {/* SECCIÓN 2: GESTIÓN DE BLOG */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">{editingPost ? 'Editar Post' : 'Crear Nuevo Post'}</h2>
        
        {/* Formulario de Blog */}
        <form onSubmit={handleSavePost} className="space-y-4 mb-8 bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
          <input 
            placeholder="Título del Post" 
            className={inputClass}
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required
          />
          <input 
            type="date" 
            className={inputClass}
            value={formData.date} 
            onChange={e => setFormData({...formData, date: e.target.value})} 
            required
          />
          <textarea 
            placeholder="Contenido (acepta HTML simple)" 
            className={`${inputClass} h-32 font-mono text-sm`}
            value={formData.content} 
            onChange={e => setFormData({...formData, content: e.target.value})} 
            required
          />
          
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">{editingPost ? 'Actualizar Post' : 'Publicar Post'}</button>
            {editingPost && (
              <button type="button" onClick={() => {setEditingPost(null); setFormData({title:'',date:'',content:''})}} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors">Cancelar</button>
            )}
          </div>
        </form>

        {/* Lista de Posts existentes */}
        <h3 className="font-bold mb-2 text-gray-700 dark:text-gray-300">Posts Actuales ({posts.length})</h3>
        <div className="space-y-2">
          {posts.map(post => (
            <div key={post.id} className="flex justify-between items-center border p-2 rounded bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <span className="text-gray-900 dark:text-white">{post.title}</span>
              <div className="space-x-2">
                <button onClick={() => startEdit(post)} className="text-blue-500 hover:text-blue-400 underline text-sm">Editar</button>
                <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-400 underline text-sm">Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}