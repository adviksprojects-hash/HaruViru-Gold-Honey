export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Imperial Sidr Gold Mountain Honey',
    tagline: 'The King of Nectars harvested from ancient wild Sidr blossoms in high-altitude mountain valleys.',
    category: 'Sidr',
    price: 1499,
    originalPrice: 1899,
    weight: '500g',
    stock: 64,
    lowStockThreshold: 15,
    rating: 4.95,
    reviewCount: 142,
    isBestseller: true,
    isNewHarvest: true,
    isCertifiedOrganic: true,
    purityScore: 99.9,
    batchNumber: 'HV-SDR-2026-08',
    harvestLocation: 'Wadi Doan & Himalayan Foothills (3,200m ASL)',
    moistureContent: '16.4%',
    tastingNotes: ['Warm Caramel', 'Rich Molasses', 'Smoky Herbaceous', 'Butterscotch Finish'],
    description: 'HaruViru Imperial Sidr Gold is revered globally as one of the rarest and most potent raw honeys on earth. Foraged by wild bees exclusively from the nectar of the sacred Ziziphus (Sidr) tree, this honey is unheated, single-origin, and packed with enzymatic vitality and extraordinary antioxidant density.',
    benefits: [
      'Exceptional antibacterial and immune-boosting bio-active factors',
      'Supports deep digestive wellness and soothing stomach relief',
      '100% Raw, Unfiltered, and Cold-Extracted to preserve active royal enzymes',
      'Certified NMR Tested (Nuclear Magnetic Resonance) for 0% added sugars'
    ],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    ],
    cogs: 650,
    sku: 'HV-SIDR-500'
  },
  {
    id: 'prod-2',
    name: 'Royal Himalayan Wildflower Raw Honey',
    tagline: 'A multi-floral golden tapestry gathered from over 40 species of untouched alpine botanical blooms.',
    category: 'Wildflower',
    price: 999,
    originalPrice: 1199,
    weight: '500g',
    stock: 92,
    lowStockThreshold: 20,
    rating: 4.88,
    reviewCount: 98,
    isBestseller: true,
    isNewHarvest: false,
    isCertifiedOrganic: true,
    purityScore: 99.7,
    batchNumber: 'HV-WFL-2026-04',
    harvestLocation: 'High Himalayan Alpine Meadows (2,600m ASL)',
    moistureContent: '17.1%',
    tastingNotes: ['Alpine Blossoms', 'Sun-drenched Citrus', 'Subtle Vanilla', 'Crisp Clean Sweetness'],
    description: 'Harvested by third-generation master beekeepers in high alpine sanctuaries, our Wildflower honey reflects the biodiversity of untouched mountain flora. Smooth, amber-gold, and naturally rich in diverse bee pollen grains for daily wellness rituals.',
    benefits: [
      'Broad-spectrum pollinator flora boosts seasonal environmental resilience',
      'Naturally gentle glycemic index compared to commercial processed sugars',
      'Rich golden glow and silky spreading texture',
      'Never pasteurized or micro-filtered'
    ],
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    cogs: 420,
    sku: 'HV-WLDF-500'
  },
  {
    id: 'prod-3',
    name: 'Wild Forest Acacia Honey with Natural Comb',
    tagline: 'Crystal-clear golden nectar submerged with a fresh cut chunk of pure virgin bee-spun honeycomb.',
    category: 'Acacia',
    price: 1299,
    originalPrice: 1599,
    weight: '500g',
    stock: 38,
    lowStockThreshold: 12,
    rating: 4.92,
    reviewCount: 76,
    isBestseller: false,
    isNewHarvest: true,
    isCertifiedOrganic: true,
    purityScore: 99.8,
    batchNumber: 'HV-ACA-2026-11',
    harvestLocation: 'Deep Pine & Robinia Forest Biosphere',
    moistureContent: '16.8%',
    tastingNotes: ['Light Jasmine', 'Pear Blossom', 'Mild White Tea', 'Delicate Silky Sweet'],
    description: 'Acacia honey is famed for its crystalline transparency and slow crystallization rate due to high natural fructose. Inside each jar rests a generous slab of 100% edible virgin beeswax comb cut directly from the hive frames.',
    benefits: [
      'Chewable pure beeswax contains natural bee propolis and squalene',
      'Very gentle on the stomach, ideal for children and coffee or tea connoisseurs',
      'Enhances the flavor of herbal teas without overpowering subtle botanicals',
      'Zero heating ensures intact probiotic pollen grains'
    ],
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    cogs: 550,
    sku: 'HV-ACAC-500'
  },
  {
    id: 'prod-4',
    name: 'Kashmir Valley White Velvet Honey',
    tagline: 'Extremely rare creamy pearl-white raw honey harvested from high-altitude wild clover and alfalfa.',
    category: 'Himalayan White',
    price: 1699,
    originalPrice: 1999,
    weight: '500g',
    stock: 24,
    lowStockThreshold: 10,
    rating: 4.98,
    reviewCount: 63,
    isBestseller: true,
    isNewHarvest: true,
    isCertifiedOrganic: true,
    purityScore: 100,
    batchNumber: 'HV-WHT-2026-02',
    harvestLocation: 'Kashmir Valley Snowline (3,600m ASL)',
    moistureContent: '15.9%',
    tastingNotes: ['Marshmallow Cream', 'White Truffle Hint', 'Alpine Floral', 'Velvety Frosting'],
    description: 'Known as the "White Gold of the Himalayas", this velvety, naturally whipped raw honey crystallizes into an ultra-fine, pearlescent spread resembling gourmet clotted cream. An unmatched delicacy for artisanal dining and luxury breakfast tables.',
    benefits: [
      'Natural whipped micro-crystal texture spreads like silk butter',
      'Harvested from alpine herbs untouched by agricultural chemicals',
      'High diastase enzyme activity confirmed by German laboratory testing',
      'Artisanal batch yield limited to 500 jars per harvest cycle'
    ],
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    cogs: 750,
    sku: 'HV-WHT-500'
  },
  {
    id: 'prod-5',
    name: 'Raw Hexagonal Honeycomb Master Reserve',
    tagline: 'Whole pristine honey comb slab preserved straight in bespoke wooden presentation casing.',
    category: 'Raw Comb',
    price: 2199,
    originalPrice: 2599,
    weight: '400g',
    stock: 19,
    lowStockThreshold: 8,
    rating: 4.94,
    reviewCount: 41,
    isBestseller: false,
    isNewHarvest: true,
    isCertifiedOrganic: true,
    purityScore: 100,
    batchNumber: 'HV-CMB-2026-09',
    harvestLocation: 'Pristine Forest Apiary Reserve Sanctuary',
    moistureContent: '16.2%',
    tastingNotes: ['Pure Hive Essence', 'Warm Propolis', 'Wildflower Nectar', 'Beeswax Chew'],
    description: 'The closest experience to eating honey directly beside the beehive. Our beekeepers carefully select untouched combs where bees have capped each hexagonal cell with pure white wax. Slice onto artisanal cheeses, charcuterie, or savor directly.',
    benefits: [
      'Purest raw format with zero processing or centrifugation',
      'Contains living royal jelly trace fractions, propolis, and live pollen',
      'Exquisite centerpiece for fine dining, wine tastings, and luxury gifts',
      'Sealed by nature to preserve delicate aromatics'
    ],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    cogs: 950,
    sku: 'HV-COMB-400'
  },
  {
    id: 'prod-6',
    name: 'Artisanal Turmeric & Ginger Infused Gold Honey',
    tagline: 'Ayurvedic therapeutic elixir infused with organic Lakadong turmeric and sun-cured ginger roots.',
    category: 'Infused',
    price: 1149,
    originalPrice: 1399,
    weight: '500g',
    stock: 55,
    lowStockThreshold: 15,
    rating: 4.87,
    reviewCount: 52,
    isBestseller: false,
    isNewHarvest: false,
    isCertifiedOrganic: true,
    purityScore: 99.6,
    batchNumber: 'HV-TMR-2026-05',
    harvestLocation: 'Meghalaya Bio-Reserve & Himalayan Base',
    moistureContent: '17.3%',
    tastingNotes: ['Spicy Ginger Warmth', 'Earthy Golden Turmeric', 'Sweet Amber Honey', 'Peppery Zing'],
    description: 'Rooted in timeless Ayurvedic wisdom. We slowly cold-infuse raw mountain honey with high-curcumin Lakadong turmeric and spicy sun-dried ginger slices for 45 days. The ultimate morning tonic for joint vitality, gut comfort, and immune defense.',
    benefits: [
      'High curcumin synergy enhances golden milk and wellness tonics',
      'Provides natural warmth and throat coat during cold weather',
      '100% natural infusion without extracts, essential oils, or flavorings',
      'Wholesome comfort in warm water or herbal infusion'
    ],
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
    ],
    cogs: 480,
    sku: 'HV-TURM-500'
  },
  {
    id: 'prod-7',
    name: 'High-Altitude Saffron Blossom Infused Gold',
    tagline: 'Imperial honey infused with handpicked Grade-1 Mongra Kashmiri saffron strands.',
    category: 'Infused',
    price: 1999,
    originalPrice: 2399,
    weight: '500g',
    stock: 14,
    lowStockThreshold: 8,
    rating: 4.97,
    reviewCount: 38,
    isBestseller: true,
    isNewHarvest: true,
    isCertifiedOrganic: true,
    purityScore: 99.9,
    batchNumber: 'HV-SFR-2026-03',
    harvestLocation: 'Pampore Saffron Fields & Himalayan Ridge',
    moistureContent: '16.6%',
    tastingNotes: ['Exquisite Saffron Floral', 'Honeyed Rose Petal', 'Deep Golden Amber', 'Rich Royalty'],
    description: 'A royal fusion created for monarchs and connoisseurs. Pure white valley honey steeped with whole crimson saffron threads. Gives desserts, festive sweets, and morning teas an intoxicating aroma and royal crimson-amber glow.',
    benefits: [
      'Abundant in crocin and safranal for mood uplift and radiant skin glow',
      'Genuine handpicked Kashmiri Mongra saffron threads clearly visible in every jar',
      'Handcrafted in small artisan batches of under 200 jars',
      'Presented in heavyweight hexagonal glass jar with embossed gold lid'
    ],
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80'
    ],
    cogs: 890,
    sku: 'HV-SAFF-500'
  },
  {
    id: 'prod-8',
    name: 'Golden Dew Forest Organic Honey',
    tagline: 'Dark honeydew nectar harvested from ancient oak and pine forest canopies.',
    category: 'Wildflower',
    price: 899,
    originalPrice: 1099,
    weight: '1kg',
    stock: 75,
    lowStockThreshold: 18,
    rating: 4.85,
    reviewCount: 69,
    isBestseller: false,
    isNewHarvest: false,
    isCertifiedOrganic: true,
    purityScore: 99.7,
    batchNumber: 'HV-FRST-2026-07',
    harvestLocation: 'Protected Himalayan Oak Biosphere',
    moistureContent: '17.4%',
    tastingNotes: ['Toasted Malt', 'Woody Forest Dew', 'Dark Molasses', 'Lingering Pine Undertone'],
    description: 'A dark, mineral-heavy honey crafted not only from blossoms but from the sweet honeydew droplets on majestic forest trees. Outstanding for marinades, gourmet baking, and rich breakfast granolas.',
    benefits: [
      'Highest mineral concentration (potassium, magnesium, iron) among all honeys',
      'Subtle less-sweet profile preferred by chefs and artisanal bakers',
      'Generous 1kg family reserve size',
      'Cold-pressed and non-irradiated'
    ],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    cogs: 390,
    sku: 'HV-FRST-1000'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productName: 'Imperial Sidr Gold Mountain Honey',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.v@gourmetdigest.com',
    rating: 5,
    date: '2026-10-18',
    comment: 'The depth of flavor in this Sidr honey is unparalleled. You can immediately smell the wild blossom richness upon opening the gold seal. It has a warm, caramel-molasses note that transforms tea and yogurt into an absolute royal treat.',
    status: 'approved',
    verifiedPurchase: true,
    adminReply: 'Thank you Eleanor! Our beekeepers in the high valleys take immense pride in preserving this sacred Sidr harvest.'
  },
  {
    id: 'rev-2',
    productId: 'prod-4',
    productName: 'Kashmir Valley White Velvet Honey',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@culinaryclub.org',
    rating: 5,
    date: '2026-10-15',
    comment: 'I was skeptical about white honey until I tried this. The micro-crystallized texture is literally like frosting or clotted cream! My guests at brunch could not stop raving about it. Worth every single penny.',
    status: 'approved',
    verifiedPurchase: true,
    adminReply: 'We are thrilled you enjoyed it Marcus! Kashmir White Velvet is a rare jewel of our reserve.'
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    productName: 'Wild Forest Acacia Honey with Natural Comb',
    customerName: 'Priya Nambiar',
    customerEmail: 'priya.n@gmail.com',
    rating: 5,
    date: '2026-10-12',
    comment: 'Chewing the raw comb is nostalgic and therapeutic. So pure and transparent, with zero artificial aftertaste. My kids adore a spoonful before school for natural energy.',
    status: 'approved',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-7',
    productName: 'High-Altitude Saffron Blossom Infused Gold',
    customerName: 'Lord Julian Croft',
    customerEmail: 'croft.estate@luxuryfoods.co',
    rating: 5,
    date: '2026-10-09',
    comment: 'Remarkable packaging and genuine whole saffron threads. Makes a magnificent corporate gift for our international executive clients. Ordering another case today.',
    status: 'approved',
    verifiedPurchase: true,
    adminReply: 'Thank you Lord Julian! Our wholesale team is ready to assist your case order.'
  },
  {
    id: 'rev-5',
    productId: 'prod-1',
    productName: 'Imperial Sidr Gold Mountain Honey',
    customerName: 'Devon Miller',
    customerEmail: 'devon.m@test.com',
    rating: 4,
    date: '2026-10-05',
    comment: 'Outstanding honey, though delivery took 4 days instead of 2 due to remote courier routing. The packaging was immaculate with cold-cushioning though.',
    status: 'approved',
    verifiedPurchase: true,
    adminReply: 'Apologies for the courier transit time Devon! We have expanded our express dispatch hubs.'
  },
  {
    id: 'rev-6',
    productId: 'prod-6',
    productName: 'Artisanal Turmeric & Ginger Infused Gold Honey',
    customerName: 'Aarav Patel',
    customerEmail: 'aarav.wellness@ayur.in',
    rating: 5,
    date: '2026-10-21',
    comment: 'Best golden milk base on the market. Real ginger bite and pure Lakadong turmeric. Cleared my throat tickle in two days!',
    status: 'pending',
    verifiedPurchase: true
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord-1001',
    orderNumber: 'HVG-2026-9481',
    date: '2026-10-23',
    customerName: 'Sophia Montgomery',
    customerEmail: 'sophia.mont@gmail.com',
    customerPhone: '+91 98765 43210',
    channel: 'online',
    type: 'B2C',
    items: [
      {
        productId: 'prod-1',
        productName: 'Imperial Sidr Gold Mountain Honey',
        quantity: 2,
        price: 1499,
        weight: '500g'
      },
      {
        productId: 'prod-4',
        productName: 'Kashmir Valley White Velvet Honey',
        quantity: 1,
        price: 1699,
        weight: '500g'
      }
    ],
    subtotal: 4697,
    tax: 234.85,
    shippingFee: 0,
    discount: 500,
    totalAmount: 4431.85,
    status: 'Processing',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: 'Flat 402, Golden Palms, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400050',
      country: 'India'
    },
    trackingNumber: 'BLUEDART-88392174',
    courierPartner: 'BlueDart Express',
    invoiceUrl: '#invoice-9481'
  },
  {
    id: 'ord-1002',
    orderNumber: 'HVG-2026-9480',
    date: '2026-10-22',
    customerName: 'Alexander Hayes',
    customerEmail: 'alex.hayes@apexresidences.com',
    customerPhone: '+91 98112 34567',
    channel: 'online',
    type: 'B2C',
    items: [
      {
        productId: 'prod-5',
        productName: 'Raw Hexagonal Honeycomb Master Reserve',
        quantity: 1,
        price: 2199,
        weight: '400g'
      }
    ],
    subtotal: 2199,
    tax: 109.95,
    shippingFee: 0,
    discount: 0,
    totalAmount: 2308.95,
    status: 'Shipped',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI / NetBanking',
    shippingAddress: {
      street: 'Tower 4, Golf Links Residence',
      city: 'New Delhi',
      state: 'Delhi',
      zip: '110003',
      country: 'India'
    },
    trackingNumber: 'FDX-99201948',
    courierPartner: 'Delhivery Air Express',
    invoiceUrl: '#invoice-9480'
  },
  {
    id: 'ord-1003',
    orderNumber: 'HVG-B2B-8042',
    date: '2026-10-21',
    customerName: 'Gourmet Earth Organics Ltd.',
    customerEmail: 'procurement@gourmetearth.co',
    customerPhone: '+91 99887 76655',
    channel: 'wholesale',
    type: 'B2B',
    items: [
      {
        productId: 'prod-1',
        productName: 'Imperial Sidr Gold Mountain Honey',
        quantity: 120,
        price: 1150,
        weight: '500g'
      },
      {
        productId: 'prod-2',
        productName: 'Royal Himalayan Wildflower Raw Honey',
        quantity: 240,
        price: 750,
        weight: '500g'
      }
    ],
    subtotal: 318000,
    tax: 15900,
    shippingFee: 4500,
    discount: 15000,
    totalAmount: 323400,
    status: 'Processing',
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Wire (RTGS / NEFT)',
    shippingAddress: {
      street: 'Warehouse 12, Logistics Park Sector 62',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560068',
      country: 'India'
    },
    b2bDetails: {
      companyName: 'Gourmet Earth Organics Ltd.',
      taxId: 'GSTIN29AABCG1234F1Z5',
      freightCarrier: 'SafeExpress Pallet Cold-Chain (LTL-404)',
      poNumber: 'PO-GEO-2026-992',
      paymentTerms: 'Net 30 Days'
    },
    trackingNumber: 'FRT-LTL-849201',
    courierPartner: 'SafeExpress Cold-Chain',
    invoiceUrl: '#invoice-b2b-8042'
  },
  {
    id: 'ord-1004',
    orderNumber: 'HVG-2026-9478',
    date: '2026-10-20',
    customerName: 'Catherine Dubois',
    customerEmail: 'catherine.d@parisien.fr',
    customerPhone: '+91 91234 56789',
    channel: 'online',
    type: 'B2C',
    items: [
      {
        productId: 'prod-7',
        productName: 'High-Altitude Saffron Blossom Infused Gold',
        quantity: 2,
        price: 1999,
        weight: '500g'
      }
    ],
    subtotal: 3998,
    tax: 199.90,
    shippingFee: 0,
    discount: 300,
    totalAmount: 3897.90,
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: 'Penthouse 18, Banjara Hills Rd 10',
      city: 'Hyderabad',
      state: 'Telangana',
      zip: '500034',
      country: 'India'
    },
    trackingNumber: 'DHL-EX-739201',
    courierPartner: 'BlueDart Express',
    invoiceUrl: '#invoice-9478'
  },
  {
    id: 'ord-1005',
    orderNumber: 'HVG-B2B-8039',
    date: '2026-10-18',
    customerName: 'Sattva Ayurvedic Wellness Retreats',
    customerEmail: 'supplies@sattvawellness.org',
    customerPhone: '+91 98201 44829',
    channel: 'wholesale',
    type: 'B2B',
    items: [
      {
        productId: 'prod-6',
        productName: 'Artisanal Turmeric & Ginger Infused Gold Honey',
        quantity: 80,
        price: 890,
        weight: '500g'
      },
      {
        productId: 'prod-8',
        productName: 'Golden Dew Forest Organic Honey',
        quantity: 50,
        price: 690,
        weight: '1kg'
      }
    ],
    subtotal: 105700,
    tax: 5285,
    shippingFee: 2500,
    discount: 5000,
    totalAmount: 108485,
    status: 'Shipped',
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Wire (RTGS / NEFT)',
    shippingAddress: {
      street: 'Foothills Estate, Valley Rd',
      city: 'Rishikesh',
      state: 'Uttarakhand',
      zip: '249201',
      country: 'India'
    },
    b2bDetails: {
      companyName: 'Sattva Ayurvedic Wellness Retreats',
      taxId: 'GSTIN05AABCS9912K1Z8',
      freightCarrier: 'SafeExpress Cold Cargo',
      poNumber: 'PO-SATT-2026-44',
      paymentTerms: 'Net 15 Days'
    },
    trackingNumber: 'SAFE-EXP-88402',
    courierPartner: 'SafeExpress Cargo',
    invoiceUrl: '#invoice-b2b-8039'
  }
];

