import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Check, Trash2 } from 'lucide-react';

export default function ProductCard({
  product,
  isLiked,
  onToggleLike,
  onAddToCart,
  userRole,
  onDeleteProduct,
  quantity = 1,
  onQuantityChange
}) {
  const [localQty, setLocalQty] = useState(quantity);
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [priceFlash, setPriceFlash] = useState(false);

  // Keep in sync with parent prop if provided
  const currentQuantity = quantity || localQty;
  const totalPrice = product.price * currentQuantity;

  const handleIncrease = () => {
    const nextQty = currentQuantity + 1;
    setLocalQty(nextQty);
    onQuantityChange?.(product.id, nextQty);
    setPriceFlash(true);
    setTimeout(() => setPriceFlash(false), 250);
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      const nextQty = currentQuantity - 1;
      setLocalQty(nextQty);
      onQuantityChange?.(product.id, nextQty);
      setPriceFlash(true);
      setTimeout(() => setPriceFlash(false), 250);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, currentQuantity);
    setIsJustAdded(true);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1200);
  };

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      {/* Product Image Wrap */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/sneakers.jpg';
          }}
        />

        {/* Category / Promo Badge */}
        {product.badge && (
          <span className="badge-floating">
            {product.badge}
          </span>
        )}

        {/* 2D Vector Sleek Heart (Like) Button */}
        <button
          className={`like-button-2d ${isLiked ? 'liked' : ''}`}
          onClick={() => onToggleLike(product)}
          aria-label={isLiked ? "Saralanganlardan o'chirish" : "Saralanganlarga qo'shish"}
          title={isLiked ? "Saralanganlarda bor" : "Saralanganlarga qo'shish"}
          id={`like-btn-${product.id}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isLiked ? "#ef4444" : "none"}
            stroke={isLiked ? "#ef4444" : "currentColor"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      {/* Product Body */}
      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <span className="rating-star">★</span>
            <span>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-title">{product.title}</h3>
        <p className="product-desc">{product.description}</p>

        {/* Dynamic Price Calculation Box */}
        <div className="product-price-section">
          <div className="price-row">
            <span className="unit-price-label">1 dona narxi:</span>
            {product.oldPrice && (
              <span className="unit-price-val">
                {product.oldPrice.toLocaleString('uz-UZ')} so'm
              </span>
            )}
          </div>

          <div className="total-price-row">
            <span className="total-price-label">
              Jami narx ({quantity} dona):
            </span>
            <span className={`total-price-value ${priceFlash ? 'updated' : ''}`}>
              {totalPrice.toLocaleString('uz-UZ')} so'm
            </span>
          </div>

          {product.installment && (
            <div className="installment-pill">
              Muddatli to'lov: {product.installment}
            </div>
          )}
        </div>

        {/* Counter and Add to Cart Buttons */}
        <div className="product-controls-row">
          {/* Quantity Stepper */}
          <div className="quantity-stepper">
            <button
              className="stepper-btn"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Kamaytirish"
              title="Kamaytirish"
              id={`minus-btn-${product.id}`}
            >
              <Minus size={16} />
            </button>
            <span className="stepper-count">{quantity}</span>
            <button
              className="stepper-btn"
              onClick={handleIncrease}
              aria-label="Ko'paytirish"
              title="Ko'paytirish"
              id={`plus-btn-${product.id}`}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`add-to-cart-btn ${isJustAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            id={`add-cart-btn-${product.id}`}
          >
            {isJustAdded ? (
              <>
                <Check size={18} strokeWidth={3} />
                <span>Qo'shildi!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                <span>Savatga</span>
              </>
            )}
          </button>

          {/* Seller Delete Option */}
          {userRole === 'seller' && onDeleteProduct && (
            <button
              className="delete-item-btn"
              onClick={() => onDeleteProduct(product.id)}
              title="Mahsulotni o'chirish (Sotuvchi huquqi)"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
