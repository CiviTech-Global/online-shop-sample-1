import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { HeroSlider } from '../components/landing/HeroSlider'
import { CategoryGrid } from '../components/landing/CategoryGrid'
import { ProductSection } from '../components/landing/ProductSection'
import { TrustBadges } from '../components/landing/TrustBadges'
import { Button } from '../components/ui/Button'
import { ArrowLeft, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="pt-6 pb-4">
          <div className="container mx-auto px-4">
            <HeroSlider />
          </div>
        </section>

        {/* Trust badges */}
        <TrustBadges />

        {/* Categories */}
        <CategoryGrid />

        {/* Featured products */}
        <ProductSection
          title="پرفروش‌ترین محصولات"
          subtitle="محبوب‌ترین کالاهای این هفته را با بهترین قیمت بخرید"
          filter="all"
          limit={8}
        />

        {/* Promo banner */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary to-primary-dark p-8 md:p-12 text-white"
            >
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm mb-4">
                  <Zap className="w-4 h-4" />
                  پیشنهاد شگفت‌انگیز
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">تا ۵۰٪ تخفیف روی محصولات منتخب</h2>
                <p className="text-white/90 mb-6 leading-relaxed">
                  فرصت را از دست ندهید! محصولات با کیفیت را با قیمت‌های استثنایی از فروشگاه نمونه خریداری کنید.
                </p>
                <Button variant="secondary" size="lg" className="gap-2 rounded-full">
                  مشاهده تخفیف‌ها
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[url('/images/banner4.jpg')] bg-cover bg-center opacity-20 hidden md:block" />
            </motion.div>
          </div>
        </section>

        {/* Discounted products */}
        <ProductSection
          title="تخفیف‌های ویژه"
          subtitle="بهترین تخفیف‌های امروز را از دست ندهید"
          filter="discounted"
          limit={4}
        />

        {/* New arrivals */}
        <ProductSection
          title="جدیدترین محصولات"
          subtitle="تازه‌های فروشگاه را مشاهده کنید"
          filter="new"
          limit={4}
        />

        {/* Newsletter */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-secondary rounded-3xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">از جدیدترین تخفیف‌ها باخبر شوید</h2>
              <p className="text-white/70 mb-6">ایمیل خود را وارد کنید تا اولین نفر از تخفیف‌ها مطلع شوید</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="آدرس ایمیل شما"
                  className="flex-1 h-12 px-5 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button variant="primary" size="lg" className="rounded-xl">
                  عضویت
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