export const INITIAL_TEAM = [
  {
    id: 'usr-1',
    name: 'Haru Viru',
    email: 'admin@haruvirugold.com',
    role: 'admin',
    department: 'Executive Board',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    lastActive: 'Just now',
    permissions: {
      viewAnalytics: true,
      manageProducts: true,
      manageOrders: true,
      manageWholesale: true,
      manageRawMaterials: true,
      manageCoupons: true,
      moderateReviews: true,
      manageTeam: true,
      manageSettings: true,
    }
  },
  {
    id: 'usr-2',
    name: 'Seraphina Vance',
    email: 'seraphina.sales@haruvirugold.com',
    role: 'online_sales_manager',
    department: 'Digital Commerce & Growth',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    lastActive: '12m ago',
    permissions: {
      viewAnalytics: true,
      manageProducts: false,
      manageOrders: true,
      manageWholesale: false,
      manageRawMaterials: false,
      manageCoupons: true,
      moderateReviews: true,
      manageTeam: false,
      manageSettings: false,
    }
  },
  {
    id: 'usr-3',
    name: 'Vikramaditya Roy',
    email: 'vikram.b2b@haruvirugold.com',
    role: 'offline_sales_manager',
    department: 'B2B & Retail Distribution',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    lastActive: '45m ago',
    permissions: {
      viewAnalytics: true,
      manageProducts: false,
      manageOrders: true,
      manageWholesale: true,
      manageRawMaterials: false,
      manageCoupons: false,
      moderateReviews: false,
      manageTeam: false,
      manageSettings: false,
    }
  },
  {
    id: 'usr-4',
    name: 'Ethan Thorne',
    email: 'ethan.supply@haruvirugold.com',
    role: 'purchase_manager',
    department: 'Procurement & Apiary Operations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    lastActive: '2 hours ago',
    permissions: {
      viewAnalytics: true,
      manageProducts: true,
      manageOrders: false,
      manageWholesale: false,
      manageRawMaterials: true,
      manageCoupons: false,
      moderateReviews: false,
      manageTeam: false,
      manageSettings: true,
    }
  }
];

