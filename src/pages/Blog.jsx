import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  User, 
  Calendar, 
  Heart, 
  Sparkles, 
  Utensils, 
  Check, 
  ArrowRight,
  BookOpen,
  X
} from 'lucide-react';

export const Blog = () => {
  const { recipes } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [likes, setLikes] = useState({});

  const categories = [
    'All',
    'Gourmet Recipes',
    'Immunity & Ayurveda',
    'Skin & Wellness',
    'Beekeeping Chronicles'
  ];

  const publishedRecipes = recipes.filter(r => r.status === 'published');

  const filtered = selectedCategory === 'All' 
    ? publishedRecipes 
    : publishedRecipes.filter(r => r.category === selectedCategory);

  const handleLike = (id, current) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? current) + 1
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-[#241508] text-white rounded-3xl p-8 sm:p-12 border border-[#D89816]/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E4B345]">
            Gastronomy & Living Wellness
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#FFFDF7]">
            Honey Recipes & Apiculture Chronicles
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Culinary techniques from master chefs, ancient Ayurvedic restorative elixirs, and field notes directly from our Himalayan apiary sanctuaries.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-[#D89816] text-stone-950 shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-[#F5E5B5]/60 hover:text-stone-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => {
          const currentLikes = likes[item.id] ?? item.likesCount;
          return (
            <article
              key={item.id}
              className="bg-white rounded-3xl border border-[#F5E5B5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-video overflow-hidden bg-[#FFFDF7]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1C120A]/90 backdrop-blur-xs text-[#F3D279] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#D89816]/30">
                  {item.category}
                </span>
                {item.prepTime && (
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-stone-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{item.prepTime} prep</span>
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 mb-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206] group-hover:text-[#B87A0B] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.honeyTypeUsed && (
                    <div className="mt-3 p-2 bg-[#FAF4E4] rounded-xl border border-[#F5E5B5] text-[11px] text-[#643B08] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate"><b>Pairs with:</b> {item.honeyTypeUsed}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(item)}
                    className="text-xs font-bold text-[#8F5808] hover:text-[#D89816] flex items-center gap-1.5"
                  >
                    <span>Read Recipe / Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleLike(item.id, item.likesCount)}
                    className="flex items-center gap-1 text-xs text-stone-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-rose-500/10 text-rose-500" />
                    <span>{currentLikes}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Full Article / Recipe Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 border border-[#F5E5B5] shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B87A0B] bg-[#F5E5B5]/60 px-3 py-1 rounded-full">
                  {activeArticle.category}
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206] mt-3">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-2">
                  <span>By {activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ingredients & Prep details */}
            {activeArticle.ingredients && activeArticle.ingredients.length > 0 && (
              <div className="bg-[#FAF4E4] p-6 rounded-2xl border border-[#F5E5B5] space-y-4">
                <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#643B08]">
                  {activeArticle.prepTime && <span>⏱ Prep: {activeArticle.prepTime}</span>}
                  {activeArticle.cookTime && <span>🔥 Cook: {activeArticle.cookTime}</span>}
                  {activeArticle.servings && <span>🍽 Servings: {activeArticle.servings}</span>}
                  <span>🍯 Pairing: {activeArticle.honeyTypeUsed}</span>
                </div>

                <div>
                  <h4 className="font-serif-luxury font-bold text-base text-[#3D2206] mb-2">
                    Ingredients
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                    {activeArticle.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Instructions */}
            {activeArticle.instructions && activeArticle.instructions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                  Step-by-Step Culinary Method
                </h4>
                <div className="space-y-3">
                  {activeArticle.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                      <span className="w-6 h-6 rounded-full bg-[#D89816] text-stone-950 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="flex-1 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article Prose */}
            <div className="prose text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100 pt-4">
              <p>{activeArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-[#D89816] text-stone-950 text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
