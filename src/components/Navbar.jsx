import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  ShoppingCart, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  LogIn, 
  Store, 
  Sparkles,
  Archive
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  favoritesCount,
  deletedCount = 0,
  theme,
  toggleTheme,
  user,
  onOpenAuthModal,
  onLogout
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo with animations */}
        <div className="navbar-brand" onClick={() => setActiveTab('products')}>
          <div className="brand-icon-wrapper">
            <ShoppingBag size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">uzum market</span>
            <span className="brand-subtitle">online market</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
            id="tab-products"
          >
            <Sparkles size={16} />
            <span>Mahsulotlar</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
            id="tab-cart"
          >
            <ShoppingCart size={16} />
            <span>Xaridlar</span>
            {cartCount > 0 && (
              <span className="nav-badge pop">{cartCount}</span>
            )}
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
            id="tab-favorites"
          >
            <Heart size={16} />
            <span>Saralanganlar</span>
            {favoritesCount > 0 && (
              <span className="nav-badge pop">{favoritesCount}</span>
            )}
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'trash' ? 'active' : ''}`}
            onClick={() => setActiveTab('trash')}
            id="tab-trash"
            title="O'chirilgan mahsulotlar arxivi"
          >
            <Archive size={16} />
            <span>O'chirilganlar</span>
            {deletedCount > 0 && (
              <span className="nav-badge" style={{ background: '#64748b' }}>{deletedCount}</span>
            )}
          </button>

          {user.loggedIn && user.role === 'seller' && (
            <button
              className={`nav-tab-btn ${activeTab === 'seller' ? 'active' : ''}`}
              onClick={() => setActiveTab('seller')}
              id="tab-seller"
            >
              <Store size={16} />
              <span>Sotuvchi Paneli</span>
            </button>
          )}
        </nav>

        {/* Right side controls: Theme switch, User Profile / Auth */}
        <div className="nav-actions">
          {/* Dark / Light Mode Switch */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun size={20} color="#fbbf24" />
            ) : (
              <Moon size={20} color="#7000FF" />
            )}
          </button>

          {/* User Auth Info & Logout */}
          {user.loggedIn ? (
            <div className="user-menu-pill">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-info-text">
                <span className="user-name">{user.name}</span>
                <span className={`user-role-tag ${user.role}`}>
                  {user.role === 'seller' ? 'Sotuvchi' : 'Xaridor'}
                </span>
              </div>
              <button
                className="logout-btn"
                onClick={onLogout}
                title="Tizimdan chiqish (Logout)"
                id="logout-btn"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              className="login-btn-nav"
              onClick={onOpenAuthModal}
              id="login-btn-nav"
            >
              <LogIn size={16} />
              <span>Kirish / Rol</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
