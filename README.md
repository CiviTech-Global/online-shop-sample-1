<div dir="rtl" align="right">

# فروشگاه آنلاین نمونه (online-shop-sample-1)

یک نمونه کامل full-stack از فروشگاه آنلاین فارسی‌زبان بر پایه **React 19 + TypeScript + Vite** و **Fastify + Prisma + PostgreSQL**.
این پروژه پیاده‌سازی بسته پایه **Foundation Deal** است: سبد خرید، پرداخت، پنل مدیریت، CMS، سئو و پیامک.

---

## قابلیت‌ها

### فروشگاه مشتری
- 🛍️ صفحه اصلی داینامیک با بخش‌های قابل مدیریت (Hero، دسته‌بندی‌ها، محصولات ویژه، بنر تبلیغاتی، ...)
- 🔍 جستجو، فیلتر قیمت و مرتب‌سازی محصولات
- 🛒 سبد خرید با ذخیره‌سازی در localStorage
- 💳 فرم checkout و درگاه پرداخت (Zarinpal / Zibal sandbox)
- 📄 صفحات استاتیک: درباره ما، تماس، قوانین
- 🌐 RTL کامل با فونت **Vazirmatn**
- 🎨 طراحی مدرن با Tailwind CSS v4
- 📱 واکنش‌گرا (Mobile-First)
- 🔎 سئو: Helmet، Open Graph، JSON-LD، `robots.txt`، `sitemap.xml`

### پنل مدیریت
- 📊 داشبورد با KPIها، نمودار فروش و سفارشات اخیر
- 📦 مدیریت محصولات و سفارش‌ها
- ⚙️ تنظیمات سایت (نام، توضیحات، نمایش/مخفی بخش‌ها)
- 🧩 مدیریت بخش‌های صفحه اصلی (CMS)
- 💬 ماژول پیامک: قالب‌ها، ارسال آزمایشی، بازیابی سبد خرید رها شده و لاگ پیامک‌ها
- 🧪 داده‌های نمونه (seed / clear)

---

## فناوری‌ها

| لایه | تکنولوژی |
|---:|---:|
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind CSS v4, React Router 8, React Query 5 |
| Backend | Fastify 5, TypeScript (ESM), Prisma 6, PostgreSQL 16 |
| Payment | Zarinpal / Zibal REST APIs |
| SMS | Kavenegar / SMS.ir (Simulator در حالت توسعه) |

---

## راه‌اندازی محلی

### پیش‌نیازها
- Node.js >= 22
- PostgreSQL 16+ با دیتابیس `online_shop_sample`

### ۱. بک‌اند

<div dir="ltr">

```bash
cd server
cp .env.example .env
# مقادیر DATABASE_URL، JWT_SECRET و ... را در .env تنظیم کنید
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

</div>

### ۲. فرانت‌اند

<div dir="ltr">

```bash
cd web
npm install
npm run dev
```

</div>

فرانت‌اند روی `http://localhost:5173` و بک‌اند روی `http://localhost:3001` اجرا می‌شود.

### اعتبار مدیر پیش‌فرض
- **موبایل:** `09120000000`
- **رمز عبور:** `admin123`

---

## build و lint

<div dir="ltr">

```bash
# Backend
cd server
npm run build
npm run lint

# Frontend
cd web
npm run build
npm run lint
```

</div>

---

## ساختار پروژه

| مسیر | توضیحات |
|---:|---:|
| `server/` | API Fastify، Prisma schema/migrations، seed |
| `web/src/features/` | ماژول‌های فرانت‌اند (catalog, cart, checkout, orders, cms, messages, ...) |
| `web/src/components/` | کامپوننت‌های shared UI و layout |
| `web/public/` | فایل‌های استاتیک (favicon، robots.txt) |

---

## مستندات

- [DESIGN_RULES.md](DESIGN_RULES.md) – قوانین طراحی، UI/UX، سئو و پیامک
- [FEATURES.md](FEATURES.md) – فهرست ویژگی‌ها
- [ROADMAP.md](ROADMAP.md) – نقشه راه توسعه
- [CLIENT_PROPOSAL.md](CLIENT_PROPOSAL.md) – پیشنهاد مشتری

---

## نکته

این پروژه یک **نسخه نمونه و قابل اجرا** برای ارائه به مشتری است. داده‌های نمایشی از طریق Prisma seed ایجاد می‌شوند و بخش‌های مشتری‌رو از API بک‌اند خوانده می‌شوند (بدون داده hardcoded در UI).

</div>
