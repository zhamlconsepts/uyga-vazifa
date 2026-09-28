import React from 'react';
import { Trash2, RotateCcw, Archive, AlertCircle, ArrowLeft } from 'lucide-react';

export default function TrashView({
  deletedProducts,
  onRestoreProduct,
  onPermanentDelete,
  onRestoreAll,
  onClearTrash,
  onBackToShopping
}) {
  if (deletedProducts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrap" style={{ background: 'rgba(100, 116, 139, 0.12)', color: '#64748b' }}>
          <Archive size={36} />
        </div>
        <h2 className="empty-title">O'chirilgan mahsulotlar yo'q</h2>
        <p className="empty-text">
          O'chirilgan mahsulotlar bu yerda vaqtincha saqlanadi. Istagan payt ularni qayta tiklash yoki butunlay yo'q qilish mumkin.
        </p>
        <button className="empty-action-btn" onClick={onBackToShopping}>
          Mahsulotlar katalogiga qaytish
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header and bulk actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>O'chirilgan Mahsulotlar</span>
            <span className="nav-badge" style={{ background: '#64748b' }}>
              {deletedProducts.length} ta
            </span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '2px' }}>
            Mahsulotlarni katalogga qaytarishingiz yoki butunlay o'chirib tashlashingiz mumkin
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className="nav-tab-btn"
            onClick={onRestoreAll}
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '8px 16px',
              borderRadius: '12px'
            }}
          >
            <RotateCcw size={16} />
            <span>Hammasini tiklash</span>
          </button>

          <button
            className="nav-tab-btn"
            onClick={onClearTrash}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '8px 16px',
              borderRadius: '12px'
            }}
          >
            <Trash2 size={16} />
            <span>Butunlay tozalash</span>
          </button>
        </div>
      </div>

      {/* Grid of deleted products */}
      <div className="products-grid">
        {deletedProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              opacity: 0.9,
              borderColor: 'var(--border-color)',
              background: 'var(--bg-surface)'
            }}
          >
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/sneakers.jpg';
                }}
              />
              <span
                className="badge-floating"
                style={{ background: '#64748b' }}
              >
                O'chirilgan
              </span>
            </div>

            <div className="product-body">
              <div className="product-meta">
                <span className="product-category">{product.category}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  ID: #{product.id.toString().slice(-4)}
                </span>
              </div>

              <h3 className="product-title">{product.title}</h3>
              <p className="product-desc">{product.description}</p>

              <div className="product-price-section" style={{ marginBottom: '16px' }}>
                <div className="total-price-row">
                  <span className="total-price-label">Narxi:</span>
                  <span className="total-price-value" style={{ color: 'var(--text-main)' }}>
                    {product.price.toLocaleString('uz-UZ')} so'm
                  </span>
                </div>
              </div>

              {/* Action Buttons: Qaytarish & Butunlay o'chirish */}
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button
                  type="button"
                  onClick={() => onRestoreProduct(product.id)}
                  className="add-to-cart-btn"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                  }}
                  title="Katalogga qayta tiklash"
                >
                  <RotateCcw size={16} />
                  <span>Qaytarish</span>
                </button>

                <button
                  type="button"
                  onClick={() => onPermanentDelete(product.id)}
                  className="empty-action-btn"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '8px 12px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Butunlay yo'q qilish"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
