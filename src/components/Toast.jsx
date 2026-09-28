import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, Info } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const renderIcon = (type) => {
    switch (type) {
      case 'cart':
        return <ShoppingBag size={18} color="#7000FF" />;
      case 'like':
        return <Heart size={18} color="#ef4444" fill="#ef4444" />;
      case 'success':
        return <CheckCircle2 size={18} color="#10b981" />;
      default:
        return <Info size={18} color="#3b82f6" />;
    }
  };

  return (
    <aside className="toast-container" aria-label="Bildirishnomalar">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" onClick={() => onDismiss(toast.id)}>
          <div className="toast-icon-wrap">
            {renderIcon(toast.type)}
          </div>
          <span>{toast.message}</span>
        </div>
      ))}
    </aside>
  );
}
