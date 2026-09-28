import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartView from './components/CartView';
import FavoritesView from './components/FavoritesView';
import SellerPanel from './components/SellerPanel';
import AuthModal from './components/AuthModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import Toast from './components/Toast';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Sparkles, Shield, Truck, Zap, Filter, PlusCircle } from 'lucide-react';

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('uzum_theme');
    return saved || 'light';
  });

  // User auth and role state (starts unauthenticated so login modal pops up initially as requested!)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('uzum_user');
    return saved ? JSON.parse(saved) : { name: '', role: 'buyer', loggedIn: false };
  });

  // Login modal open state (initially true if user is not logged in)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    const saved = localStorage.getItem('uzum_user');
    return saved ? !JSON.parse(saved).loggedIn : true;
  });

  // Navigation tab: 'products' | 'cart' | 'favorites' | 'seller'
  const [activeTab, setActiveTab] = useState('products');

  // Products catalog
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('uzum_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Liked product IDs (Saralanganlar)
  const [likedIds, setLikedIds] = useState(() => {
    const saved = localStorage.getItem('uzum_liked');
    return saved ? JSON.parse(saved) : [1]; // 1st product liked by default to show functionality
  });

  // Cart items: [ { product, quantity } ]
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('uzum_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sales statistics for seller
  const [salesStats, setSalesStats] = useState(() => {
    const saved = localStorage.getItem('uzum_sales');
    return saved ? JSON.parse(saved) : { ordersCount: 3, totalRevenue: 840000 };
  });

  // Category filter on catalog
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Checkout order success modal data
  const [orderModalData, setOrderModalData] = useState(null);

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('uzum_theme', theme);
  }, [theme]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('uzum_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('uzum_liked', JSON.stringify(likedIds));
  }, [likedIds]);

  useEffect(() => {
    localStorage.setItem('uzum_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('uzum_sales', JSON.stringify(salesStats));
  }, [salesStats]);

  useEffect(() => {
    localStorage.setItem('uzum_user', JSON.stringify(user));
  }, [user]);

  // Toast helper
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    showToast(theme === 'light' ? "Tungi rejim yoqildi 🌙" : "Kunduzgi rejim yoqildi ☀️", 'info');
  };

  // Auth actions
  const handleLogin = (newUser) => {
    setUser(newUser);
    showToast(`Xush kelibsiz, ${newUser.name}! (${newUser.role === 'seller' ? 'Sotuvchi' : 'Xaridor'})`, 'success');
  };

  const handleLogout = () => {
    setUser({ name: '', role: 'buyer', loggedIn: false });
    setIsAuthModalOpen(true);
    showToast("Tizimdan chiqildi. Qayta kirish mumkin.", 'info');
  };

  // Like toggle
  const handleToggleLike = (product) => {
    setLikedIds(prev => {
      const isAlreadyLiked = prev.includes(product.id);
      if (isAlreadyLiked) {
        showToast(`"${product.title}" saralanganlardan olib tashlandi`, 'info');
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`"${product.title}" saralanganlarga qo'shildi ❤️`, 'like');
        return [...prev, product.id];
      }
    });
  };

  // Add to cart
  const handleAddToCart = (product, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.title}" savatga qo'shildi (${quantity} dona) 🛒`, 'cart');
  };

  // Update cart item quantity
  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove from cart
  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast("Mahsulot savatdan olib tashlandi", 'info');
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
    showToast("Savat tozalandi", 'info');
  };

  // Checkout success
  const handleCheckoutSuccess = (orderData) => {
    setCartItems([]);
    setSalesStats(prev => ({
      ordersCount: prev.ordersCount + 1,
      totalRevenue: prev.totalRevenue + orderData.finalTotal
    }));
    setOrderModalData(orderData);
  };

  // Seller: add product
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`"${newProduct.title}" do'konga muvaffaqiyatli qo'shildi!`, 'success');
  };

  // Seller: delete product
  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
    setLikedIds(prev => prev.filter(id => id !== productId));
    showToast("Mahsulot katalogdan o'chirildi", 'info');
  };

  // Derived counts
  const cartTotalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const favoritesList = products.filter(p => likedIds.includes(p.id));

  // Category filtering
  const categories = ['All', 'Poyabzallar', 'Elektronika', 'Gadjetlar'];
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="app-container">
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalItems}
        favoritesCount={likedIds.length}
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* CATALOG VIEW */}
        {activeTab === 'products' && (
          <div>
            {/* Hero / Promotion Banner */}
            <section className="hero-banner">
              <div className="hero-content">
                <h1>
                  {user.loggedIn ? `Salom, ${user.name}! 👋` : "Mini Uzum Marketga xush kelibsiz! 👋"}
                </h1>
                <p>
                  Sifatli mahsulotlar, qulay narxlar va 1 kunda bepul yetkazib berish xizmati. 
                  Yurakcha orqali saralanganlarga qo'shing va miqdorni o'zingiz belgilang!
                </p>
              </div>

              <div className="hero-stats">
                <div className="stat-chip">
                  <Truck size={18} color="#7000FF" />
                  <span>Yetkazish: <span className="highlight">1 kun</span></span>
                </div>
                <div className="stat-chip">
                  <Shield size={18} color="#10b981" />
                  <span>Kafolat: <span className="highlight">10 kun</span></span>
                </div>
              </div>
            </section>

            {/* Category Filter Pills and Quick Add Product */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '22px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="nav-tab-btn"
                    style={{
                      background: selectedCategory === cat ? 'var(--uzum-primary)' : 'var(--bg-surface)',
                      color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontWeight: 700
                    }}
                  >
                    {cat === 'All' ? 'Barcha mahsulotlar' : cat}
                  </button>
                ))}
              </div>

              <button
                className="empty-action-btn"
                onClick={() => {
                  if (user.role !== 'seller') {
                    setUser(prev => ({ ...prev, role: 'seller', loggedIn: true, name: prev.name || 'Sotuvchi' }));
                  }
                  setActiveTab('seller');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '0.88rem'
                }}
              >
                <PlusCircle size={16} />
                <span>+ Yangi mahsulot (Rasm bilan)</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLiked={likedIds.includes(product.id)}
                  onToggleLike={handleToggleLike}
                  onAddToCart={handleAddToCart}
                  userRole={user.role}
                  onDeleteProduct={user.role === 'seller' ? handleDeleteProduct : null}
                />
              ))}
            </div>
          </div>
        )}

        {/* CART (XARIDLAR) VIEW */}
        {activeTab === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onStartShopping={() => setActiveTab('products')}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        )}

        {/* FAVORITES (SARALANGANLAR) VIEW */}
        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favoritesList}
            onToggleLike={handleToggleLike}
            onAddToCart={handleAddToCart}
            userRole={user.role}
            onStartShopping={() => setActiveTab('products')}
          />
        )}

        {/* SELLER PANEL VIEW */}
        {activeTab === 'seller' && user.role === 'seller' && (
          <SellerPanel
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            salesStats={salesStats}
          />
        )}
      </main>

      {/* Login & Role Selection Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        initialRole={user.role || 'buyer'}
        currentName={user.name}
      />

      {/* Checkout Order Success Modal */}
      <OrderSuccessModal
        orderData={orderModalData}
        onClose={() => {
          setOrderModalData(null);
          setActiveTab('products');
        }}
      />
    </div>
  );
}
