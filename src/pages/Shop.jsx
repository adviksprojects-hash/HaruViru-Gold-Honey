import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Shop = () => {
  const { products, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWeight, setSelectedWeight] = useState('All');
  const [sortBy, setSortBy] = useState('bestseller');

  const categories = ['All', 'Sidr', 'Wildflower', 'Acacia', 'Himalayan White', 'Raw Comb', 'Infused'];
  const weightOptions = ['All', '500g', '1kg', '400g', '250g'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tastingNotes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesWeight = selectedWeight === 'All' || p.weight.includes(selectedWeight);

        return matchesSearch && matchesCategory && matchesWeight;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'purity') return b.purityScore - a.purityScore;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, selectedWeight, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-8 sm:p-12 border border-amber-200/80 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="badge-pill-soft px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
            Artisanal Reserve Catalog
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-black text-stone-900">
            Rare Single-Origin Honey Collection
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Every jar is traceable to its high-altitude harvest coordinates, cold-extracted without thermal pasteurization, and sealed in heavy hexagonal glass to retain active royal enzymes.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-stone-50/70 p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flower, notes (e.g. Sidr, Caramel)..."
              className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-amber-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-stone-500 font-bold whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-hidden focus:border-amber-500 shadow-xs cursor-pointer"
            >
              <option value="bestseller">Featured & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="purity">NMR Purity Score</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Clean Pill buttons) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60">
          <span className="text-xs font-bold text-stone-400 mr-1">Categories:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'gradient-btn-honey text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-200 p-8 space-y-4">
          <p className="text-lg font-bold text-stone-700">No honey reserves match your filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedWeight('All'); setSearchQuery(''); }}
            className="gradient-btn-honey text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card-clean flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden bg-stone-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {product.isBestseller && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    ★ Bestseller
                  </span>
                )}

                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-stone-800 px-2.5 py-0.5 rounded-full border border-stone-200 shadow-xs">
                  {product.weight}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-orange-700 font-extrabold uppercase tracking-wider text-[10px] bg-orange-50 px-2 py-0.5 rounded-md">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-stone-400 font-normal">({product.reviewCount})</span>
                    </div>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif-luxury font-bold text-base text-stone-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.tastingNotes.slice(0, 2).map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-100 text-stone-700 font-medium px-2 py-0.5 rounded-md"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-stone-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="gradient-btn-honey text-white p-2.5 rounded-full shadow-md active:scale-95"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
