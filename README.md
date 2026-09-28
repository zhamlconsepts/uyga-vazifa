# 🍇 Mini Uzum Market — 24-Uyga Vazifa

Zamonaviy va ko'rkam dizaynga ega Mini Uzum Market React ilovasi. 

---

## 🚀 Asosiy Imkoniyatlar va Funksiyalar

1. **Mahsulotlar Katalogi va Dinamik Narx**:
   - 3 ta sifatli mahsulot (Sport krossovka, Aqlli soat, TWS quloqchinlar).
   - **[-] va [+]** tugmalari orqali soni o'zgarganda narx avtomatik ravishda ko'payib boradi (masalan: `120 000 so'm` -> `240 000 so'm` -> `360 000 so'm`).
   - 2D zamonaviy SVG yurakcha (Like) tugmasi — chiroyli pop-up animatsiya va hover effektlari bilan.
   - Savatga qo'shish va vizual tasdiq ("Qo'shildi! ✓").

2. **Navigatsiya (Navbar)**:
   - **Mahsulotlar**: Asosiy katalog.
   - **Xaridlar**: Savat bo'limi, mahsulotlar soni va umumiy summa hisoblagichi.
   - **Saralanganlar**: Layk bosilgan barcha mahsulotlar ro'yxati.
   - **Animatsiya**: Uzum Market logotipidagi jonli gradient va mayoqcha (pulse/float) animatsiyasi.

3. **Login / Logout va Rol Menyusi (24-Uyga vazifa)**:
   - Ilova ochilishi bilan zamonaviy modal oyna orqali kirish taklif etiladi.
   - **Xaridor (Buyer)** roli: mahsulotlarni tanlash, saralash, xarid qilish.
   - **Sotuvchi (Seller)** roli: yangi mahsulot qo'shish formasi, do'kon tahlili va savdo statistikasi.
   - Navbar orqali istalgan paytda rolni almashtirish yoki tizimdan chiqish (Logout).

4. **Dark / Light Mode**:
   - Tungi (Dark) va kunduzgi (Light) rejimlar o'rtasida bir klikda o'tish tugmasi.

5. **3 Git Commit**:
   - Loyiha talabga binoan 3 ta mantiqiy va professional commit bilan shakllantirildi.

---

## 🛠️ Ishga tushirish

```bash
# Kutubxonalarni o'rnatish
npm install

# Dasturchi rejimida ishga tushirish
npm run dev

# Ishlab chiqarish versiyasini yig'ish (Build)
npm run build
```

---

## 📦 Git bilan GitHub'ga yuklash (Push):

```bash
git remote add origin <SIZNING_GITHUB_REPO_LINKINGIZ>
git branch -M main
git push -u origin main
```
