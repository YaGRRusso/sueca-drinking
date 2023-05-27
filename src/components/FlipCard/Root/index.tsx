import { clsx } from 'clsx'
import React, { useEffect, useState } from 'react'

import FlipCard, { FlipCardCardProps } from '..'

export interface FlipCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultFlipped?: boolean
  children: [
    React.ReactElement<FlipCardCardProps>,
    React.ReactElement<FlipCardCardProps>
  ]
}

const FlipCardRoot: React.FC<FlipCardRootProps> = ({
  defaultFlipped,
  children,
  className,
  onClick,
  ...rest
}) => {
  const [isFlipped, setIsFlipped] = useState(defaultFlipped)

  const validateChildren = (children: React.ReactNode) => {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (
          child.type !== FlipCard.Card ||
          !['front', 'back'].includes(child.props.side)
        ) {
          throw new Error(
            'FlipCard.Root only allows "FlipCard.Card" components with "side" prop set to "front" or "back" as children.'
          )
        }
      }
    })
  }

  useEffect(() => {
    validateChildren(children)
  }, [children])

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
