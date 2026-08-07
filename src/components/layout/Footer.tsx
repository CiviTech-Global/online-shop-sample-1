import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Camera, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">فروشگاه نمونه</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              فروشگاه آنلاین فارسی‌زبان با طیف گسترده‌ای از محصولات بهداشتی، آرایشی، خوراکی و دیجیتال.
              ارسال سریع، ضمانت اصل بودن و پرداخت در محل.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/" className="hover:text-accent transition-colors">صفحه اصلی</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors">محصولات</Link></li>
              <li><Link to="/dashboard" className="hover:text-accent transition-colors">پنل مدیریت</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">درباره ما</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">تماس با ما</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="#" className="hover:text-accent transition-colors">بهداشت خانه</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">محصولات آرایشی</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">مراقبت پوست</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">محصولات کودک</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">لوازم دیجیتال</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">تماس با ما</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 shrink-0 text-accent" />
                <span>تهران، خیابان آزادی، ساختمان نمونه</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0 text-accent" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 shrink-0 text-accent" />
                <span>info@sample-shop.ir</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6">
          <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center text-xs text-center text-white/60">
            نماد اعتماد
          </div>
          <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center text-xs text-center text-white/60">
            ساماندهی
          </div>
          <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center text-xs text-center text-white/60">
            وزارت صمت
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/50">
          کلیه حقوق مادی و معنوی این سایت محفوظ است. © ۱۴۰۳
        </div>
      </div>
    </footer>
  )
}
