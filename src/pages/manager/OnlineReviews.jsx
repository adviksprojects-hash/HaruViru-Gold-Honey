import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  Check, 
  X, 
  Globe, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';

export const OnlineReviews = () => {
  const { reviews, updateReviewStatus } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 block mb-1">
          Storefront Social Proof
        </span>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
          Reviews & Ratings Moderation (Website Reviews)
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Moderate verified buyer reviews visible on product detail pages.
        </p>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">{rev.customerName}</span>
                <span className="text-[10px] text-stone-400">• {rev.date}</span>
                <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                  rev.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                }`}>
                  {rev.status}
                </span>
              </div>

              <div className="flex text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs text-stone-700 leading-relaxed italic">
                "{rev.comment}"
              </p>
              
              <span className="text-[11px] text-stone-500 block">
                Product: <b className="text-stone-800">{rev.productName}</b>
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {rev.status !== 'approved' && (
                <button
                  onClick={() => updateReviewStatus(rev.id, 'approved')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  Approve For Web
                </button>
              )}
              {rev.status !== 'rejected' && (
                <button
                  onClick={() => updateReviewStatus(rev.id, 'rejected')}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