export const INITIAL_COUPONS = [
  {
    id: 'cp-1',
    code: 'GOLDEN15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 1499,
    maxDiscount: 500,
    applicableChannel: 'online',
    expiryDate: '2026-12-31',
    usageCount: 148,
    usageLimit: 500,
    status: 'active'
  },
  {
    id: 'cp-2',
    code: 'ROYALHIVE',
    discountType: 'fixed',
    discountValue: 300,
    minOrderValue: 2499,
    applicableChannel: 'all',
    expiryDate: '2026-11-30',
    usageCount: 89,
    usageLimit: 250,
    status: 'active'
  },
  {
    id: 'cp-3',
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 99,
    minOrderValue: 499,
    applicableChannel: 'online',
    expiryDate: '2026-12-15',
    usageCount: 312,
    usageLimit: 1000,
    status: 'active'
  },
  {
    id: 'cp-4',
    code: 'WHOLESALE500',
    discountType: 'fixed',
    discountValue: 5000,
    minOrderValue: 50000,
    applicableChannel: 'wholesale',
    expiryDate: '2026-12-31',
    usageCount: 12,
    usageLimit: 50,
    status: 'active'
  }
];

export const INITIAL_RECIPES = [
  {
    id: 'rec-1',
    title: 'Warm Golden Milk Elixir with Raw Sidr Honey',
    slug: 'warm-golden-milk-elixir-sidr-honey',
    category: 'Immunity & Ayurveda',
    author: 'Chef Ananya Sharma',
    readTime: '4 min read',
    date: '2026-10-14',
    summary: 'A restorative nocturnal tonic blending creamy oat milk, fresh turmeric root, cracked black pepper, and rich Sidr honey stirred at soothing drinking temperature.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    prepTime: '5 mins',
    cookTime: '7 mins',
    servings: '2 mugs',
    honeyTypeUsed: 'Imperial Sidr Gold Mountain Honey',
    ingredients: [
      '2 cups unsweetened oat or almond milk',
      '1 tablespoon freshly grated raw turmeric root',
      '1/2 teaspoon ground Ceylon cinnamon',
      'Small pinch of cracked black pepper (boosts turmeric bioavailability)',
      '1/4 teaspoon cardamom powder',
      '2 generous tablespoons HaruViru Imperial Sidr Gold Honey (stirred in off the heat)'
    ],
    instructions: [
      'Gently simmer the oat milk in a small saucepan with turmeric, cinnamon, cardamom, and black pepper for 5 minutes over medium-low heat.',
      'Remove saucepan completely from the stove and let it cool down to warm drinking temperature (approx 45°C) to keep raw honey enzymes intact.',
      'Whisk in HaruViru Imperial Sidr Gold Honey until smoothly dissolved.',
      'Pour into warm ceramic mugs, dust with extra cinnamon, and sip peacefully before sleep.'
    ],
    content: `Raw honey is a living food. When we boil raw honey, delicate diastase, invertase, and glucose oxidase enzymes degrade. By letting your turmeric milk cool to comfortable sipping temperature before stirring in your HaruViru Sidr Honey, you preserve 100% of its antimicrobial power and silky caramel mouthfeel.`,
    status: 'published',
    likesCount: 238
  },
  {
    id: 'rec-2',
    title: 'Artisanal Goat Cheese, Thyme & Honeycomb Crostini',
    slug: 'goat-cheese-thyme-honeycomb-crostini',
    category: 'Gourmet Recipes',
    author: 'Executive Chef Julian Laurent',
    readTime: '6 min read',
    date: '2026-10-10',
    summary: 'Golden-toasted rustic sourdough smeared with whipped chèvre goat cheese, fresh wild thyme sprigs, and topped with a slice of virgin honeycomb.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    prepTime: '10 mins',
    cookTime: '5 mins',
    servings: '6 servings',
    honeyTypeUsed: 'Raw Hexagonal Honeycomb Master Reserve',
    ingredients: [
      '1 loaf rustic country sourdough, sliced 1/2-inch thick',
      '200g soft fresh chèvre goat cheese',
      '2 tbsp extra virgin olive oil',
      '4-6 slices of HaruViru Raw Hexagonal Honeycomb',
      'Fresh garden thyme leaves',
      'Flaky Maldon sea salt'
    ],
    instructions: [
      'Brush sourdough slices lightly with olive oil and toast on a hot cast iron grill until crisp with golden char marks.',
      'Generously spread whipped goat cheese over warm toast.',
      'Using a warm sharp knife, cut rectangular bite-sized pieces of raw honeycomb and place atop each crostini.',
      'Scatter fresh thyme leaves and finish with a delicate pinch of flaky salt.'
    ],
    content: `The contrast between the tangy, creamy chèvre cheese and the warm, floral, chewable wax comb of HaruViru Honeycomb creates an explosion of luxury textures on the palate. A staple for sophisticated dinner gatherings.`,
    status: 'published',
    likesCount: 184
  },
  {
    id: 'rec-3',
    title: 'The Art of Ethical Beekeeping in Himalayan Sanctuaries',
    slug: 'art-of-ethical-beekeeping-himalayan-sanctuaries',
    category: 'Beekeeping Chronicles',
    author: 'Haru Viru Founder',
    readTime: '8 min read',
    date: '2026-09-28',
    summary: 'Why we leave 40% of honey reserves for our bee colonies through winter, eliminate migratory stress, and practice regenerative apiculture.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    honeyTypeUsed: 'Royal Himalayan Wildflower Raw Honey',
    content: `Commercial industrial beekeeping has turned the humble honeybee into an overworked cog in factory farming. At HaruViru, we return to the ancestral pact between human and bee. We never feed our hives high-fructose corn syrup or sugar water. Every drop of HaruViru honey comes strictly from wild nectar gathered by thriving, healthy bees dwelling in protected alpine nature reserves.`,
    status: 'published',
    likesCount: 412
  }
];

