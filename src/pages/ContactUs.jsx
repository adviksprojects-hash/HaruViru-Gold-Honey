import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Building2,
  Crown
} from 'lucide-react';

export const ContactUs = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Retail Order Inquiry',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received by our Apiary Concierge!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-[#241508] text-white rounded-3xl p-8 sm:p-12 border border-[#D89816]/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E4B345]">
            Collector Care & Wholesale Concierge
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#FFFDF7]">
            Connect With Our Apiary
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Whether you have questions regarding raw crystallization, desire corporate wooden gift casing, or represent an organic specialty distributor, our master team is here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Contact Information Cards */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F5E5B5] shadow-xs space-y-6">
            <h3 className="font-serif-luxury font-bold text-xl text-[#3D2206]">
              Concierge Channels
            </h3>

            <div className="space-y-5 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">Collector Telephone</h5>
                  <p className="text-stone-500 mt-0.5">+1 (800) 427-8847 (Toll-Free)</p>
                  <p className="text-stone-400 text-[11px]">Mon-Fri 8am - 6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">Direct Email</h5>
                  <p className="text-stone-500 mt-0.5">concierge@haruvirugold.com</p>
                  <p className="text-stone-400 text-[11px]">Responses within 12 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">Wholesale & B2B Division</h5>
                  <p className="text-stone-500 mt-0.5">procurement@haruvirugold.com</p>
                  <p className="text-stone-400 text-[11px]">Net 30/60 inquiries & pallet freight</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">Apiary Sanctuaries</h5>
                  <p className="text-stone-500 mt-0.5">Himalayan Alpine Foothills & Doani Wild Valleys</p>
                  <p className="text-stone-400 text-[11px]">Visits by private seasonal appointment</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF4E4] p-6 rounded-3xl border border-[#F5E5B5] space-y-2">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">
              Quick Self-Service
            </span>
            <h4 className="font-serif-luxury font-bold text-base text-[#3D2206]">
              Have a quick question?
            </h4>
            <p className="text-xs text-stone-600">
              Check our Frequently Asked Questions regarding crystallization, shelf life, NMR testing, and shipping.
            </p>
            <a
              href="/faqs"
              className="inline-block text-xs font-bold text-[#8F5808] hover:underline pt-1"
            >
              Browse FAQs →
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#F5E5B5] shadow-xs space-y-6">
            <div>
              <h3 className="font-serif-luxury font-bold text-2xl text-[#3D2206]">
                Send Us A Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Fill out the brief details below and our concierge team will respond promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-emerald-900">Message Delivered</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out to HaruViru Gold. A beekeeper or concierge representative will reply within 12 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Julian Croft"
                      className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. j.croft@luxuryfoods.co"
                      className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Inquiry Department / Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                    >
                      <option value="Retail Order Inquiry">Retail Order & Cold-Chain Shipping</option>
                      <option value="Wholesale & Bulk">Wholesale, Bulk Drums & B2B Distribution</option>
                      <option value="Corporate Gifting">Corporate Gifting & Bespoke Wooden Casings</option>
                      <option value="Quality & Lab Testing">NMR Quality Test & Authenticity Report</option>
                      <option value="Apiary Sanctuary Tour">Apiary Sanctuary Visit Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Your Message or Requirements</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your questions, volume needed, or pairing preferences..."
                    className="w-full bg-[#FCF9F2] border border-stone-300 rounded-xl p-3 text-stone-800 focus:outline-hidden focus:border-[#D89816]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
