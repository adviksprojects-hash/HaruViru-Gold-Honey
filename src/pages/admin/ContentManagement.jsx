import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Sparkles, 
  Eye, 
  X,
  Upload
} from 'lucide-react';

export const ContentManagement = () => {
  const { recipes, addRecipe, updateRecipe, deleteRecipe, showToast } = useApp();
  
  const [search, setSearch] = useState('');
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Gourmet Recipes',
    author: 'HaruViru Master Beekeeper',
    readTime: '5 min read',
    summary: '',
    honeyTypeUsed: 'Imperial Sidr Gold Mountain Honey',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    prepTime: '10 mins',
    cookTime: '5 mins',
    servings: '2 servings',
    ingredients: ['2 tbsp HaruViru Raw Honey', '1 cup organic oat milk', '1/2 tsp ground turmeric'],
    instructions: ['Warm the milk gently', 'Whisk in raw honey off the flame to protect living enzymes', 'Serve warm in ceramic mug'],
    content: 'Raw honey retains active invertase enzymes that degrade when exposed to boiling heat...',
    status: 'published'
  });

  const filtered = recipes.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Gourmet Recipes',
      author: 'HaruViru Culinary Director',
      readTime: '5 min read',
      summary: '',
      honeyTypeUsed: 'Imperial Sidr Gold Mountain Honey',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
      prepTime: '10 mins',
      cookTime: '5 mins',
      servings: '2 servings',
      ingredients: ['2 tbsp HaruViru Raw Honey', '1 cup organic oat milk', '1/2 tsp turmeric'],
      instructions: ['Simmer gently', 'Stir honey off the heat', 'Garnish and serve'],
      content: '',
      status: 'published'
    });
    setShowEditorModal(true);
  };

  const handleOpenEdit = (rec) => {
    setEditingArticle(rec);
    setFormData(rec);
    setShowEditorModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        setFormData((prev) => ({ ...prev, image: dataUrl }));
        showToast('Article image uploaded from system successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingArticle) {
      updateRecipe(editingArticle.id, formData);
    } else {
      addRecipe(formData);
    }

    setShowEditorModal(false);
  };

  const toggleStatus = (rec) => {
    const nextStatus = rec.status === 'published' ? 'draft' : 'published';
    updateRecipe(rec.id, { status: nextStatus });
    showToast(`"${rec.title}" is now ${nextStatus}.`, 'info');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            Publishing & Storytelling
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Content Management (Blog/Recipe Editor)
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Author and publish culinary honey recipes, Ayurvedic wellness tonics, and beekeeping chronicles.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article / Recipe</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, author, category..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>
        <span className="text-xs text-stone-500 font-semibold">{filtered.length} Articles</span>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Article / Recipe Title</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Author</th>
                <th className="py-3 px-3">Honey Variety</th>
                <th className="py-3 px-3 text-center">Engagement</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF9F5] transition-colors">
                  
                  {/* Title & Image */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-stone-900 block truncate max-w-xs">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {item.date} • {item.readTime}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {item.category}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="py-3.5 px-3 text-stone-700 font-medium">
                    {item.author}
                  </td>

                  {/* Honey */}
                  <td className="py-3.5 px-3 text-stone-600 truncate max-w-[150px]">
                    {item.honeyTypeUsed || 'All Varieties'}
                  </td>

                  {/* Likes */}
                  <td className="py-3.5 px-3 text-center font-bold text-rose-600">
                    ♥ {item.likesCount}
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => toggleStatus(item)}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                        item.status === 'published'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-stone-100 text-stone-600 border-stone-300'
                      }`}
                    >
                      {item.status === 'published' ? '● Published' : '○ Draft'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete article "${item.title}"?`)) {
                            deleteRecipe(item.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-luxury font-bold text-xl text-[#3D2206]">
                {editingArticle ? `Edit: ${editingArticle.title}` : 'Compose New Honey Article or Recipe'}
              </h3>
              <button
                onClick={() => setShowEditorModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Artisanal Goat Cheese & Sidr Honey Crostini"
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800"
                  >
                    <option value="Gourmet Recipes">Gourmet Recipes</option>
                    <option value="Immunity & Ayurveda">Immunity & Ayurveda</option>
                    <option value="Skin & Wellness">Skin & Wellness</option>
                    <option value="Beekeeping Chronicles">Beekeeping Chronicles</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Summary (1-2 sentences)</label>
                <textarea
                  rows={2}
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="A restorative elixir blending creamy oat milk, fresh turmeric root, and raw Sidr honey..."
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl p-3 text-stone-800"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-stone-700 block">Article / Recipe Cover Image</label>
                
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {formData.image && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 bg-stone-100 shadow-xs">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 bg-[#FAF6EE] hover:bg-[#F5EDD8] border border-amber-300 text-[#3D2206] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95">
                        <Upload className="w-4 h-4 text-[#D89816]" />
                        <span>Upload Image from System</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {formData.image && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="text-[11px] text-red-600 hover:underline font-semibold"
                        >
                          Clear Image
                        </button>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block mb-1">Or paste online image URL:</span>
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Detailed Content</label>
                <textarea
                  rows={5}
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full culinary method or beekeeping chronicle narrative here..."
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl p-3 text-stone-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditorModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-6 py-2 rounded-xl shadow-xs"
                >
                  {editingArticle ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
