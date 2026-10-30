import React from 'react';
import { Link } from 'react-router-dom';
import haruViruLogo from '../assets/haruviru-logo.jpg';
import { 
  Crown, 
  ShieldCheck, 
  Leaf, 
  Droplet, 
  Heart, 
  Sparkles, 
  Award, 
  ArrowRight,
  Compass,
  Check
} from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="space-y-24 pb-20 bg-white">
      
      {/* Hero Header (Clean Light Gradient) */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 via-orange-50/40 to-white text-center border-b border-stone-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FFF1DE] border border-[#FED7AA] px-4 py-1.5 rounded-full text-xs font-bold text-[#B45309]">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>HARUVIRU GOLD APICULTURE</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-black text-stone-900 leading-tight">
            Guardians of the Ancient <br />
            <span className="gradient-text-honey">Blossom Pact</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We exist to preserve raw mountain honey as nature intended: an enzymatically living, unheated golden elixir harvested with profound reverence for the honeybee.
          </p>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="badge-pill-soft px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              The Genesis
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-stone-900 leading-snug">
              "When you pasteurize honey, you kill the soul of the hive."
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              HaruViru Gold Honey was founded on a simple revelation: over 75% of honeys found on modern supermarket shelves have been heated past 70°C, micro-filtered to strip away valuable bee pollen, and blended with cheap sugar syrups. The ancient medicinal elixir celebrated in sacred texts had been reduced to empty sweetness.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We partnered directly with ancestral beekeeping families in the high Himalayan foothills and remote wild Sidr valleys. Here, bees forage on wild medicinal blossoms that have evolved in isolated alpine biospheres for thousands of years.
            </p>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-bold">
                <Compass className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900">Single-Origin Harvests</h4>
                <p className="text-xs text-stone-500">Every single jar is traceable back to its specific mountain ridge and harvest batch.</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/60 bg-[#FFFDF7] p-2 flex items-center justify-center">
            <img
              src={haruViruLogo}
              alt="HaruViru Group of Business Founders & Brand Seal"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* The 5 Golden Pillars */}
      <section className="bg-[#FFFDF7] py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="badge-pill-soft px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Scientific Rigor & Ethics
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-stone-900">
              The HaruViru Five Golden Pillars
            </h2>
            <p className="text-stone-600 text-sm">
              Our pledge to you and the sacred honeybee ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl gradient-btn-honey text-white font-black text-xl flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Independent NMR Lab Verification
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Nuclear Magnetic Resonance spectroscopy analyzes every jar down to the isotopic level, verifying 0% adulteration with rice syrups or C4 cane sugars.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl gradient-btn-honey text-white font-black text-xl flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Never Heated Past 36°C
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                A beehive maintains a natural temperature of 35-36°C. We never subject our honey to temperatures higher than the hive itself, preserving active enzymes like invertase and glucose oxidase.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl gradient-btn-honey text-white font-black text-xl flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                The 40% Winter Hive Tithe
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We strictly harvest only true surplus nectar. A minimum of 40% of honey is permanently left behind in each colony so bees nourish themselves with their own natural food throughout winter.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl gradient-btn-honey text-white font-black text-xl flex items-center justify-center">
                4
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Pesticide-Free Alpine Zones
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our apiaries are situated at 2,000m to 3,600m above sea level, far beyond the range of commercial agricultural pesticides, neonicotinoids, or industrial runoff.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl gradient-btn-honey text-white font-black text-xl flex items-center justify-center">
                5
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Heavy Hexagonal Flint Glass
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Raw honey contains natural organic acids that can leach microplastics from plastic squeeze bottles. We bottle exclusively in heavyweight, recyclable Italian flint glass jars.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 rounded-3xl shadow-lg flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-amber-200">Join The Movement</span>
                <h3 className="font-serif-luxury text-xl font-bold text-white mt-1">
                  Taste The Difference Pure Nectar Makes
                </h3>
                <p className="text-xs text-amber-100 mt-2">
                  Experience our Autumn 2026 limited batch reserves.
                </p>
              </div>
              <Link
                to="/shop"
                className="bg-white text-stone-900 hover:bg-stone-50 text-xs font-bold py-3 rounded-xl text-center uppercase tracking-wider transition-all shadow-md"
              >
                Shop Single-Origin Reserves
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Beekeeping CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-orange-500/20">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-black uppercase tracking-widest text-amber-200">
              Bee Sanctuary Conservation
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-black text-white">
              Every Jar Plants 50 Wild Alpine Flowers
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Through our Pollinator Sanctuary Initiative, a percentage of every purchase goes directly to re-seeding high-altitude wildflower corridors and building chemical-free bee refuges.
            </p>
          </div>
          <Link
            to="/shop"
            className="shrink-0 bg-white text-stone-900 hover:bg-stone-50 text-xs font-black uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-md hover:scale-105"
          >
            Explore The Harvest
          </Link>
        </div>
      </section>

    </div>
  );
};
