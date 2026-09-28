import React, { useState, useRef } from 'react';
import { 
  PlusCircle, 
  TrendingUp, 
  Package, 
  DollarSign, 
  Image as ImageIcon, 
  CheckCircle, 
  Upload, 
  Link as LinkIcon, 
  X,
  FileImage
} from 'lucide-react';

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
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Image mode: 'upload' | 'url' | 'preset'
  const [imageMode, setImageMode] = useState('upload');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert("Iltimos, faqat rasm faylini tanlang (JPG, PNG, WebP)!");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas so it fits smoothly in localStorage without quota issues
        const maxDim = 600;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        setImage(compressedBase64);
        setImagePreview(compressedBase64);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearImage = () => {
    setImage('');
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) return;

    const finalImage = image || '/images/sneakers.jpg';

    const newProd = {
      id: Date.now(),
      title,
      subtitle: subtitle || title,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      category,
      image: finalImage,
      rating: 5.0,
      reviewsCount: 1,
      badge: "Yangi",
      inStock: true,
      installment: `${Math.round(Number(price) / 12).toLocaleString('uz-UZ')} so'm/oy`,
      description: description || "Sotuvchi tomonidan qo'shilgan sifatli mahsulot."
    };

    onAddProduct(newProd);
    setSuccessMsg(true);
    setTitle('');
    setSubtitle('');
    setPrice('');
    setOldPrice('');
    setDescription('');
    clearImage();

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

            {/* Image Upload / Selector Area */}
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Mahsulot Rasmi (Rasm yuklash / URL / Namunalar)</label>
              
              <div className="image-upload-wrapper">
                {/* Method selector tabs */}
                <div className="upload-tabs">
                  <button
                    type="button"
                    className={`upload-tab-btn ${imageMode === 'upload' ? 'active' : ''}`}
                    onClick={() => setImageMode('upload')}
                  >
                    <Upload size={15} />
                    <span>Fayl yuklash</span>
                  </button>

                  <button
                    type="button"
                    className={`upload-tab-btn ${imageMode === 'url' ? 'active' : ''}`}
                    onClick={() => setImageMode('url')}
                  >
                    <LinkIcon size={15} />
                    <span>Rasm URL manzili</span>
                  </button>

                  <button
                    type="button"
                    className={`upload-tab-btn ${imageMode === 'preset' ? 'active' : ''}`}
                    onClick={() => setImageMode('preset')}
                  >
                    <ImageIcon size={15} />
                    <span>Namunaviy rasmlar</span>
                  </button>
                </div>

                {/* 1. File Upload Dropzone */}
                {imageMode === 'upload' && !imagePreview && (
                  <div
                    className={`file-dropzone ${isDragging ? 'dragging' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <div className="dropzone-icon">
                      <Upload size={24} />
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                      Kompyuterdan rasm tanlang yoki shu yerga tashlang
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      PNG, JPG, WebP formatlar qo'llab-quvvatlanadi
                    </div>
                  </div>
                )}

                {/* 2. URL Input */}
                {imageMode === 'url' && !imagePreview && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="https://example.com/rasm.jpg"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      className="form-input"
                      style={{ flex: 1 }}
                    />
                  </div>
                )}

                {/* 3. Preset Samples */}
                {imageMode === 'preset' && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {sampleImages.map((s) => (
                      <button
                        key={s.url}
                        type="button"
                        onClick={() => {
                          setImage(s.url);
                          setImagePreview(s.url);
                        }}
                        className="nav-tab-btn"
                        style={{
                          border: image === s.url ? '2px solid var(--uzum-primary)' : '1px solid var(--border-color)',
                          background: image === s.url ? 'var(--uzum-primary-light)' : 'transparent',
                          padding: '8px 14px'
                        }}
                      >
                        <FileImage size={15} />
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Live Image Preview Card */}
                {imagePreview && (
                  <div className="image-preview-card">
                    <img
                      src={imagePreview}
                      alt="Yuklangan rasm ko'rinishi"
                      className="image-preview-img"
                      onError={() => {
                        alert("Rasm yuklanmadi, to'g'ri rasm manzilini tekshiring!");
                        clearImage();
                      }}
                    />
                    <button
                      type="button"
                      className="remove-preview-btn"
                      onClick={clearImage}
                      title="Rasmni o'chirish"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>
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
