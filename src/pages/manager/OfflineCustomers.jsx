import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  IndianRupee, 
  X
} from 'lucide-react';

export const OfflineCustomers = () => {
  const { distributors, addDistributor, showToast } = useApp();
  
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New distributor form
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Organic Boutique');
  const [creditLimit, setCreditLimit] = useState(15000);
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [city, setCity] = useState('');

  const filtered = distributors.filter(d =>
    d.companyName.toLowerCase().includes(search.toLowerCase()) ||
    d.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleRegister = (e) => {
    e.preventDefault();
    if (!companyName || !email) return;

    addDistributor({
      companyName,
      contactPerson,
      email,
      phone,
      category,
      creditLimit,
      outstandingBalance: 0,
      paymentTerms,
      status: 'Active',
      assignedRep: 'Vikramaditya Roy',
      city: city || 'New York, NY'
    });

    setShowAddModal(false);
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 block mb-1">
            Accounts & Distribution Network
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3D2206]">
            Customer Management (Retailers & Distributors Directory)
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Maintain wholesale client profiles, credit limits, authorized payment terms, and assigned sales representatives.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#D89816] hover:bg-[#B87A0B] text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Distributor</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search retailers, supermarket chains, cities..."
            className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#D89816]"
          />
        </div>
        <span className="text-xs font-semibold text-stone-500">{filtered.length} Authorized Distributors</span>
      </div>

      {/* Distributors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                  {d.companyName}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mt-1">
                  {d.category}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                d.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'
              }`}>
                {d.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Contact Person</span>
                <span className="font-bold text-stone-800">{d.contactPerson}</span>
                <p className="text-stone-500 text-[11px] mt-0.5">{d.email}</p>
                <p className="text-stone-500 text-[11px]">{d.phone}</p>
              </div>

              <div>
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Credit & Terms</span>
                <span className="font-bold text-stone-800">₹{d.creditLimit.toLocaleString('en-IN')} Limit</span>
                <p className="text-amber-800 font-semibold text-[11px] mt-0.5">Terms: {d.paymentTerms}</p>
                <p className="text-stone-500 text-[11px]">Rep: {d.assignedRep}</p>
              </div>
            </div>

            <div className="p-3 bg-[#FAF6EE] rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-500 text-[11px]">Outstanding Due:</span>
                <span className="font-extrabold text-[#3D2206] ml-1.5">₹{d.outstandingBalance.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-stone-500 text-[11px]">Lifetime Value:</span>
                <span className="font-bold text-emerald-700 ml-1.5">₹{d.lifetimeValue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-stone-400 text-[11px] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{d.city}</span>
              </span>
              <button
                onClick={() => showToast(`Drafting quote for ${d.companyName}...`, 'info')}
                className="text-xs font-bold text-emerald-800 hover:underline"
              >
                Create Bulk Order →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Register Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-luxury font-bold text-lg text-[#3D2206]">
                Register New Retail / Wholesale Client
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Company / Group Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Belmond Hotel & Spas Group"
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Key Procurement Contact</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  >
                    <option value="Supermarket Chain">Supermarket Chain</option>
                    <option value="Organic Boutique">Organic Boutique</option>
                    <option value="Gourmet Cafe Group">Gourmet Cafe Group</option>
                    <option value="Ayurvedic Pharmacy">Ayurvedic Pharmacy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@belmond.com"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Credit Limit (₹)</label>
                  <input
                    type="number"
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                  >
                    <option value="Advance">Advance Wire</option>
                    <option value="Net 15">Net 15 Days</option>
                    <option value="Net 30">Net 30 Days</option>
                    <option value="Net 60">Net 60 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">HQ City & State</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Seattle, WA"
                  className="w-full bg-[#FAF6EE] border border-stone-300 rounded-xl px-3.5 py-2"
                />
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
                  className="bg-[#D89816] text-stone-950 font-bold px-5 py-2 rounded-xl shadow-xs"
                >
                  Confirm Account Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
