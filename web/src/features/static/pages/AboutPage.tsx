import { Seo } from '@/components/seo/Seo'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Seo title="درباره ما" />
      <h1 className="text-3xl font-bold text-foreground">درباره ما</h1>
      <p className="mt-6 leading-7 text-gray-600">
        این نمونه فروشگاه آنلاین، یک پیاده‌سازی کامل از بسته پایه «فونداسیون دیل» است که شامل
        سبد خرید، پرداخت، مدیریت محتوا، سئو و ارسال پیامک می‌باشد.
      </p>
      <p className="mt-4 leading-7 text-gray-600">
        هدف ما ارائه پایه‌ای حرفه‌ای، سریع و فارسی‌زبان برای کسب‌وکارهای خرده‌فروشی است تا
        بتوانند با کمترین زمان راه‌اندازی، فروش آنلاین خود را آغاز کنند.
      </p>
    </div>
  )
}
