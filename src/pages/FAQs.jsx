import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_FAQS } from '../data/mockData';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Truck, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FAQs = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [openIds, setOpenIds] = useState(['faq-1', 'faq-2']);

  const categories = ['All', 'Purity & Quality', 'Orders & Shipping', 'Wholesale & B2B', 'Storage & Health'];

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = INITIAL_FAQS.filter((f) => {
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    const matchesSearch = 
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B87A0B]">
          Connoisseur Knowledge Base
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#3D2206]">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm">
          Everything you need to know about raw nectar biology, crystallization, cold-chain shipping, and NMR purity verification.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions (e.g. crystallization, NMR test, shelf life)..."
          className="w-full bg-white border border-[#F5E5B5] shadow-xs rounded-2xl pl-11 pr-4 py-3.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#D89816]"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCat === cat
                ? 'bg-[#D89816] text-stone-950 shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-[#F5E5B5]/60 hover:text-stone-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Items */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#F5E5B5] shadow-xs overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif-luxury font-bold text-base sm:text-lg text-[#3D2206] hover:text-[#B87A0B] transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100 animate-fade-in">
                  <p>{item.answer}</p>
                  <div className="mt-3 text-[10px] uppercase font-bold text-amber-800 bg-[#FAF4E4] inline-block px-2.5 py-1 rounded-md">
                    Category: {item.category}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help card */}
      <div className="bg-[#FAF4E4] border border-[#F5E5B5] p-8 rounded-3xl text-center max-w-2xl mx-auto space-y-3">
        <h3 className="font-serif-luxury font-bold text-xl text-[#3D2206]">
          Still have an unanswered question?
        </h3>
        <p className="text-xs text-stone-600">
          Our apiary concierge is available Monday through Friday to discuss custom blends, private label reserves, and floral origins.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-xs"
        >
          <span>Contact Apiary Concierge</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
