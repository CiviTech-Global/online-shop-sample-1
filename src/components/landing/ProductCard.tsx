import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatPrice } from '../../lib/utils'
import type { Product } from '../../data/store'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square bg-background overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <div className="absolute top-3 right-3">
            <Badge variant="danger">{product.discount}٪</Badge>
          </div>
        )}
        {product.badge && !product.discount && (
          <div className="absolute top-3 right-3">
            <Badge variant="success">{product.badge}</Badge>
          </div>
        )}

        {/* Quick actions */}
        <div className="absolute left-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors ${
              isLiked ? 'text-red-500' : 'text-text-secondary hover:text-primary'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-text-secondary mb-1.5">{product.category}</div>
        <h3 className="text-sm font-medium text-text line-clamp-2 mb-3 min-h-[2.75rem] group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-text-secondary">({product.reviews})</span>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-sm text-text-secondary line-through">
                {formatPrice(product.oldPrice)} تومان
              </span>
            )}
            <span className="text-lg font-bold text-primary tabular-nums-fa">
              {formatPrice(product.price)} تومان
            </span>
          </div>
          <Button size="sm" className="rounded-full w-10 h-10 p-0">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
