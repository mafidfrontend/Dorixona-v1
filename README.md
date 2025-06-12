Dorixona V1 - Farmatsevtika Veb Sayti
Loyiha haqida
Veb manzil: https://dorixona-v1.vercel.app

Kodni qanday tahrirlash mumkin?
Ilovangizni tahrirlashning bir necha usuli mavjud.

1. Mahalliy muhitda ishlash
Agar mahalliy kompyuteringizda ishlamoqchi bo'lsangiz, quyidagi amallarni bajaring:

# 1. Repozitoriyani klon qilish
git clone https://github.com/foydalanuvchi/dorixona-v1.git

# 2. Loyiha papkasiga o'tish
cd dorixona-v1

# 3. Zarur paketlarni o'rnatish
npm install

# 4. Rivojlash serverini ishga tushirish
npm run dev

2. To'g'ridan-to'g'ri GitHubda tahrirlash
GitHubdagi istalgan faylga o'ting

O'ng yuqori burchakdagi "Edit" (qalam belgisi) tugmasini bosing

O'zgartirishlarni kiritib, "Commit changes" tugmasini bosing

3. GitHub Codespaces yordamida
GitHub repozitoriyasining asosiy sahifasiga o'ting

"Code" (yashil tugma) ni bosing

"Codespaces" yorlig'ini tanlang

"New codespace" ni bosib yangi muhit yarating

Loyihada qo'llanilgan texnologiyalar
Vite

React.js

Tailwind CSS

Vercel (deploy platformasi)

Loyihani qanday deploy qilish mumkin?
Loyiha Vercel platformasida joylashtirilgan. Yangi versiyalarni deploy qilish uchun:

O'zgarishlarni GitHubga push qiling:

sh
git add .
git commit -m "Yangilanishlar"
git push
Vercel avtomatik ravishda yangi versiyani deploy qiladi

Maxsus domen ulash
Agar saytga maxsus domen ulamoqchi bo'lsangiz:

Vercel dashboardiga kirish

Loyiha Settings > Domains bo'limiga o'tish

Kerakli domenni kiritish va ko'rsatmalarga amal qilish