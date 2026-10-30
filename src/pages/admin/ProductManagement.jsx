import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  ShieldCheck, 
  Check, 
  X, 
  Sparkles,
  ArrowUpDown,
  Upload
} from 'lucide-react';

export const ProductManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct, updateStock, showToast } = useApp();
  
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New product form state
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: 'Wildflower',
    price: 38,
    originalPrice: 45,
    weight: '500g',
    stock: 50,
    lowStockThreshold: 15,
    rating: 4.9,
    reviewCount: 1,
    purityScore: 99.8,
    batchNumber: `HV-${Math.floor(100 + Math.random() * 900)}-2026`,
    harvestLocation: 'High Himalayan Alpine Forest (2,800m ASL)',
    moistureContent: '16.8%',
    tastingNotes: ['Wild Blossom', 'Amber Caramel'],
    description: 'Freshly harvested single-origin raw honey with pure enzymatic integrity and zero pasteurization.',
    benefits: ['100% Raw cold-extracted', 'Certified 0% added sugar'],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'],
    cogs: 14.5,
    sku: `HV-HONEY-${Math.floor(100 + Math.random() * 900)}`
  });

  const [tastingInput, setTastingInput] = useState('');

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
        setFormData((prev) => ({ 
          ...prev, 
          image: dataUrl,
          gallery: prev.gallery && prev.gallery.length > 0 ? [dataUrl, ...prev.gallery.slice(1)] : [dataUrl]
        }));
        showToast('Image uploaded from system successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const categories = ['All', 'Wildflower', 'Sidr', 'Acacia', 'Raw Comb', 'Infused', 'Himalayan White'];

  const filtered = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.batchNumber.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
    }

    setShowAddModal(false);
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setFormData(prod);
    setShowAddModal(true);
  };

  const openNewModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      tagline: '',
      category: 'Wildflower',
      price: 38,
      originalPrice: 45,
      weight: '500g',
      stock: 50,
      lowStockThreshold: 15,
      rating: 4.9,
      reviewCount: 1,
      purityScore: 99.8,
      batchNumber: `HV-${Math.floor(100 + Math.random() * 900)}-2026`,
      harvestLocation: 'High Himalayan Alpine Forest (2,800m ASL)',
      moistureContent: '16.8%',
      tastingNotes: ['Wild Blossom', 'Caramel'],
      description: 'Cold-extracted single-origin raw honey with pure enzymatic integrity.',
      benefits: ['100% Raw cold-extracted', 'Certified 0% added sugar'],
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'],
      cogs: 14.5,
      sku: `HV-HONEY-${Math.floor(100 + Math.random() * 900)}`
    });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            Catalog & Stockroom
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Honey Product Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Add new single-origin honey reserves, edit pricing, adjust live stock, and monitor low-stock thresholds.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Honey Reserve</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by SKU, Name, Batch..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-[#D89816] text-stone-950 font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Honey Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">SKU & Batch</th>
                <th className="py-3 px-3 text-right">COGS</th>
                <th className="py-3 px-3 text-right">Retail Price</th>
                <th className="py-3 px-4 text-center">In Stock</th>
                <th className="py-3 px-3 text-center">Purity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((prod) => {
                const isLowStock = prod.stock <= prod.lowStockThreshold;
                return (
                  <tr key={prod.id} className="hover:bg-[#FAF9F5] transition-colors">
                    
                    {/* Name & Photo */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt=""
                          className="w-11 h-11 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-stone-900 block truncate max-w-xs">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {prod.weight} • {prod.harvestLocation.split('(')[0]}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {prod.category}
                      </span>
                    </td>

                    {/* SKU & Batch */}
                    <td className="py-3 px-3 font-mono text-[11px] text-stone-600">
                      <div>{prod.sku}</div>
                      <div className="text-[10px] text-stone-400">{prod.batchNumber}</div>
                    </td>

                    {/* COGS */}
                    <td className="py-3 px-3 text-right font-medium text-stone-500">
                      ₹{prod.cogs?.toFixed(2) || '450.00'}
                    </td>

                    {/* Retail Price */}
                    <td className="py-3 px-3 text-right font-extrabold text-[#3D2206] text-sm">
                      ₹{prod.price.toFixed(2)}
                    </td>

                    {/* In Stock & Adjuster */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => updateStock(prod.id, prod.stock - 5)}
                          className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center"
                          title="Deduct 5"
                        >
                          -
                        </button>
                        <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded-md ${
                          isLowStock 
                            ? 'bg-red-50 text-red-700 border border-red-300' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {prod.stock}
                        </span>
                        <button
                          onClick={() => updateStock(prod.id, prod.stock + 10)}
                          className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center"
                          title="Add 10"
                        >
                          +
                        </button>
                      </div>
                      {isLowStock && (
                        <span className="block text-[9px] font-bold text-red-600 mt-0.5">
                          Low Stock Alert!
                        </span>
                      )}
                    </td>

                    {/* NMR Purity */}
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {prod.purityScore}% NMR
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${prod.name}?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif-luxury font-bold text-xl text-[#3D2206]">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Honey Harvest'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-stone-700 block mb-1">Honey Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Kashmir Acacia Blossom Raw Honey"
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  >
                    <option value="Sidr">Sidr</option>
                    <option value="Wildflower">Wildflower</option>
                    <option value="Acacia">Acacia</option>
                    <option value="Himalayan White">Himalayan White</option>
                    <option value="Raw Comb">Raw Comb</option>
                    <option value="Infused">Infused</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Jar Format / Weight</label>
                  <input
                    type="text"
                    value={formData.weight || '500g'}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="500g, 1kg, 400g"
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Selling Price (₹ INR)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Cost of Goods (COGS - ₹ INR)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cogs || 0}
                    onChange={(e) => setFormData({ ...formData, cogs: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Initial Stock (Units)</label>
                  <input
                    type="number"
                    value={formData.stock || 0}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Low Stock Warning Threshold</label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold || 10}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 10 })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Batch Code</label>
                  <input
                    type="text"
                    value={formData.batchNumber || ''}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">NMR Purity Score (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.purityScore || 99.8}
                    onChange={(e) => setFormData({ ...formData, purityScore: parseFloat(e.target.value) || 99.8 })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="font-semibold text-stone-700 block">Product Image</label>
                  
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

                <div className="sm:col-span-2">
                  <label className="font-semibold text-stone-700 block mb-1">Harvest Location Origin</label>
                  <input
                    type="text"
                    value={formData.harvestLocation || ''}
                    onChange={(e) => setFormData({ ...formData, harvestLocation: e.target.value })}
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-6 py-2 rounded-xl shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Create Honey SKU'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
