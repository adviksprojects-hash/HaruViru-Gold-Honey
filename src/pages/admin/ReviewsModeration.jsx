import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  Check, 
  X, 
  MessageSquare, 
  Filter, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  Sparkles
} from 'lucide-react';

export const ReviewsModeration = () => {
  const { reviews, updateReviewStatus, replyToReview, showToast } = useApp();
  
  const [activeTab, setActiveTab] = useState('pending');
  const [replyingReviewId, setReplyingReviewId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filtered = reviews.filter(r => r.status === activeTab);
  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  const handleSendReply = (reviewId) => {
    if (!replyText.trim()) return;
    replyToReview(reviewId, replyText.trim());
    setReplyingReviewId(null);
    setReplyText('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87A0B] block mb-1">
            Community & Quality Trust
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Reviews & Ratings Moderation
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Approve customer tasting feedback, moderate spam, and reply on behalf of HaruViru Master Beekeepers.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 relative transition-colors flex items-center gap-2 ${
            activeTab === 'pending' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <span>Pending Moderation</span>
          {pendingCount > 0 && (
            <span className="bg-amber-500 text-stone-950 text-[10px] px-2 py-0.2 rounded-full font-black">
              {pendingCount}
            </span>
          )}
          {activeTab === 'pending' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'approved' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Approved Reviews ({reviews.filter(r => r.status === 'approved').length})
          {activeTab === 'approved' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('rejected')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'rejected' ? 'text-[#8F5808]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Rejected ({reviews.filter(r => r.status === 'rejected').length})
          {activeTab === 'rejected' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D89816] rounded-full" />
          )}
        </button>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-2">
            <Check className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-serif-luxury font-bold text-lg text-stone-800">
              No reviews in {activeTab} queue
            </h3>
            <p className="text-xs text-stone-500">
              All collector feedback has been moderated.
            </p>
          </div>
        ) : (
          filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900">{rev.customerName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Product: <b className="text-stone-700">{rev.productName}</b> • {rev.date}
                  </p>
                </div>

                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                "{rev.comment}"
              </p>

              {/* Existing Beekeeper Reply if any */}
              {rev.adminReply && (
                <div className="p-3 bg-[#FAF4E4] rounded-2xl border border-[#F5E5B5] text-xs space-y-1">
                  <span className="font-bold text-amber-900 block text-[11px]">
                    Official Beekeeper Reply:
                  </span>
                  <p className="text-stone-700">{rev.adminReply}</p>
                </div>
              )}

              {/* Reply Box if toggled */}
              {replyingReviewId === rev.id && (
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-300 space-y-2 animate-fade-in">
                  <label className="text-[11px] font-bold text-stone-700 block">
                    Write Official Reply as Master Beekeeper:
                  </label>
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Thank you for your review! Our beekeepers in the high valleys..."
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setReplyingReviewId(null)}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-600 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(rev.id)}
                      className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold px-4 py-1.5 rounded-lg text-xs"
                    >
                      Publish Reply
                    </button>
                  </div>
                </div>
              )}

              {/* Moderation Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                <button
                  onClick={() => {
                    setReplyingReviewId(rev.id);
                    setReplyText(rev.adminReply || '');
                  }}
                  className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{rev.adminReply ? 'Edit Reply' : 'Reply as Beekeeper'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'approved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Review</span>
                    </button>
                  )}
                  {rev.status !== 'rejected' && (
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'rejected')}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
