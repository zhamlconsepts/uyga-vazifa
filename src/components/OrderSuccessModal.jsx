import React from 'react';
import { CheckCircle2, PackageCheck, ArrowRight } from 'lucide-react';

export default function OrderSuccessModal({
  orderData,
  onClose
}) {
  if (!orderData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
        <div style={{ padding: '32px 24px 24px 24px' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <CheckCircle2 size={42} strokeWidth={2.5} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Buyurtmangiz qabul qilindi! 🎉
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Mini Uzum Market tezkor kuryeri buyurtmangizni 1 kun ichida yetkazib beradi.
          </p>

          <div style={{
            background: 'var(--bg-surface-subtle)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'left',
            border: '1px solid var(--border-color)',
            fontSize: '0.88rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Buyurtma raqami:</span>
              <strong style={{ color: 'var(--text-main)' }}>#UZ-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Mahsulotlar soni:</span>
              <span style={{ fontWeight: 600 }}>{orderData.itemsCount} ta</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Yetkazib berish:</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>Bepul (Tezkor)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '8px' }}>
              <span style={{ fontWeight: 700 }}>Jami to'lov:</span>
              <span style={{ color: 'var(--uzum-primary)', fontWeight: 800, fontSize: '1.1rem' }}>
                {orderData.finalTotal.toLocaleString('uz-UZ')} so'm
              </span>
            </div>
          </div>

          <button className="modal-submit-btn" onClick={onClose}>
            <span>Xaridni davom ettirish</span>
            <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
