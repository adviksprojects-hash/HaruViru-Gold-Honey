import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Boxes, 
  Search, 
  Plus, 
  AlertTriangle, 
  ShieldCheck, 
  Droplet, 
  Clock, 
  MapPin, 
  Edit3, 
  X
} from 'lucide-react';

export const PurchaseRawMaterials = () => {
  const { rawMaterials, updateRawMaterialStock, addRawMaterial, showToast } = useApp();
  
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New raw material form
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Raw Honey Drums');
  const [supplier, setSupplier] = useState('');
  const [currentStock, setCurrentStock] = useState(1000);
  const [unit, setUnit] = useState('kg');
  const [minThreshold, setMinThreshold] = useState(300);
  const [unitCost, setUnitCost] = useState(12.5);
  const [location, setLocation] = useState('Silo Bay A');

  const categories = ['All', 'Raw Honey Drums', 'Glass Jars', 'Gold Metal Lids', 'Luxury Boxes'];

  const filtered = rawMaterials.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase()) ||
      m.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || m.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !code) return;

    addRawMaterial({
      code: code.trim().toUpperCase(),
      name,
      category,
      supplier,
      currentStock,
      unit,
      minThreshold,
      unitCost,
      status: currentStock <= minThreshold ? 'Low Stock' : 'Optimal',
      location,
      harvestDate: category === 'Raw Honey Drums' ? '2026-10-01' : undefined,
      purityScore: category === 'Raw Honey Drums' ? '99.8% NMR' : undefined,
      moistureLevel: category === 'Raw Honey Drums' ? '16.8%' : undefined
    });

    setShowAddModal(false);
    setCode('');
    setName('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600 block mb-1">
            Raw Inventory Control
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Product Management (Raw Materials, Jars, & Batch Tracking)
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Log incoming food-grade honey drums, Italian hexagonal jars, gold stamped caps, and lab batch certificates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Inbound Batch</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search material code, drum, jar type..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
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

      {/* Raw Materials Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EE] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Raw Material / Component</th>
                <th className="py-3 px-3">Batch Code</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Supplier Origin</th>
                <th className="py-3 px-3 text-right">Unit Cost</th>
                <th className="py-3 px-4 text-center">Current Stock</th>
                <th className="py-3 px-3 text-center">Quality / NMR</th>
                <th className="py-3 px-3">Storage Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((mat) => {
                const isLow = mat.currentStock <= mat.minThreshold;
                return (
                  <tr key={mat.id} className="hover:bg-[#FAF9F5] transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-900 block">{mat.name}</span>
                      <span className="text-[10px] text-stone-400">Min threshold: {mat.minThreshold} {mat.unit}</span>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-bold text-amber-900 text-[11px]">
                      {mat.code}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {mat.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-stone-700">
                      {mat.supplier}
                    </td>

                    <td className="py-3.5 px-3 text-right font-extrabold text-[#3D2206]">
                      ₹{mat.unitCost.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => updateRawMaterialStock(mat.id, mat.currentStock - 50)}
                          className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center"
                          title="Deduct 50"
                        >
                          -
                        </button>
                        <span className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-md ${
                          isLow ? 'bg-red-50 text-red-700 border border-red-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {mat.currentStock} {mat.unit}
                        </span>
                        <button
                          onClick={() => updateRawMaterialStock(mat.id, mat.currentStock + 100)}
                          className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center"
                          title="Add 100"
                        >
                          +
                        </button>
                      </div>
                      {isLow && (
                        <span className="block text-[9px] font-bold text-red-600 mt-0.5">
                          Low Stock Alert!
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      {mat.purityScore ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          {mat.purityScore}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px]">QC Inspected</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-stone-600 text-[11px]">
                      {mat.location}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Raw Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Log Inbound Raw Material / Jars Batch
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Batch Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. RAW-SIDR-2026-X"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  >
                    <option value="Raw Honey Drums">Raw Honey Drums</option>
                    <option value="Glass Jars">Glass Jars</option>
                    <option value="Gold Metal Lids">Gold Metal Lids</option>
                    <option value="Tamper Seals">Tamper Seals</option>
                    <option value="Luxury Boxes">Luxury Boxes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Component / Honey Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. High-Altitude Kashmir White Honey Drum (300kg)"
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Supplier Name</label>
                  <input
                    type="text"
                    required
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    placeholder="e.g. Veritas Italian Glassworks"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Warehouse Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Rack B3 or Silo Bay Alpha"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Quantity</label>
                  <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Unit</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="kg or units"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Unit Cost (₹)</label>
                  <input
                    type="number"
                    step="1"
                    value={unitCost}
                    onChange={(e) => setUnitCost(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] text-stone-950 font-bold px-5 py-2 rounded-xl"
                >
                  Confirm Inbound Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
