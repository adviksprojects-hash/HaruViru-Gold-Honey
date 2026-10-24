import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import honeyHeroBg from '../assets/honey-hero-clean.jpg';
import { AnimatedHoneyStream } from '../components/common/AnimatedHoneyStream';
import { AnimatedBees } from '../components/common/AnimatedBees';
import { 
  Sparkles, 
  Crown, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Check, 
  Leaf, 
  Droplet, 
  ShoppingBag, 
  Award,
  ChevronRight,
  Flame,
  Heart,
  Truck,
  Layers,
  Sparkle
} from 'lucide-react';

export const Home = () => {
  const { products, addToCart } = useApp();
  const [selectedPairingTab, setSelectedPairingTab] = useState('wellness');

  const featuredProducts = products.slice(0, 4);

  const pairingContent = {
    wellness: {
      title: 'Ayurvedic Golden Milk & Immunity Tonics',
      description: 'Stir a golden spoonful of raw Sidr or Turmeric-Infused honey into lukewarm milk with black pepper. Unpasteurized live enzymes coat the digestive lining and stimulate vitality.',
      honey: 'Imperial Sidr Gold Mountain Honey',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    },
    cheese: {
      title: 'Aged Parmigiano-Reggiano, Truffles & Raw Honeycomb',
      description: 'The natural crystallization and beeswax texture of pure comb cuts through the salty crystalline crunch of aged hard cheeses and creamy French chèvre.',
      honey: 'Raw Hexagonal Honeycomb Master Reserve',
      image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80'
    },
    tea: {
      title: 'First-Flush Darjeeling & White Peony Tea Rituals',
      description: 'Unlike commercial clover syrup that overwhelms delicate tannins, our Kashmir White Velvet provides a gentle, floral sweetness without masking subtle aromatics.',
      honey: 'Kashmir Valley White Velvet Honey',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
    },
    baking: {
      title: 'Artisanal Brioche, Granola & Honeyed Fig Tarts',
      description: 'Our dark Golden Dew Forest Honey contains natural maltose and forest honeydew sugars that caramelize into a glossy, amber mahogany crust with rich woody depth.',
      honey: 'Golden Dew Forest Organic Honey',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-white pb-20 w-full max-w-full overflow-x-hidden">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* HERO SECTION WITH ANIMATED HONEY SPILL & BACKGROUND        */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden text-center bg-[#FAF6EE] w-full max-w-full">
        
        {/* Photorealistic Luxury Honey Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={honeyHeroBg} 
            alt="HaruViru Luxury Honey Harvest" 
            className="w-full h-full object-cover object-top"
          />
          {/* Gentle ambient light to enhance text contrast without obscuring the honey jar or lake */}
          <div className="absolute inset-0 bg-radial-at-c from-white/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hyper-Realistic Animated Honey Stream Flowing from Jar -> Button -> Floor */}
        <AnimatedHoneyStream />

        {/* Animated Honeybees flying between blossoms and jar at the top */}
        <AnimatedBees />

        {/* Floating Top Right Tag */}
        <div className="hidden md:inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-amber-200/90 px-4 py-1.5 rounded-full text-[11px] font-bold text-amber-950 shadow-sm absolute top-4 right-8 hover:scale-105 transition-transform z-20">
          <span>🎉</span>
          <span>100% Unpasteurized & NMR Lab Tested Harvest!</span>
        </div>

        {/* Main Hero Content Overlay (Reduced top space on mobile & adjusted for background animation height) */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-12 sm:pb-16 flex flex-col items-center justify-between min-h-[95vh] sm:min-h-[90vh] w-full max-w-full">
          
          <div className="space-y-2.5 sm:space-y-4 max-w-4xl mx-auto w-full">
            {/* Top Pill Badge (First text right below navbar with reduced mobile gap) */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-100/90 border border-amber-300 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-xs font-black text-amber-950 shadow-xs hover:scale-105 transition-transform cursor-default max-w-[95vw]">
              <span>✨</span>
              <span className="truncate">India's Most Pure & Certified Raw Honey Destination</span>
            </div>

            {/* Main heading: Starts below the honey jar on mobile with bold, increased mobile font size */}
            <h1 className="mt-28 xs:mt-36 sm:mt-0 text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#542A0A] tracking-[-0.035em] leading-[1.08] select-none break-words max-w-full">
              <span className="block text-[#542A0A]">
                Savor Special
              </span>
              <span className="block text-[#542A0A]">
                Moments in
              </span>
              <span className="gradient-text-honey font-black block sm:inline">
                Every Golden Spoon
              </span>
            </h1>

            {/* Subtitle / product description: Rich brown #713B13 with enhanced mobile font size */}
            <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#713B13] font-semibold leading-relaxed pt-1 px-2">
              Cold-Extracted Raw Sidr, 4K Botanical Traceability, Zero Added Sugars, Nuclear Magnetic Resonance (NMR) Verified. 100% Raw Wildflower Reserves.
            </p>

            {/* Dual Action Buttons (Primary button receives the flowing honey spill) */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-3 sm:pt-5 w-full max-w-xs sm:max-w-none mx-auto">
              
              {/* Primary Button with Honey Spill Overlay */}
              <div className="relative inline-flex items-center group w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto gradient-btn-honey text-white font-black text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 sm:gap-2.5 hover:scale-105 active:scale-95 transition-all relative z-10"
                >
                  <Flame className="w-4 h-4 fill-white text-white" />
                  <span>Explore Reserves & Shop</span>
                </Link>

                {/* Golden Honey Overflow Crest covering the top edge of the button */}
                <div className="absolute -top-3.5 right-6 w-16 h-8 pointer-events-none z-20 animate-honey-crest-pulse">
                  <svg viewBox="0 0 60 30" className="w-full h-full">
                    <path
                      d="M 6 18 Q 30 -6 54 14 Q 42 26 30 24 Q 14 28 6 18 Z"
                      fill="#F59E0B"
                      opacity="0.95"
                    />
                    <path
                      d="M 14 12 Q 30 2 46 12"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.9"
                    />
                    <circle cx="28" cy="12" r="2.5" fill="#FFFFFF" opacity="0.95" />
                  </svg>
                </div>
              </div>

              {/* Secondary Button */}
              <Link
                to="/about"
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-stone-900 border border-amber-200/80 font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-md transition-all flex items-center justify-center gap-2 hover:border-amber-300 hover:scale-105 active:scale-95"
              >
                <span>Our Lab Purity Story 🔬</span>
              </Link>
            </div>
          </div>

          {/* Bottom space where the honey stream cascades down into the expansive Honey Lake */}
          <div className="h-24 sm:h-36 w-full pointer-events-none" />

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* FEATURED PRODUCTS (Clean White Cards with Soft Golden Hues)*/}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn Harvest Collection</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-stone-900">
              Signature Single-Origin Honey Reserves
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-orange-600 transition-colors"
          >
            <span>View All {products.length} Honey Jars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="card-clean flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Image Section */}
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
                
                {product.isNewHarvest && (
                  <span className="absolute top-3 right-3 bg-stone-900 text-amber-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    New Harvest
                  </span>
                )}

                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-stone-800 px-2.5 py-0.5 rounded-full border border-stone-200 shadow-xs">
                  {product.weight}
                </div>
              </div>

              {/* Product Details Section */}
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

                {/* Price & Cart CTA */}
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
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3 VALUE PILLARS (Clean Light Yellow / Cream Background)    */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="bg-[#FFFDF7] py-20 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="badge-pill-soft px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Why HaruViru Gold
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-stone-900">
              Untouched by Fire. Free From Syrups.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Over 75% of commercial honeys are heated above 70°C and stripped of enzymes. We preserve the sacred integrity of the hive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-clean p-8 sm:p-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                NMR Lab Tested & Certified
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Nuclear Magnetic Resonance spectroscopy analyzes every harvest batch down to the isotopic level, verifying 0% added sugar syrups or adulterants.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Certified 99.8% - 100% Pure Nectar</span>
              </div>
            </div>

            <div className="card-clean p-8 sm:p-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                <Droplet className="w-6 h-6 text-orange-700" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Cold-Extracted Below 36°C
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Honey is never heated beyond hive body temperature. This guarantees active live invertase, diastase, and bio-probiotics remain alive and potent.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Enzymatically Active & Bio-Available</span>
              </div>
            </div>

            <div className="card-clean p-8 sm:p-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Leaf className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Ethical 40% Hive Tithe
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We never harvest essential bee winter reserves. A minimum of 40% of honey is permanently left behind in each colony for natural hive nourishment.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Sustainable Himalayan Apiaries</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* INTERACTIVE PAIRING RITUALS                                */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-[32px] sm:rounded-[40px] md:rounded-[50px] p-6 sm:p-10 md:p-14 lg:p-16 shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Culinary & Healing Rituals
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-white">
              Pairing Notes For Discerning Palates
            </h2>
            <p className="text-stone-300 text-sm">
              Discover how distinct blossom nectars transform daily morning tea, cheeses, and wellness tonics.
            </p>
          </div>

          {/* Clean Pill Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-stone-800 mb-8">
            {['wellness', 'cheese', 'tea', 'baking'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedPairingTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedPairingTab === tab
                    ? 'gradient-btn-honey text-white shadow-md'
                    : 'bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700'
                }`}
              >
                {tab === 'wellness' && 'Immunity & Ayurveda'}
                {tab === 'cheese' && 'Aged Cheeses'}
                {tab === 'tea' && 'Fine Teas'}
                {tab === 'baking' && 'Gourmet Baking'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-100">
                {pairingContent[selectedPairingTab].title}
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {pairingContent[selectedPairingTab].description}
              </p>
              <div className="p-4 bg-stone-800/80 rounded-2xl border border-stone-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-amber-400 block">
                    Recommended Reserve
                  </span>
                  <span className="font-serif-luxury font-bold text-base text-white">
                    {pairingContent[selectedPairingTab].honey}
                  </span>
                </div>
                <Link
                  to="/shop"
                  className="gradient-btn-honey text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={pairingContent[selectedPairingTab].image}
                alt={pairingContent[selectedPairingTab].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* REVIEWS SPOTLIGHT                                          */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="badge-pill-soft px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
            Verified Collectors & Chefs
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-stone-900">
            Loved By Over 50,000 Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-clean p-8 sm:p-9 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "The Imperial Sidr honey is simply royal. The warm butterscotch note and raw viscosity is unlike any commercial honey available in supermarkets. Liquid gold."
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Eleanor Vance</p>
                <p className="text-[10px] text-stone-500">Gourmet Digest Critic</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="card-clean p-8 sm:p-9 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "We use HaruViru Raw Comb on our signature charcuterie boards at our resort. Guests constantly ask where we source it. The hexagonal comb is breathtaking."
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Marcus Sterling</p>
                <p className="text-[10px] text-stone-500">Executive Chef, Alpine Club</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="card-clean p-8 sm:p-9 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                "The Kashmir White Velvet Honey has completely replaced processed sugar in our home. Spreads like rich clotted cream. Total peace of mind with NMR tests."
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Priya Nambiar</p>
                <p className="text-[10px] text-stone-500">Ayurvedic Practitioner</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* WHOLESALE & CORPORATE BANNER (Clean Golden Card)           */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] md:rounded-[50px] border border-amber-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-700">
              Wholesale & Corporate Gifting
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-black text-stone-900">
              Need Wooden Cased Gifting or Pallet Shipments?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              We cater to luxury hotel groups, Michelin-starred culinary programs, corporate gifting, and organic distributors worldwide.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/contact"
              className="gradient-btn-honey text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md inline-block"
            >
              Request B2B Catalog
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