export const INITIAL_RAW_MATERIALS = [
  {
    id: 'mat-1',
    code: 'RAW-SIDR-DRUM-A',
    name: 'Raw Mountain Sidr Honey (Bulk Food Grade Drum)',
    category: 'Raw Honey Drums',
    supplier: 'Al-Doani Apiary Co-op & Highland Harvesters',
    currentStock: 1450,
    unit: 'kg',
    minThreshold: 500,
    unitCost: 450,
    harvestDate: '2026-09-15',
    purityScore: '99.9% NMR',
    moistureLevel: '16.4%',
    status: 'Optimal',
    location: 'Silo Bay Alpha, Temperature Controlled (18°C)'
  },
  {
    id: 'mat-2',
    code: 'RAW-WLDF-DRUM-B',
    name: 'Highland Wildflower Honey (Bulk Drum)',
    category: 'Raw Honey Drums',
    supplier: 'Alpine Valley Beekeepers Guild',
    currentStock: 3200,
    unit: 'kg',
    minThreshold: 800,
    unitCost: 280,
    harvestDate: '2026-08-30',
    purityScore: '99.7% NMR',
    moistureLevel: '17.1%',
    status: 'Optimal',
    location: 'Silo Bay Beta'
  },
  {
    id: 'mat-3',
    code: 'JAR-HEX-500',
    name: 'Heavyweight Hexagonal Flint Glass Jars 500g',
    category: 'Glass Jars',
    supplier: 'Veritas Italian Luxury Glassworks',
    currentStock: 850,
    unit: 'units',
    minThreshold: 1200,
    unitCost: 28,
    status: 'Low Stock',
    location: 'Packaging Warehouse Rack C2'
  },
  {
    id: 'mat-4',
    code: 'LID-GOLD-EMBOSS',
    name: 'Gold Metallic Lug Caps with Honeycomb Emboss (63mm)',
    category: 'Gold Metal Lids',
    supplier: 'Crown Seal & Cap Packaging',
    currentStock: 3400,
    unit: 'units',
    minThreshold: 1000,
    unitCost: 6,
    status: 'Optimal',
    location: 'Packaging Warehouse Rack D1'
  },
  {
    id: 'mat-5',
    code: 'BOX-GIFT-ROYAL',
    name: 'Rigid Gold-Foil Gift Boxes with Velvet Inlay',
    category: 'Luxury Boxes',
    supplier: 'Prestige Artisan Box Co.',
    currentStock: 280,
    unit: 'units',
    minThreshold: 350,
    unitCost: 45,
    status: 'Low Stock',
    location: 'Packaging Warehouse Rack E4'
  }
];

