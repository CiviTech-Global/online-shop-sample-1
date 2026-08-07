export interface Product {
  id: number
  title: string
  price: number
  oldPrice?: number
  discount?: number
  image: string
  category: string
  rating: number
  reviews: number
  badge?: string
  inStock: boolean
}

export interface Category {
  id: number
  name: string
  image: string
  count: number
}

export interface Order {
  id: string
  customer: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: number
}

export const categories: Category[] = [
  { id: 1, name: 'بهداشت خانه', image: '/images/product6.webp', count: 42 },
  { id: 2, name: 'محصولات آرایشی', image: '/images/product7.png', count: 38 },
  { id: 3, name: 'مراقبت پوست', image: '/images/product4.jpg', count: 27 },
  { id: 4, name: 'محصولات خوراکی', image: '/images/product5.jpg', count: 55 },
  { id: 5, name: 'بهداشت دهان', image: '/images/product3.jpg', count: 19 },
  { id: 6, name: 'محصولات کودک', image: '/images/product9.jpg', count: 31 },
  { id: 7, name: 'شامپو و مراقبت مو', image: '/images/product10.jpg', count: 24 },
  { id: 8, name: 'لوازم دیجیتال', image: '/images/product11.jpg', count: 63 },
]

export const products: Product[] = [
  {
    id: 1,
    title: 'کپسول ماشین لباسشویی آریل ۶۰ عددی',
    price: 285000,
    oldPrice: 420000,
    discount: 32,
    image: '/images/product1.webp',
    category: 'بهداشت خانه',
    rating: 4.7,
    reviews: 128,
    badge: 'پرفروش',
    inStock: true,
  },
  {
    id: 2,
    title: 'شامپو ترمیم‌کننده قوی مو ۴۰۰ میلی‌لیتر',
    price: 175000,
    oldPrice: 210000,
    discount: 17,
    image: '/images/product2.jpg',
    category: 'شامپو و مراقبت مو',
    rating: 4.5,
    reviews: 86,
    inStock: true,
  },
  {
    id: 3,
    title: 'خمیردندان سفیدکننده حساس ۷۵ میلی‌لیتر',
    price: 95000,
    oldPrice: 120000,
    discount: 21,
    image: '/images/product3.jpg',
    category: 'بهداشت دهان',
    rating: 4.3,
    reviews: 54,
    inStock: true,
  },
  {
    id: 4,
    title: 'اسکراب پاکسازی منافذ پوست ۱۵۰ میلی‌لیتر',
    price: 135000,
    image: '/images/product4.jpg',
    category: 'مراقبت پوست',
    rating: 4.6,
    reviews: 72,
    badge: 'جدید',
    inStock: true,
  },
  {
    id: 5,
    title: 'پودر کاکائو ارگانیک ۲۰۰ گرمی',
    price: 68000,
    oldPrice: 85000,
    discount: 20,
    image: '/images/product5.jpg',
    category: 'محصولات خوراکی',
    rating: 4.8,
    reviews: 215,
    inStock: true,
  },
  {
    id: 6,
    title: 'قرص ماشین ظرفشویی فیری پلاتینیوم ۹۶ عددی',
    price: 890000,
    oldPrice: 1100000,
    discount: 19,
    image: '/images/product6.webp',
    category: 'بهداشت خانه',
    rating: 4.9,
    reviews: 342,
    badge: 'پرفروش',
    inStock: true,
  },
  {
    id: 7,
    title: 'روغن مغذی مو و بدن لورآل ۴۰۰ میلی‌لیتر',
    price: 245000,
    oldPrice: 290000,
    discount: 16,
    image: '/images/product7.png',
    category: 'مراقبت پوست',
    rating: 4.4,
    reviews: 98,
    inStock: true,
  },
  {
    id: 8,
    title: 'سرم آبرسان پوست ۳۰ میلی‌لیتر',
    price: 198000,
    image: '/images/product8.jpeg',
    category: 'مراقبت پوست',
    rating: 4.6,
    reviews: 67,
    badge: 'جدید',
    inStock: true,
  },
  {
    id: 9,
    title: 'پوشک مولفیکس سایز ۶ بسته ۳۹ عددی',
    price: 720000,
    oldPrice: 850000,
    discount: 15,
    image: '/images/product9.jpg',
    category: 'محصولات کودک',
    rating: 4.8,
    reviews: 412,
    badge: 'پرفروش',
    inStock: true,
  },
  {
    id: 10,
    title: 'شامپو گلیس ترمیم‌کننده ۵۰۰ میلی‌لیتر',
    price: 210000,
    oldPrice: 250000,
    discount: 16,
    image: '/images/product10.jpg',
    category: 'شامپو و مراقبت مو',
    rating: 4.5,
    reviews: 156,
    inStock: true,
  },
  {
    id: 11,
    title: 'هدفون بی‌سیم ورزشی با کیفیت صدای بالا',
    price: 1250000,
    oldPrice: 1580000,
    discount: 21,
    image: '/images/product11.jpg',
    category: 'لوازم دیجیتال',
    rating: 4.7,
    reviews: 89,
    badge: 'ویژه',
    inStock: true,
  },
  {
    id: 12,
    title: 'اسپیکر بلوتوثی قابل حمل ۲۰ وات',
    price: 890000,
    oldPrice: 1050000,
    discount: 15,
    image: '/images/product12.jpg',
    category: 'لوازم دیجیتال',
    rating: 4.6,
    reviews: 74,
    inStock: true,
  },
]

