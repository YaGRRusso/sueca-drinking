import { clsx } from 'clsx'
import { FC, HTMLAttributes } from 'react'

export interface FlipCardCardProps extends HTMLAttributes<HTMLDivElement> {
  side: 'front' | 'back'
}

const FlipCardCard: FC<FlipCardCardProps> = ({
  children,
  side,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'backface-hidden absolute flex h-full w-full items-center justify-center overflow-hidden rounded-3xl shadow hover:shadow-lg',
        side === 'back' && 'flip',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default FlipCardCard
