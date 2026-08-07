import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Search,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react'
import { cn, formatPrice } from '../lib/utils'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { products, orders, dashboardStats } from '../data/store'

const navItems = [
  { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { id: 'products', label: 'محصولات', icon: Package },
  { id: 'orders', label: 'سفارشات', icon: ShoppingBag },
  { id: 'customers', label: 'مشتریان', icon: Users },
  { id: 'reports', label: 'گزارشات', icon: BarChart3 },
  { id: 'settings', label: 'تنظیمات', icon: Settings },
]

const statusMap = {
  pending: { label: 'در انتظار', color: 'warning', icon: Clock },
  processing: { label: 'در حال پردازش', color: 'primary', icon: CheckCircle },
  shipped: { label: 'ارسال شده', color: 'success', icon: Truck },
  delivered: { label: 'تحویل شده', color: 'success', icon: CheckCircle },
  cancelled: { label: 'لغو شده', color: 'danger', icon: XCircle },
}

interface StatCardProps {
  title: string
  value: string
  change?: number
  icon: React.ElementType
  color: string
}

function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-2xl p-6 border border-border shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-secondary text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-secondary">{value}</h3>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-success' : 'text-red-500'}`}>
              {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(change)}٪</span>
              <span className="text-text-secondary mr-1">نسبت به ماه قبل</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTable />
      case 'orders':
        return <OrdersTable />
      case 'customers':
      case 'reports':
      case 'settings':
        return (
          <div className="bg-surface rounded-2xl p-12 border border-border text-center">
            <div className="w-16 h-16 rounded-full bg-background mx-auto mb-4 flex items-center justify-center text-text-secondary">
              <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">این بخش در نسخه نمایشی فعال نیست</h3>
            <p className="text-text-secondary">در نسخه واقعی، اینجا محتوای مربوط به {navItems.find(i => i.id === activeTab)?.label} قرار می‌گیرد.</p>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 right-0 h-screen w-72 bg-secondary text-white z-50 transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold">پنل مدیریت</h1>
              <span className="text-xs text-white/60">فروشگاه نمونه</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>بازگشت به سایت</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-background rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-secondary">
              {navItems.find((i) => i.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background text-sm text-text-secondary">
              <span>مدیر سیستم</span>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                م
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  )
}

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="فروش کل"
          value={`${formatPrice(dashboardStats.totalSales)} تومان`}
          change={24}
          icon={BarChart3}
          color="bg-blue-500"
        />
        <StatCard
          title="تعداد سفارشات"
          value={dashboardStats.totalOrders.toLocaleString('fa-IR')}
          change={12}
          icon={ShoppingBag}
          color="bg-primary"
        />
        <StatCard
          title="محصولات فعال"
          value={dashboardStats.totalProducts.toLocaleString('fa-IR')}
          icon={Package}
          color="bg-success"
        />
        <StatCard
          title="مشتریان"
          value={dashboardStats.totalCustomers.toLocaleString('fa-IR')}
          change={8}
          icon={Users}
          color="bg-accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-border shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-secondary">آخرین سفارشات</h3>
            <Button variant="outline" size="sm" onClick={() => {}}>
              مشاهده همه
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">کد سفارش</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">مشتری</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">مبلغ</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 5).map((order) => {
                  const status = statusMap[order.status]
                  return (
                    <tr key={order.id} className="hover:bg-background/50">
                      <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm">{formatPrice(order.total)} تومان</td>
                      <td className="px-6 py-4">
                        <Badge variant={status.color as any}>{status.label}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick stats */}
        <div className="bg-surface rounded-2xl border border-border shadow-sm p-6">
          <h3 className="font-bold text-secondary mb-4">وضعیت سفارشات</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-background">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm">در انتظار</span>
              </div>
              <span className="font-bold text-secondary">{dashboardStats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-background">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">تحویل شده امروز</span>
              </div>
              <span className="font-bold text-secondary">۷</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-background">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm">رشد ماهانه</span>
              </div>
              <span className="font-bold text-success">{dashboardStats.monthlyGrowth}٪</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsTable() {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-sm">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            className="w-full h-10 pr-10 pl-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <Button className="gap-2 rounded-xl">
          <Plus className="w-4 h-4" />
          افزودن محصول
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">محصول</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">دسته‌بندی</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">قیمت</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">وضعیت</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-background/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover border border-border"
                    />
                    <span className="text-sm font-medium line-clamp-1 max-w-[200px]">{product.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{product.category}</td>
                <td className="px-6 py-4 text-sm font-medium">{formatPrice(product.price)} تومان</td>
                <td className="px-6 py-4">
                  <Badge variant={product.inStock ? 'success' : 'danger'}>
                    {product.inStock ? 'موجود' : 'ناموجود'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-background text-text-secondary hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-background text-text-secondary hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrdersTable() {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <h3 className="font-bold text-secondary">لیست سفارشات</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">کد سفارش</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">مشتری</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">تاریخ</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">تعداد آیتم</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">مبلغ</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => {
              const status = statusMap[order.status]
              return (
                <tr key={order.id} className="hover:bg-background/50">
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{order.date}</td>
                  <td className="px-6 py-4 text-sm">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium">{formatPrice(order.total)} تومان</td>
                  <td className="px-6 py-4">
                    <Badge variant={status.color as any}>{status.label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
