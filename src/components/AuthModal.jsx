import React, { useState } from 'react';
import { X, User, Store, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
  initialRole = 'buyer',
  currentName = ''
}) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [name, setName] = useState(currentName || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = name.trim() || (selectedRole === 'seller' ? 'Sotuvchi Azizbek' : 'Xaridor Azizbek');
    onLogin({
      name: finalName,
      role: selectedRole,
      loggedIn: true
    });
    onClose();
  };

  const handleQuickLogin = (role, defaultName) => {
    onLogin({
      name: defaultName,
      role: role,
      loggedIn: true
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Tizimga Kirish & Rol</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '2px' }}>
              Foydalanuvchi roli va avtorizatsiyasi
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Yopish">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Ismingiz yoki Foydalanuvchi nomi</label>
              <input
                type="text"
                placeholder="Masalan: Azizbek"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <label className="form-label">Rolingizni tanlang:</label>
            <div className="role-cards-container">
              {/* Xaridor Role */}
              <div
                className={`role-card-option ${selectedRole === 'buyer' ? 'active' : ''}`}
                onClick={() => setSelectedRole('buyer')}
                id="role-buyer-card"
              >
                <div className="role-option-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <ShoppingBag size={24} />
                </div>
                <div className="role-option-title">Xaridor</div>
                <div className="role-option-desc">
                  Mahsulotlarni tanlash, saralash va xarid qilish
                </div>
              </div>

              {/* Sotuvchi Role */}
              <div
                className={`role-card-option ${selectedRole === 'seller' ? 'active' : ''}`}
                onClick={() => setSelectedRole('seller')}
                id="role-seller-card"
              >
                <div className="role-option-icon" style={{ background: 'rgba(112, 0, 255, 0.15)', color: '#7000FF' }}>
                  <Store size={24} />
                </div>
                <div className="role-option-title">Sotuvchi</div>
                <div className="role-option-desc">
                  Yangi tovar qo'shish, sotuvlar va do'kon tahlili
                </div>
              </div>
            </div>

            <button type="submit" className="modal-submit-btn" id="modal-submit-btn">
              <span>Davom etish ({selectedRole === 'seller' ? 'Sotuvchi' : 'Xaridor'})</span>
            </button>

            {/* Quick 1-Click login buttons */}
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="nav-tab-btn"
                onClick={() => handleQuickLogin('buyer', 'Xaridor Foydalanuvchi')}
                style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
              >
                🛍️ Xaridor testi
              </button>
              <button
                type="button"
                className="nav-tab-btn"
                onClick={() => handleQuickLogin('seller', 'Sotuvchi Do\'kondor')}
                style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
              >
                🏪 Sotuvchi testi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
