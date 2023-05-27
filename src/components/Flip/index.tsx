import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import React, { FC, HTMLAttributes, ReactElement } from 'react'

export interface FlipProps extends HTMLAttributes<HTMLButtonElement> {
  isFlipped?: boolean
  children: [ReactElement, ReactElement]
}

const Flip: FC<FlipProps> = ({ isFlipped, children, className, ...rest }) => {
  return (
    <button
      className={clsx(
        'preserve-3d relative cursor-pointer select-none transition-all duration-500',
        isFlipped && 'flip',
        className
      )}
      {...rest}
    >
      <Slot className="backface-hidden absolute overflow-hidden">
        {children[0]}
      </Slot>
      <Slot className="flip backface-hidden absolute overflow-hidden">
        {children[1]}
      </Slot>
    </button>
  )
}

export default Flip
