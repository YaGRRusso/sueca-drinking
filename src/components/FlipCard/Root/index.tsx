import { clsx } from 'clsx'
import { FC, HTMLAttributes, useState } from 'react'

export interface FlipCardRootProps extends HTMLAttributes<HTMLDivElement> {
  defaultFlipped?: boolean
}

const FlipCardRoot: FC<FlipCardRootProps> = ({
  defaultFlipped,
  children,
  className,
  onClick,
  ...rest
}) => {
  const [isFlipped, setIsFlipped] = useState(defaultFlipped)
  const cardClass =
    'backface-hidden absolute flex h-full w-full items-center justify-center rounded-xl shadow hover:shadow-lg'

  return (
    <div
      className={clsx(
        'relative flex aspect-card w-full max-w-sm cursor-pointer select-none items-center justify-center transition-all duration-500 [transform-style:preserve-3d]',
        isFlipped && 'flip',
        className
      )}
      onClick={() => {
        setIsFlipped(!isFlipped)
        onClick
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export default FlipCardRoot
