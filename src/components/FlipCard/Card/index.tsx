import { clsx } from 'clsx'
import { FC, HTMLAttributes } from 'react'

export interface FlipCardCardProps extends HTMLAttributes<HTMLDivElement> {
  back?: boolean
}

const FlipCardCard: FC<FlipCardCardProps> = ({
  children,
  back,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'backface-hidden absolute flex h-full w-full items-center justify-center rounded-xl shadow hover:shadow-lg',
        back && 'flip',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default FlipCardCard
