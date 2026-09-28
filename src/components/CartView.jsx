import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onStartShopping,
  onCheckoutSuccess
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'UZUM2026') {
      setDiscountPercent(10);
      setPromoMessage("Tabriklaymiz! 10% chegirma qo'llandi 🎉");
    } else {
      setPromoMessage("Noto'g'ri promokod. 'UZUM2026' kodini sinab ko'ring!");
    }
  };

  const handleCheckout = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onCheckoutSuccess({
      subtotal,
      discountAmount,
      finalTotal,
      itemsCount: cartItems.length
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrap">
          <ShoppingBag size={36} />
        </div>
        <h2 className="empty-title">Savatingiz hozircha bo'sh</h2>
        <p className="empty-text">
          Bosh sahifaga o'ting va o'zingizga yoqqan mahsulotlarni savatga qo'shing.
        </p>
        <button className="empty-action-btn" onClick={onStartShopping}>
          Mahsulotlar katalogiga o'tish
        </button>
      </div>
    );
  }

  return (
    <div className="cart-view-container">
      {/* Cart Items List */}
      <div className="cart-items-card">
        <div className="cart-header-title">
          <span>Xaridlar savati ({cartItems.length} xil mahsulot)</span>
          <button className="clear-cart-btn" onClick={onClearCart}>
            Savatni tozalash
          </button>
        </div>

        <div className="cart-items-list">
          {cartItems.map(({ product, quantity }) => {
            const lineTotal = product.price * quantity;
            return (
              <div key={product.id} className="cart-item-row" id={`cart-item-${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="cart-item-thumb"
                />

                <div className="cart-item-info">
                  <h4 className="cart-item-title">{product.title}</h4>
                  <div className="cart-item-unit-price">
                    1 dona: {product.price.toLocaleString('uz-UZ')} so'm
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="quantity-stepper">
                  <button
                    className="stepper-btn"
                    onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Kamaytirish"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="stepper-count">{quantity}</span>
                  <button
                    className="stepper-btn"
                    onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                    aria-label="Ko'paytirish"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="cart-item-total">
                  {lineTotal.toLocaleString('uz-UZ')} so'm
                </div>

                <button
                  className="delete-item-btn"
                  onClick={() => onRemoveItem(product.id)}
                  title="O'chirish"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Summary Card */}
      <div className="cart-summary-card">
        <h3 className="summary-title">Buyurtma xulosasi</h3>

        <div className="summary-row">
          <span>Mahsulotlar summasi</span>
          <span>{subtotal.toLocaleString('uz-UZ')} so'm</span>
        </div>

        <div className="summary-row">
          <span>Yetkazib berish</span>
          <span style={{ color: '#10b981', fontWeight: 700 }}>Bepul</span>
        </div>

        {discountAmount > 0 && (
          <div className="summary-row" style={{ color: '#ef4444' }}>
            <span>Promokod chegirmasi</span>
            <span>-{discountAmount.toLocaleString('uz-UZ')} so'm</span>
          </div>
        )}

        {/* Promo code form */}
        <form onSubmit={handleApplyPromo} style={{ margin: '14px 0' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Promokod: UZUM2026"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="form-input"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
            />
            <button
              type="submit"
              className="empty-action-btn"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              Qo'llash
            </button>
          </div>
          {promoMessage && (
            <div style={{ fontSize: '0.78rem', marginTop: '6px', color: discountAmount > 0 ? '#10b981' : '#ef4444' }}>
              {promoMessage}
            </div>
          )}
        </form>

        <div className="summary-total">
          <span>Jami to'lov</span>
          <span style={{ color: 'var(--uzum-primary)', fontSize: '1.35rem' }}>
            {finalTotal.toLocaleString('uz-UZ')} so'm
          </span>
        </div>

        <button className="checkout-btn" onClick={handleCheckout} id="checkout-btn">
          <span>Buyurtma berish</span>
          <ArrowRight size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <ShieldCheck size={16} color="#10b981" />
          <span>Xavfsiz to'lov va 10 kunlik kafolat</span>
        </div>
      </div>
    </div>
  );
}
