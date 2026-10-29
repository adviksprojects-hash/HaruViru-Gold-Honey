import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS, 
  INITIAL_TEAM, 
  INITIAL_COUPONS, 
  INITIAL_RECIPES, 
  INITIAL_RAW_MATERIALS, 
  INITIAL_B2B_DISTRIBUTORS 
} from '../data/mockData';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  // Load state or fallback to initials
  const [currentPersona, setCurrentPersona] = useState('customer');
  const [toasts, setToasts] = useState([]);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('hvg_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('hvg_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('hvg_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('hvg_team');
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('hvg_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('hvg_recipes');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });
  const [rawMaterials, setRawMaterials] = useState(() => {
    const saved = localStorage.getItem('hvg_raw_materials');
    return saved ? JSON.parse(saved) : INITIAL_RAW_MATERIALS;
  });
  const [distributors, setDistributors] = useState(() => {
    const saved = localStorage.getItem('hvg_distributors');
    return saved ? JSON.parse(saved) : INITIAL_B2B_DISTRIBUTORS;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('hvg_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 1, selectedWeight: '500g' }
    ];
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('hvg_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('hvg_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('hvg_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('hvg_team', JSON.stringify(team)); }, [team]);
  useEffect(() => { localStorage.setItem('hvg_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('hvg_recipes', JSON.stringify(recipes)); }, [recipes]);
  useEffect(() => { localStorage.setItem('hvg_raw_materials', JSON.stringify(rawMaterials)); }, [rawMaterials]);
  useEffect(() => { localStorage.setItem('hvg_distributors', JSON.stringify(distributors)); }, [distributors]);
  useEffect(() => { localStorage.setItem('hvg_cart', JSON.stringify(cart)); }, [cart]);

  // Toast handlers
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && cartDiscount > appliedCoupon.maxDiscount) {
        cartDiscount = appliedCoupon.maxDiscount;
      }
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const cartShipping = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = Number((taxableAmount * 0.05).toFixed(2));
  const cartTotal = Number((taxableAmount + cartTax + cartShipping).toFixed(2));

  const addToCart = (product, quantity = 1, weight = product.weight) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedWeight === weight);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedWeight === weight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedWeight: weight }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    const item = cart.find(c => c.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from cart.`, 'info');
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.status === 'active'
    );
    if (!found) {
      showToast('Invalid or expired coupon code.', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrderValue) {
      showToast(`Coupon requires a minimum order of ₹${found.minOrderValue}.`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied! Saved ${found.discountType === 'percentage' ? `${found.discountValue}%` : `₹${found.discountValue}`}.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Product Actions
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added to inventory!`, 'success');
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updates } : prod))
    );
    showToast('Product details updated successfully.', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p))
    );
    showToast(`Stock updated to ${newStock} units.`, 'success');
  };

  // Orders
  const createOrder = (orderData) => {
    const orderNumber = `HVG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      customerName: orderData.customerName || 'Valued Collector',
      customerEmail: orderData.customerEmail || 'collector@haruviru.com',
      customerPhone: orderData.customerPhone || '+1 (555) 000-0000',
      channel: orderData.channel || 'online',
      type: orderData.type || 'B2C',
      items: orderData.items || cart.map(c => ({
        productId: c.product.id,
        productName: c.product.name,
        quantity: c.quantity,
        price: c.product.price,
        weight: c.selectedWeight
      })),
      subtotal: orderData.subtotal ?? cartSubtotal,
      tax: orderData.tax ?? cartTax,
      shippingFee: orderData.shippingFee ?? cartShipping,
      discount: orderData.discount ?? cartDiscount,
      totalAmount: orderData.totalAmount ?? cartTotal,
      status: 'Processing',
      paymentStatus: 'Paid',
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      shippingAddress: orderData.shippingAddress || {
        street: '100 Golden Hive Way',
        city: 'Denver',
        state: 'CO',
        zip: '80202',
        country: 'United States'
      },
      trackingNumber: `HVG-TRACK-${Math.floor(100000 + Math.random() * 900000)}`,
      courierPartner: 'BlueDart Gold Courier',
      invoiceUrl: `#invoice-${orderNumber}`,
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock
    newOrder.items.forEach((item) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === item.productId ? { ...p, stock: Math.max(0, p.stock - item.quantity) } : p
        )
      );
    });

    clearCart();
    showToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, status, tracking, courier) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status,
              ...(tracking ? { trackingNumber: tracking } : {}),
              ...(courier ? { courierPartner: courier } : {})
            }
          : ord
      )
    );
    showToast(`Order status updated to ${status}.`, 'info');
  };

  // Reviews
  const addReview = (reviewData) => {
    const newReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your review has been submitted for moderation.', 'success');
  };

  const updateReviewStatus = (id, status) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Review marked as ${status}.`, 'info');
  };

  const replyToReview = (id, reply) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, adminReply: reply } : r))
    );
    showToast('Reply published to customer review.', 'success');
  };

  // Coupons
  const addCoupon = (couponData) => {
    const newCoupon = {
      ...couponData,
      id: `cp-${Date.now()}`,
      usageCount: 0
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon code "${newCoupon.code}" created!`, 'success');
  };

  const toggleCouponStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'disabled' : 'active' } : c
      )
    );
    showToast('Coupon status updated.', 'info');
  };

  // Recipes
  const addRecipe = (recipeData) => {
    const newRecipe = {
      ...recipeData,
      id: `rec-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      likesCount: 0
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    showToast(`Recipe / Article "${newRecipe.title}" saved!`, 'success');
  };

  const updateRecipe = (id, updates) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
    showToast('Article updated.', 'success');
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    showToast('Article removed.', 'info');
  };

  // Team
  const inviteTeamMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: `usr-${Date.now()}`,
      lastActive: 'Just invited'
    };
    setTeam((prev) => [...prev, newMember]);
    showToast(`Invitation sent to ${newMember.email}!`, 'success');
  };

  const updateTeamMemberRole = (id, role) => {
    setTeam((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          let perms = { ...m.permissions };
          if (role === 'admin') {
            perms = {
              viewAnalytics: true,
              manageProducts: true,
              manageOrders: true,
              manageWholesale: true,
              manageRawMaterials: true,
              manageCoupons: true,
              moderateReviews: true,
              manageTeam: true,
              manageSettings: true
            };
          } else if (role === 'online_sales_manager') {
            perms = {
              viewAnalytics: true,
              manageProducts: false,
              manageOrders: true,
              manageWholesale: false,
              manageRawMaterials: false,
              manageCoupons: true,
              moderateReviews: true,
              manageTeam: false,
              manageSettings: false
            };
          } else if (role === 'offline_sales_manager') {
            perms = {
              viewAnalytics: true,
              manageProducts: false,
              manageOrders: true,
              manageWholesale: true,
              manageRawMaterials: false,
              manageCoupons: false,
              moderateReviews: false,
              manageTeam: false,
              manageSettings: false
            };
          } else if (role === 'purchase_manager') {
            perms = {
              viewAnalytics: true,
              manageProducts: true,
              manageOrders: false,
              manageWholesale: false,
              manageRawMaterials: true,
              manageCoupons: false,
              moderateReviews: false,
              manageTeam: false,
              manageSettings: true
            };
          }
          return { ...m, role, permissions: perms };
        }
        return m;
      })
    );
    showToast('Team member role and permissions updated.', 'success');
  };

  const updateTeamMemberPermissions = (id, permissions) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, permissions } : m))
    );
    showToast('Custom permissions saved.', 'success');
  };

  const updateTeamMemberStatus = (id, status) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    showToast(`Member status updated to ${status}.`, 'info');
  };

  // Purchase / Raw materials
  const updateRawMaterialStock = (id, newStock) => {
    setRawMaterials((prev) =>
      prev.map((mat) => {
        if (mat.id === id) {
          const status = newStock <= mat.minThreshold ? 'Low Stock' : 'Optimal';
          return { ...mat, currentStock: Math.max(0, newStock), status };
        }
        return mat;
      })
    );
    showToast('Raw material stock level updated.', 'success');
  };

  const addRawMaterial = (materialData) => {
    const newMaterial = {
      ...materialData,
      id: `mat-${Date.now()}`
    };
    setRawMaterials((prev) => [newMaterial, ...prev]);
    showToast(`Added "${newMaterial.name}" to procurement inventory.`, 'success');
  };

  // B2B Distributors
  const addDistributor = (distData) => {
    const newDist = {
      ...distData,
      id: `dist-${Date.now()}`,
      totalOrders: 0,
      lifetimeValue: 0
    };
    setDistributors((prev) => [newDist, ...prev]);
    showToast(`Distributor "${newDist.companyName}" registered!`, 'success');
  };

  const updateDistributorStatus = (id, status) => {
    setDistributors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
    showToast(`Distributor status updated to ${status}.`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentPersona,
        setCurrentPersona,
        toasts,
        showToast,
        removeToast,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartShipping,
        cartTotal,
        cartCount,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        orders,
        createOrder,
        updateOrderStatus,
        reviews,
        addReview,
        updateReviewStatus,
        replyToReview,
        coupons,
        addCoupon,
        toggleCouponStatus,
        recipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        team,
        inviteTeamMember,
        updateTeamMemberRole,
        updateTeamMemberPermissions,
        updateTeamMemberStatus,
        rawMaterials,
        updateRawMaterialStock,
        addRawMaterial,
        distributors,
        addDistributor,
        updateDistributorStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
