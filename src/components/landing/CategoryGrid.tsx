import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categories } from '../../data/store'

export function CategoryGrid() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary">دسته‌بندی‌های محبوب</h2>
          <Link to="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
            مشاهده همه
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link
                to={`/category/${cat.id}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-surface border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden bg-background border border-border group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-text-secondary">{cat.count} محصول</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
