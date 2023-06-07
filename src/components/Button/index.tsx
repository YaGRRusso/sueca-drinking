import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const sizeVariants = {
  sm: 'px-4',
  md: 'px-8',
}

const variantVariants = {
  default:
    'bg-slate-300 bg-opacity-20 bg-clip-padding shadow-sm backdrop-blur-md backdrop-filter dark:bg-slate-800 dark:bg-opacity-30 py-2 h-12',
  light: 'rounded-lg p-2 hover:dark:bg-slate-800 hover:bg-slate-200 ',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  size?: keyof typeof sizeVariants
  variant?: keyof typeof variantVariants
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size = 'md', variant = 'default', asChild, children, className, ...rest },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={clsx(
          'flex items-center justify-center gap-2 rounded-3xl text-xl font-semibold transition-all disabled:pointer-events-none disabled:opacity-40',
          variant !== 'light' && sizeVariants[size],
          variantVariants[variant],
          className
        )}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </Comp>
    )
  }
)

Button.displayName = 'Button'
export default Button