export const INITIAL_B2B_DISTRIBUTORS = [
  {
    id: 'dist-1',
    companyName: 'Gourmet Earth Organics Ltd.',
    contactPerson: 'Sarah Jenkins',
    email: 'procurement@gourmetearth.co',
    phone: '+91 99887 76655',
    category: 'Supermarket Chain',
    creditLimit: 500000,
    outstandingBalance: 323400,
    paymentTerms: 'Net 30',
    totalOrders: 14,
    lifetimeValue: 1850000,
    status: 'Active',
    assignedRep: 'Vikramaditya Roy',
    city: 'Bengaluru, KA'
  },
  {
    id: 'dist-2',
    companyName: 'Sattva Ayurvedic Wellness Retreats',
    contactPerson: 'Dr. Mohan Rawat',
    email: 'supplies@sattvawellness.org',
    phone: '+91 98201 44829',
    category: 'Ayurvedic Pharmacy',
    creditLimit: 300000,
    outstandingBalance: 108485,
    paymentTerms: 'Net 15',
    totalOrders: 9,
    lifetimeValue: 850000,
    status: 'Active',
    assignedRep: 'Vikramaditya Roy',
    city: 'Rishikesh, UK'
  },
  {
    id: 'dist-3',
    companyName: 'Artisan Pantry Boutique Mumbai',
    contactPerson: 'Matteo Bellini',
    email: 'matteo@artisanpantry.in',
    phone: '+91 22 5550 0199',
    category: 'Organic Boutique',
    creditLimit: 200000,
    outstandingBalance: 0,
    paymentTerms: 'Net 30',
    totalOrders: 6,
    lifetimeValue: 620000,
    status: 'Active',
    assignedRep: 'Vikramaditya Roy',
    city: 'Mumbai, MH'
  },
  {
    id: 'dist-4',
    companyName: 'Four Seasons Alpine Spa & Resort',
    contactPerson: 'Helena Berg',
    email: 'procurement.spa@fs-alpine.com',
    phone: '+91 11 5554 4310',
    category: 'Gourmet Cafe Group',
    creditLimit: 600000,
    outstandingBalance: 85000,
    paymentTerms: 'Net 60',
    totalOrders: 11,
    lifetimeValue: 1450000,
    status: 'Active',
    assignedRep: 'Vikramaditya Roy',
    city: 'New Delhi, DL'
  }
];

