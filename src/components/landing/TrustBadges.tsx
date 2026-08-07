import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Wallet, RotateCcw } from 'lucide-react'
import { trustFeatures } from '../../data/store'

const iconMap: Record<string, React.ReactNode> = {
  shield: <ShieldCheck className="w-7 h-7" />,
  truck: <Truck className="w-7 h-7" />,
  wallet: <Wallet className="w-7 h-7" />,
  'rotate-ccw': <RotateCcw className="w-7 h-7" />,
}

export function TrustBadges() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-primary/20 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {iconMap[feature.icon]}
              </div>
              <div>
                <h3 className="font-bold text-secondary">{feature.title}</h3>
                <p className="text-sm text-text-secondary mt-0.5">بهترین خدمات را تجربه کنید</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
