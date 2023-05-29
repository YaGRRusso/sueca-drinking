import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

const paddingVariants = {
  sm: 'px-4 py-2 h-12',
  md: 'px-8 py-2 h-12',
}

const variantVariants = {
  default:
    'bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700',
  light: 'rounded-lg p-2 hover:shadow',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  padding?: keyof typeof paddingVariants
  variant?: keyof typeof variantVariants
}

const Button: FC<ButtonProps> = ({
  padding = 'md',
  variant = 'default',
  asChild,
  children,
  className,
  ...rest
}) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        'flex items-center justify-center gap-2 rounded-3xl text-xl font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40',
        variant !== 'light' && paddingVariants[padding],
        variantVariants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export default Button
