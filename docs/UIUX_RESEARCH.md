# UI/UX Research — Persian E-Commerce Base Version

> Research synthesis for building a world-class Persian RTL online shop (Foundation Deal). Combines local competitor analysis (JolfaKala, Aytay Jolfa, AramShop, Basalam, Digikala), global e-commerce best practice, and conversion psychology.

---

## 1. Persian Market Patterns

### Common section stack on successful Persian shops
1. **Top promo strip** — free shipping threshold, support phone, app download.
2. **Sticky header** — logo, search, cart badge, account/login, hamburger menu.
3. **Hero slider / banner** — seasonal promotion + primary CTA.
4. **Category grid** — 4–8 visual category cards.
5. **Featured / best sellers** — highlighted products.
6. **New arrivals** — freshness signal.
7. **Discounted / promo section** — urgency and value.
8. **Trust badges** — ضمانت اصالت, ارسال سریع, بازگشت وجه, پشتیبانی.
9. **Newsletter / app CTA** — email capture.
10. **Multi-column footer** — links, contact, Enamad/Samandehi, social.

### Trust signals that matter in Iran
- **Enamad / Samandehi** badges in footer and checkout.
- **ضمانت اصالت کالا** (authenticity guarantee).
- **۷ روز ضمانت بازگشت** (return guarantee).
- **پرداخت امن** with known gateways (Zarinpal, Zibal).
- **پشتیبانی تلفنی** visible in header/footer.
- **نظرات خریداران** on product pages.

### Category taxonomy observed
- بهداشت خانه, استحمام, بهداشت و مراقبت شخصی
- مراقبت پوست, مراقبت مو, بهداشت دهان و دندان
- محصولات کودک, محصولات غذایی
- آرایشی, سرویس بهداشتی, محصولات عمده

Keep top-level categories small (7–10) for mobile usability.

---

## 2. Global Conversion Best Practices

### Hero & above-the-fold
- Clear value proposition in 6–10 words.
- Supporting subheadline.
- Primary CTA visible without scrolling.
- Product visuals or lifestyle imagery.

### Product cards
- High-quality image with hover zoom.
- Discount badge (top-right in RTL).
- Star rating + review count.
- Strikethrough old price + current price.
- Prominent add-to-cart button.

### Cart & checkout
- Sticky cart summary on mobile.
- Guest checkout option.
- Progress indicator (cart → address → shipping → payment).
- Trust badges near payment CTA.
- Clear shipping cost and final total.

### Search & discovery
- Sticky search in header.
- Autocomplete suggestions.
- Filter by price, category, brand.
- Sort by newest, price, best seller.

### Notifications
- Toast on add-to-cart.
- SMS/email order confirmation.
- Abandoned-cart reminder after 1 hour.

---

## 3. RTL & Localization

- `<html lang="fa" dir="rtl">`.
- Use logical CSS: `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`.
- Mirror directional icons (arrows, chevrons).
- Persian numerals with `font-variant-numeric: tabular-nums`.
- Currency suffix: **تومان**.
- Right-aligned labels and form placeholders.
- RTL-friendly scrollbar styling.

---

## 4. Mobile-First Guidelines

- Product grid: 2 cols mobile → 3 tablet → 4 desktop.
- Touch targets ≥44×44px.
- Bottom-sticky CTA on product and checkout pages.
- Hamburger menu with clear hierarchy.
- Search expands inline or full-screen overlay.
- Sticky header with reduced height on scroll.

---

## 5. Performance & Accessibility

- Lazy-load images below the fold.
- Skeleton screens for data fetching.
- Preconnect to font CDN and API origin.
- `prefers-reduced-motion` support.
- WCAG 2.1 AA contrast ratios.
- Keyboard navigation and focus rings.
- Alt text for all images.
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).

---

## 6. Micro-Interactions & Motion

| Interaction | Effect | Duration |
|---|---|---|
| Card hover | `translateY(-4px)` + larger shadow | 200ms |
| Image hover | `scale(1.05)` | 300ms |
| Button click | `scale(0.97)` | 100ms |
| Add to cart | Toast + cart badge bump | 200ms |
| Scroll reveal | fade-in-up with stagger | 250ms |
| Page transition | fade | 150ms |

Easing: `cubic-bezier(0.4, 0, 0.2, 1)`.

---

## 7. SEO & Messaging Integration

- Unique `<title>` and meta description per page.
- Open Graph tags for social sharing.
- JSON-LD structured data for Organization, WebSite, Product, BreadcrumbList.
- Internal linking between categories and products.
- Persian keyword-friendly URLs (`/products/:slug`, `/categories/:slug`).
- SMS templates are short, personal, and include CTA link.

---

## 8. Application to This Project

This research is implemented in the Foundation Deal through:

- CMS-driven landing sections matching the section stack.
- Feature flags to toggle each section from admin.
- Product cards with badges, ratings, and quick actions.
- Sticky header, mobile drawer, and search overlay.
- Cart context with toast feedback.
- Checkout stepper with COD and gateway placeholders.
- Trust badges in footer and near checkout CTA.
- `react-helmet-async`, JSON-LD, sitemap, robots.txt.
- SMS/messaging service for order updates and abandoned cart.
- RTL logical utilities and Vazirmatn typography.
