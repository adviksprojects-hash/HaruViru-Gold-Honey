# HaruViru Gold Honey 🍯👑
> **100% Pure, Raw & Royal Mountain Honey E-Commerce Platform**

An artisanal, modern, and high-performance e-commerce and multi-role operations management system crafted for **HaruViru Gold Honey**.

---

## 🌟 Live Preview Environment
- **Local URL**: `http://localhost:5173/`
- **Current Access**: **All pages are 100% public for content & UI review** before authentication and database binding.
- **Persona & Dashboard Switcher**: A sticky golden bar at the very top enables 1-click switching between:
  1. 🛍️ **Storefront (Customer View)**
  2. 👤 **User Dashboard (Customer Portal)**
  3. 👑 **Admin Portal (Super Administrator Suite)**
  4. 🌐 **Online Sales Manager Dashboard**
  5. 🏢 **Offline Sales Manager Dashboard**
  6. 📦 **Purchase Manager Dashboard**

---

## 📋 Comprehensive Page Breakdown

### 🛍️ User-Side Storefront Pages
| Route | Page | Key Features |
|---|---|---|
| `/` | **Home** | Luxury golden hero banner, Autumn 2026 Reserve showcase, The 5 Golden Purity Pillars (NMR Tested 0% sugars, cold-extracted), Gastronomy & honey pairing interactive tabs, Connoisseur reviews, Gifting CTA. |
| `/shop` | **Shop / Products** | Search bar, filters by variety (Sidr, Wildflower, Acacia, White Velvet, Raw Comb, Infused), jar sizes (250g, 500g, 1kg), sorting, quick add to cart. |
| `/product/:id` | **Product Details** | High-resolution image gallery, jar weight selector with dynamic price, NMR purity badges (99.8%+), harvest coordinates, moisture index, enzymatic benefits, customer reviews, "Write a Review" modal. |
| `/about` | **Our Story / About Us** | Ancient blossom pact philosophy, Himalayan apiary sanctuaries, the 5 Golden Purity Pillars, ethical 40% winter hive tithe, Italian flint glass packaging. |
| `/blog` | **Honey Recipes / Blog** | Categorized gourmet recipes (Golden Milk Elixir, Honeycomb Crostini), prep/cook times, ingredients checklist, step-by-step instructions, likes counter. |
| `/cart` | **Cart** | Interactive item quantity steppers, free shipping progress bar, complimentary royal gift box add-on, promo coupon redemption (`GOLDEN15`, `ROYALHIVE`, `FREESHIP`), order summary. |
| `/checkout` | **Checkout** | Multi-section streamlined one-page checkout, courier speed selection (Standard vs Priority Golden Flight), payment test sandbox (Cards, UPI, COD), instant confetti celebration, order confirmation & invoice. |
| `/user/profile` | **User Profile / Dashboard** | Golden Bee Club tier & points balance (10 pts per $1 spent), saved addresses, spending analytics, reward redemption. |
| `/user/orders` | **Order History** | Order tracking progress stepper (Placed → Quality Check → Transit → Delivered), tracking numbers, courier partner info, downloadable/printable official tax invoice modal, 1-click reorder. |
| `/contact` | **Contact Us** | Concierge inquiry form (Retail, Wholesale, Corporate gifting, Lab reports), customer telephone helpline, apiary coordinates. |
| `/faqs` | **FAQs** | Collapsible accordion knowledge base (Crystallization science, NMR purity testing, cold-chain shipping, non-perishability). |

---

