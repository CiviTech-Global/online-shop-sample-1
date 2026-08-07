import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'success' | 'warning' | 'danger'
}

export function Badge({ children, className, variant = 'primary' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        {
          'bg-primary text-white': variant === 'primary',
          'bg-success text-white': variant === 'success',
          'bg-accent text-secondary': variant === 'warning',
          'bg-red-500 text-white': variant === 'danger',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