export const INITIAL_FAQS = [
  {
    id: 'faq-1',
    category: 'Purity & Quality',
    question: 'How do you guarantee that HaruViru Gold Honey is 100% pure and raw?',
    answer: 'Every harvest batch of HaruViru Gold Honey undergoes high-resolution NMR (Nuclear Magnetic Resonance) profiling and third-party laboratory isotopic testing to confirm zero presence of added sugar syrups, rice syrup, or adulterants. We never pasteurize (heat above hive temperatures of 36°C) and never micro-filter, leaving all beneficial pollen, live enzymes, and propolis in their natural state.'
  },
  {
    id: 'faq-2',
    category: 'Purity & Quality',
    question: 'My honey crystallized into a creamy solid. Is it still safe to eat?',
    answer: 'Yes! Crystallization is the single greatest natural proof of 100% pure, unheated, unpasteurized raw honey. Commercial processed honey with heated syrups never crystallizes because all pollen nucleation points have been destroyed. If you prefer a liquid consistency, gently place your glass jar in warm water (under 40°C) for 15-20 minutes.'
  },
  {
    id: 'faq-3',
    category: 'Orders & Shipping',
    question: 'How are the glass jars protected during transit?',
    answer: 'We use custom biodegradable molded pulp shells and heavy corrugated air-cushioned packaging engineered to withstand drops up to 2 meters. During summer months or express air transit, we include temperature-reflective wraps to maintain hive conditions.'
  },
  {
    id: 'faq-4',
    category: 'Orders & Shipping',
    question: 'What is the shipping timeframe and threshold for free shipping?',
    answer: 'We provide complimentary standard shipping on all retail orders over ₹999 across India. Standard delivery arrives within 3-5 business days. Express Priority 1-2 day delivery is available at checkout.'
  },
  {
    id: 'faq-5',
    category: 'Wholesale & B2B',
    question: 'How do I place a bulk or wholesale order for my specialty boutique or restaurant?',
    answer: 'You can explore our B2B wholesale catalog or contact our Offline Sales Team directly via our Wholesale inquiry form. We support pallet shipping, custom food service pails, private-label reserve batches, and standard Net 30/60 commercial credit terms.'
  },
  {
    id: 'faq-6',
    category: 'Storage & Health',
    question: 'Does raw honey ever expire?',
    answer: 'Pure raw honey with moisture below 18% is one of the only naturally non-perishable foods on earth. Archaeologists have discovered 3,000-year-old honey in ancient Egyptian tombs that was still fully edible! Store your HaruViru jar at room temperature with the lid tightly closed, away from direct sunlight.'
  }
];