### 👑 Admin-Side Pages (`/admin/*`)
| Route | Page | Description |
|---|---|---|
| `/admin/dashboard` | **Analytics Overview** | Multi-channel gross revenue, orders, AOV, online vs B2B comparison, low-stock warnings, live orders feed, top-selling honey SKUs. |
| `/admin/team` | **Organization / Team Management** | **Role & Permission Assignment**: Invite staff, assign roles (Admin, Online Sales Manager, Offline Sales Manager, Purchase Manager), and customize a 9-point granular permissions matrix. |
| `/admin/products` | **Product Management** | Add/edit honey SKUs, adjust live stock levels (+/-), set low-stock thresholds, record batch numbers, moisture %, and NMR purity ratings. |
| `/admin/orders` | **Order Management** | Master fulfillment for both online D2C orders and B2B wholesale orders; update statuses (Pending, Processing, Shipped, Delivered); assign tracking numbers. |
| `/admin/customers` | **Customer Management** | Client directory of both online consumers and wholesale accounts, tagged by tier (VIP Gold Patron, Wholesale Distributor), lifetime value (LTV), direct email composer. |
| `/admin/content` | **Content Management** | Blog & Recipe CMS editor; write, edit, publish/unpublish culinary recipes and apiculture field stories. |
| `/admin/coupons` | **Discounts & Coupons** | Promo code creator (percentage or fixed dollar, usage caps, min order, channel restriction); toggle code status. |
| `/admin/reviews` | **Reviews & Ratings Moderation** | Review queue (Pending, Approved, Rejected); approve verified purchaser feedback; publish official Master Beekeeper responses. |
| `/admin/settings` | **Settings (Shipping, Tax, Payment & DB)** | Courier rates, tax/VAT rules, payment gateway toggles, and **Neon PostgreSQL Database connection string input**. |

---

### 💻 The 3 Specialized Manager Views (`/manager/*`)

#### 1. Online Sales Manager (`/manager/online-sales/*`)
- **Web Analytics Overview**: Storefront traffic sessions (14,820 visitors), e-com conversion rate (3.42%), cart abandonment analytics, daily sales.
- **Online Orders & Courier Shipping**: Filtered to consumer web orders; print thermal dispatch labels; assign BlueDart/FedEx/DHL Air consignments.
- **Online Users Directory**: Online shopper accounts, VIP collector tiers, newsletter subscribers.
- **Web Promo Codes**: Manage digital voucher codes (`GOLDEN15`, `ROYALHIVE`, `FREESHIP`).
- **Website Product Reviews**: Moderate user-submitted website product ratings.

#### 2. Offline Sales Manager (`/manager/offline-sales/*`)
- **Wholesale & Bulk Revenue Overview**: B2B bulk revenue ($14,271.60), accounts receivable, regional territory distributor pipeline.
- **B2B Invoices & Freight Shipments**: Commercial purchase orders (POs), pallet LTL logistics, commercial Net 30/60 invoices.
- **Retailers & Distributors Directory**: Directory of supermarket chains, organic boutiques, boutique hotels & Ayurvedic pharmacies, credit limits, assigned sales reps.

#### 3. Purchase Manager (`/manager/purchase/*`)
- **COGS & Low-Stock Alerts**: Cost of goods sold tracking ($14.85/jar avg), raw honey silo volume (4,650 kg in 18°C temperature control), critical stock warning alerts.
- **Raw Materials & Batch Tracking**: Food-grade honey drums, 500g/1kg Italian hexagonal glass jars, honeycomb-embossed gold lids, rigid luxury gift boxes, batch harvest dates, and NMR quality records.
- **Supplier Shipping & Inbound Freight Cost**: Ocean container shipping from Italy, mountain refrigerated transport tariffs, supplier lead-time directory.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (Custom luxury gold palette: `#D89816`, `#F5E5B5`, `#1C120A`, `#FCF9F2`)
- **Typography**: `Playfair Display` (Serif headings), `Cinzel` (Royal brand), `Plus Jakarta Sans` (Body & UI)
- **Icons**: Lucide React
- **Animations / Effects**: Canvas-Confetti (Checkout celebration)
- **State Layer**: React Context (`AppContext`) with reactive LocalStorage persistence
- **Ready for Neon DB**: Prepared data contracts in `src/types/index.ts` and Neon DB connection panel in Admin Settings.

---

## 🚀 Running the Project
```bash
# Development Server
npm run dev

# Production Build
npm run build
```
