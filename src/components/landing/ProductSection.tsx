import { Link } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import { products } from '../../data/store'
import { ArrowLeft } from 'lucide-react'

interface ProductSectionProps {
  title: string
  subtitle?: string
  filter?: 'all' | 'discounted' | 'new'
  limit?: number
}

export function ProductSection({ title, subtitle, filter = 'all', limit = 8 }: ProductSectionProps) {
  const filteredProducts = products
    .filter((p) => {
      if (filter === 'discounted') return p.discount && p.discount > 0
      if (filter === 'new') return p.badge === 'جدید'
      return true
    })
    .slice(0, limit)

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-secondary">{title}</h2>
            {subtitle && <p className="text-text-secondary mt-1 text-sm">{subtitle}</p>}
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
          >
            مشاهده همه
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
