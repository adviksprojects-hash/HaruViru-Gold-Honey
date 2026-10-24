import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart, 
  Share2, 
  Check, 
  Plus, 
  Minus, 
  ShoppingBag, 
  FileText, 
  Sparkles, 
  Clock, 
  MapPin, 
  Award,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, reviews, addToCart, addReview, showToast } = useApp();

  const product = products.find((p) => p.id === id) || products[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(product.weight || '500g');
  const [activeTab, setActiveTab] = useState('benefits');

  // Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Product reviews
  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'approved');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    addReview({
      productId: product.id,
      productName: product.name,
      customerName: reviewName,
      customerEmail: reviewEmail || 'collector@guest.com',
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true
    });

    setShowReviewModal(false);
    setReviewName('');
    setReviewEmail('');
    setReviewComment('');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedWeight);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link to="/" className="hover:text-amber-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to="/shop" className="hover:text-amber-800">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-800 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#F5E5B5] shadow-lg">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-[#D89816] text-stone-950 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                Royal Reserve
              </span>
            )}
            <div className="absolute top-4 right-4 bg-[#1C120A]/90 backdrop-blur-xs text-[#F3D279] text-xs font-bold px-3 py-1.5 rounded-full border border-[#D89816]/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{product.purityScore}% NMR Verified</span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-[#D89816] ring-2 ring-amber-400/30'
                      : 'border-transparent hover:border-stone-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 text-stone-600 text-xs text-center">
            <div className="bg-white p-3 rounded-2xl border border-stone-200 flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-amber-700" />
              <span className="font-semibold text-stone-800">Free Courier</span>
              <span className="text-[10px] text-stone-500">Orders over $50</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-stone-200 flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <span className="font-semibold text-stone-800">100% Raw Honey</span>
              <span className="text-[10px] text-stone-500">Zero Added Sugars</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-stone-200 flex flex-col items-center gap-1">
              <Award className="w-5 h-5 text-amber-700" />
              <span className="font-semibold text-stone-800">NMR Certified</span>
              <span className="text-[10px] text-stone-500">Batch Tested</span>
            </div>
          </div>
        </div>

        {/* Right: Details & Buying Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B87A0B] bg-[#F5E5B5]/60 px-3 py-1 rounded-full">
                {product.category} Single-Origin
              </span>
              <span className="text-xs text-stone-400">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3D2206] leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              {product.tagline}
            </p>

            {/* Rating summary */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating}</span>
              <span className="text-xs text-stone-400">•</span>
              <a href="#reviews" className="text-xs text-[#8F5808] hover:underline font-semibold">
                {product.reviewCount} Connoisseur Reviews
              </a>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="p-4 bg-white rounded-2xl border border-[#F5E5B5] flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#3D2206]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Taxes calculated at checkout • Fast cold-chain courier dispatch
              </p>
            </div>
            
            <div className="text-right">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                product.stock > 10 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {product.stock > 0 ? `${product.stock} Jars in Stock` : 'Sold Out'}
              </span>
            </div>
          </div>

          {/* Weight / Jar Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Jar Format / Weight:
            </label>
            <div className="flex gap-3">
              {['250g Jar', '500g Jar', '1kg Family Reserve'].map((format) => {
                const isSelected = selectedWeight.includes(format.split(' ')[0]);
                return (
                  <button
                    key={format}
                    onClick={() => setSelectedWeight(format.split(' ')[0])}
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-[#D89816] bg-[#FCF9F2] text-[#8F5808] ring-2 ring-amber-400/20 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {format}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tasting Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Sensory Tasting Notes:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-[#FAF4E4] text-[#643B08] border border-[#F5E5B5] px-3 py-1 rounded-full text-xs font-medium"
                >
                  🍯 {note}
                </span>
              ))}
            </div>
          </div>

          {/* Harvest & Batch Info Bar */}
          <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>Harvest Origin:</span>
              </span>
              <span className="font-semibold text-stone-900">{product.harvestLocation}</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Moisture Content:</span>
              </span>
              <span className="font-semibold text-stone-900">{product.moistureContent} (Below 18% Natural Preservation)</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>Batch Certificate:</span>
              </span>
              <span className="font-mono font-bold text-amber-900">{product.batchNumber}</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Qty Stepper */}
              <div className="flex items-center border border-stone-300 rounded-2xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, quantity, selectedWeight)}
                className="flex-1 bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart • ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-[#1C120A] hover:bg-[#2F1D10] text-[#F5E5B5] font-bold text-sm py-3.5 rounded-2xl transition-all shadow-sm"
            >
              Instant Royal Checkout
            </button>
          </div>

        </div>
      </div>

      {/* Tabs: Description, Bio-Active Benefits, NMR Purity Verification */}
      <div className="bg-white rounded-3xl border border-[#F5E5B5] p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex border-b border-stone-200 gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'benefits' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Health & Enzymatic Benefits
            {activeTab === 'benefits' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('purity')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'purity' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            NMR Lab Report & Purity Details
            {activeTab === 'purity' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('harvest')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'harvest' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Beekeeping & Apiary Story
            {activeTab === 'harvest' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
            )}
          </button>
        </div>

        {activeTab === 'benefits' && (
          <div className="space-y-6 text-sm text-stone-700 leading-relaxed">
            <p>{product.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {product.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#FAF6EE] rounded-xl border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-stone-800">{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'purity' && (
          <div className="space-y-6 text-sm text-stone-700">
            <p>
              HaruViru Honey uses Nuclear Magnetic Resonance (NMR) testing by independent German laboratory Eurofins. NMR provides a unique metabolic fingerprint of honey, proving zero dilution with rice syrup, corn syrup, or beet sugar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FAF4E4] p-4 rounded-2xl border border-[#F5E5B5] text-center">
                <span className="text-2xl font-black text-[#8F5808]">{product.purityScore}%</span>
                <p className="text-xs font-semibold text-stone-800 mt-1">Certified NMR Purity</p>
                <p className="text-[10px] text-stone-500">0% Adulteration Detected</p>
              </div>
              <div className="bg-[#FAF4E4] p-4 rounded-2xl border border-[#F5E5B5] text-center">
                <span className="text-2xl font-black text-[#8F5808]">{product.moistureContent}</span>
                <p className="text-xs font-semibold text-stone-800 mt-1">Natural Moisture</p>
                <p className="text-[10px] text-stone-500">Prevents natural fermentation</p>
              </div>
              <div className="bg-[#FAF4E4] p-4 rounded-2xl border border-[#F5E5B5] text-center">
                <span className="text-2xl font-black text-[#8F5808]">18.4+</span>
                <p className="text-xs font-semibold text-stone-800 mt-1">Diastase Activity Index</p>
                <p className="text-[10px] text-stone-500">Proves zero thermal damage</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'harvest' && (
          <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
            <p>
              Gathered by local indigenous beekeeper communities who have practiced sustainable apiculture for centuries. We install our wooden hives at high altitudes where wild flowering botanicals flourish without pesticides, artificial fertilizers, or industrial pollution.
            </p>
            <p>
              We leave 40% of the harvest behind so colonies have ample sustenance through winter. In accordance with ethical standards, the queen bee's wings are never clipped, and chemical fumigants are strictly banned.
            </p>
          </div>
        )}
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
              Collector Reviews & Ratings
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Read authentic feedback from collectors and chefs.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-2 self-start sm:self-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write A Review</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productReviews.length === 0 ? (
            <div className="col-span-2 bg-white p-12 text-center rounded-3xl border border-stone-200 space-y-2">
              <p className="text-sm font-semibold text-stone-700">No public reviews yet for this harvest.</p>
              <p className="text-xs text-stone-500">Be the first connoisseur to review this single-origin honey!</p>
            </div>
          ) : (
            productReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-[#F5E5B5] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#3D2206]">{rev.customerName}</h4>
                    <span className="text-[10px] text-stone-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.verifiedPurchase && (
                  <div className="pt-2 text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Verified Collector Purchase</span>
                  </div>
                )}

                {/* Admin Reply */}
                {rev.adminReply && (
                  <div className="mt-3 p-3 bg-[#FAF4E4] rounded-xl border border-[#F5E5B5] text-xs space-y-1">
                    <span className="font-bold text-amber-900 block text-[11px]">
                      HaruViru Master Beekeeper Reply:
                    </span>
                    <p className="text-stone-700">{rev.adminReply}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#F5E5B5] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif-luxury text-xl font-bold text-[#3D2206]">
                Review {product.name}
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-stone-600 block mb-1">
                  Your Rating:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-600 block mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-600 block mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  placeholder="e.g. eleanor@example.com"
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-600 block mb-1">
                  Your Review & Tasting Notes:
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share aroma, floral notes, texture, or how you enjoyed it with tea or cheeses..."
                  className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl p-3 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs"
                >
                  Submit For Moderation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