export const banners = [
  { id: 1, image: '/images/banner1.webp', alt: 'تخفیف ویژه محصولات بهداشتی' },
  { id: 2, image: '/images/banner2.webp', alt: 'ارسال رایگان' },
  { id: 3, image: '/images/banner3.webp', alt: 'جدیدترین محصولات' },
  { id: 4, image: '/images/banner4.jpg', alt: 'پیشنهاد شگفت‌انگیز' },
  { id: 5, image: '/images/banner5.jpg', alt: 'تخفیف ویژه' },
  { id: 6, image: '/images/banner6.jpg', alt: 'محصولات خارجی' },
]

export const orders: Order[] = [
  { id: 'DK-10042', customer: 'علی محمدی', date: '۱۴۰۳/۱۱/۱۵', total: 1250000, status: 'delivered', items: 3 },
  { id: 'DK-10043', customer: 'سارا کریمی', date: '۱۴۰۳/۱۱/۱۵', total: 890000, status: 'processing', items: 2 },
  { id: 'DK-10044', customer: 'رضا نوری', date: '۱۴۰۳/۱۱/۱۶', total: 2100000, status: 'shipped', items: 5 },
  { id: 'DK-10045', customer: 'مریم رضایی', date: '۱۴۰۳/۱۱/۱۶', total: 450000, status: 'pending', items: 1 },
  { id: 'DK-10046', customer: 'حسن احمدی', date: '۱۴۰۳/۱۱/۱۷', total: 1680000, status: 'delivered', items: 4 },
  { id: 'DK-10047', customer: 'نرگس سلیمانی', date: '۱۴۰۳/۱۱/۱۷', total: 320000, status: 'cancelled', items: 1 },
  { id: 'DK-10048', customer: 'محمد ترابی', date: '۱۴۰۳/۱۱/۱۸', total: 2450000, status: 'processing', items: 6 },
  { id: 'DK-10049', customer: 'فاطمه حسینی', date: '۱۴۰۳/۱۱/۱۸', total: 780000, status: 'pending', items: 2 },
]

export const dashboardStats = {
  totalSales: 245000000,
  totalOrders: 1284,
  totalProducts: 312,
  totalCustomers: 856,
  monthlyGrowth: 24,
  pendingOrders: 18,
}

export const trustFeatures = [
  { id: 1, title: 'ضمانت اصل بودن کالا', icon: 'shield' },
  { id: 2, title: 'ارسال سریع و مطمئن', icon: 'truck' },
  { id: 3, title: 'پرداخت در محل', icon: 'wallet' },
  { id: 4, title: '۷ روز ضمانت بازگشت', icon: 'rotate-ccw' },
]
