import React, { useState } from 'react';
import { PlusCircle, TrendingUp, Package, DollarSign, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function SellerPanel({
  products,
  onAddProduct,
  onDeleteProduct,
  salesStats
}) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [category, setCategory] = useState('Elektronika');
  const [image, setImage] = useState('/images/sneakers.jpg');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) return;

    const newProd = {
      id: Date.now(),
      title,
      subtitle: subtitle || title,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      category,
      image: image || '/images/sneakers.jpg',
      rating: 5.0,
      reviewsCount: 1,
      badge: "Yangi",
      inStock: true,
      installment: `${Math.round(Number(price) / 12).toLocaleString('uz-UZ')} so'm/oy`,
      description: description || "Sotuvchi tomonidan qo'shilgan yuqori sifatli mahsulot."
    };

    onAddProduct(newProd);
    setSuccessMsg(true);
    setTitle('');
    setSubtitle('');
    setPrice('');
    setOldPrice('');
    setDescription('');

    setTimeout(() => {
      setSuccessMsg(false);
    }, 2500);
  };

  const sampleImages = [
    { label: "Sport krossovka", url: "/images/sneakers.jpg" },
    { label: "Smartwatch", url: "/images/smartwatch.jpg" },
    { label: "Quloqchinlar", url: "/images/earbuds.jpg" }
  ];

  return (
    <div className="seller-panel">
      {/* Sales Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(112, 0, 255, 0.12)', color: '#7000FF' }}>
            <Package size={24} />
          </div>
          <div>
            <div className="stat-card-title">Faol Mahsulotlar</div>
            <div className="stat-card-val">{products.length} ta</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-card-title">Sotilgan Buyurtmalar</div>
            <div className="stat-card-val">{salesStats.ordersCount} ta</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div className="stat-card-title">Umumiy Savdo Daromadi</div>
            <div className="stat-card-val">{salesStats.totalRevenue.toLocaleString('uz-UZ')} so'm</div>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="seller-form-card">
        <h3 className="seller-form-title">
          🏪 Yangi Mahsulot Qo'shish (Sotuvchi Kabineti)
        </h3>

        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700
          }}>
            <CheckCircle size={20} />
            <span>Mahsulot muvaffaqiyatli do'konga joylandi!</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Mahsulot Nomi *</label>
              <input
                type="text"
                required
                placeholder="Masalan: Nike Air Zoom"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kategoriya</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option value="Poyabzallar">Poyabzallar</option>
                <option value="Elektronika">Elektronika</option>
                <option value="Gadjetlar">Gadjetlar</option>
                <option value="Kiyim-kechak">Kiyim-kechak</option>
                <option value="Aksessuarlar">Aksessuarlar</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Sotuv Narxi (so'm) *</label>
              <input
                type="number"
                required
                placeholder="150000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Asl Narxi (eski narx - ixtiyoriy)</label>
              <input
                type="number"
                placeholder="200000"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Rasm tanlang yoki URL kiriting</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                {sampleImages.map((s) => (
                  <button
                    key={s.url}
                    type="button"
                    onClick={() => setImage(s.url)}
                    className="nav-tab-btn"
                    style={{
                      border: image === s.url ? '2px solid var(--uzum-primary)' : '1px solid var(--border-color)',
                      background: image === s.url ? 'var(--uzum-primary-light)' : 'transparent',
                      padding: '6px 12px'
                    }}
                  >
                    <ImageIcon size={14} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="/images/sneakers.jpg yoki rasm manzili"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Qisqacha Tavsif</label>
              <textarea
                rows={3}
                placeholder="Mahsulot haqida xaridorlarga ma'lumot..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="empty-action-btn"
            style={{
              marginTop: '20px',
              padding: '12px 28px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <PlusCircle size={20} />
            <span>Mahsulotni Savdoga Chiqarish</span>
          </button>
        </form>
      </div>
    </div>
  );
}
