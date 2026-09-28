import React from 'react';
import { Heart } from 'lucide-react';
import ProductCard from './ProductCard';

export default function FavoritesView({
  favorites,
  onToggleLike,
  onAddToCart,
  userRole,
  onStartShopping,
  cardQuantities,
  onQuantityChange
}) {
  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
          <Heart size={36} />
        </div>
        <h2 className="empty-title">Saralangan mahsulotlar yo'q</h2>
        <p className="empty-text">
          Sizga yoqqan mahsulotlarning yurakcha belgisini (❤️) bosib, ularni bu yerda saqlashingiz mumkin.
        </p>
        <button className="empty-action-btn" onClick={onStartShopping}>
          Mahsulotlarni ko'rish
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Saralangan mahsulotlar ({favorites.length})
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Siz yoqtirgan va keyinroq xarid qilish uchun saqlab qo'ygan mahsulotlaringiz
        </p>
      </div>

      <div className="products-grid">
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cardQuantities?.[product.id] || 1}
            onQuantityChange={onQuantityChange}
            isLiked={true}
            onToggleLike={onToggleLike}
            onAddToCart={onAddToCart}
            userRole={userRole}
          />
        ))}
      </div>
    </div>
  );
}
