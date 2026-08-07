import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu, X, Heart, Phone } from 'lucide-react'
import { cn } from '../../lib/utils'
import { categories } from '../../data/store'

interface HeaderProps {
  cartCount?: number
}

export function Header({ cartCount = 2 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <header className="sticky top-0 z-50 w-full bg-surface shadow-sm">
      {/* Top bar */}
      <div className="bg-secondary text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸
            </span>
            <span>ارسال رایگان برای خرید بالای ۵۰۰ هزار تومان</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hover:text-accent transition-colors">
              پنل مدیریت
            </Link>
            <span>|</span>
            <Link to="/" className="hover:text-accent transition-colors">
              صفحه اصلی
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-secondary leading-none">فروشگاه نمونه</h1>
              <span className="text-xs text-text-secondary">بازار آنلاین</span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در میان محصولات..."
                className="w-full h-11 pr-12 pl-4 rounded-xl border border-border bg-background text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-2.5 rounded-xl hover:bg-background text-text-secondary hover:text-primary transition-colors relative">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-background text-text-secondary hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-white hover:bg-secondary/90 transition-colors">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">ورود / ثبت‌نام</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-background text-text-secondary"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav - desktop */}
      {!isDashboard && (
        <nav className="hidden md:block border-t border-border">
          <div className="container mx-auto px-4">
            <ul className="flex items-center gap-1 py-2 overflow-x-auto">
              <li>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:bg-background hover:text-primary transition-colors whitespace-nowrap"
                >
                  صفحه اصلی
                </Link>
              </li>
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-text hover:bg-background hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-background transition-colors whitespace-nowrap"
                >
                  همه محصولات
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute top-full right-0 left-0 bg-surface border-b border-border shadow-lg transition-all duration-300',
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full h-11 pr-12 pl-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-background font-medium"
              >
                صفحه اصلی
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-background"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-background text-primary font-medium"
              >
                پنل مدیریت
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
