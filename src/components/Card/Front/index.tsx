import {
  BeerBottle,
  Club,
  Crown,
  CrownSimple,
  Diamond,
  Heart,
  IconContext,
  Shield,
  Spade,
} from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { FC, HTMLAttributes, useMemo } from 'react'

export interface CardFrontProps extends HTMLAttributes<HTMLDivElement> {
  suit?: CardSuitProps
  value?: CardValueProps
}

const CardFront: FC<CardFrontProps> = ({
  suit,
  value,
  children,
  className,
  ...rest
}) => {
  const cardValueIcon = useMemo(() => {
    switch (value) {
      case 11:
        return <Shield />
      case 12:
        return <CrownSimple />
      case 13:
        return <Crown />
    }
  }, [value])

  const cardSuitIcon = useMemo(() => {
    switch (suit) {
      case 'club':
        return <Club />
      case 'diamond':
        return <Diamond />
      case 'heart':
        return <Heart />
      case 'spade':
        return <Spade />
    }
  }, [suit])

  return (
    <div
      className={clsx(
        'flex aspect-card h-full w-full flex-col items-center justify-between gap-4 rounded-3xl border-2 bg-rose-500 p-8 text-5xl font-bold text-white dark:bg-rose-700 xs:p-6',
        className
      )}
      {...rest}
    >
      <IconContext.Provider value={{ weight: 'fill', size: '3rem' }}>
        <div className="flex w-full items-center justify-between">
          <span>{value}</span>
          <span>{cardSuitIcon}</span>
        </div>
        <div className="[&>svg]:h-40 [&>svg]:w-40 [&>svg]:xs:h-32 [&>svg]:xs:w-32">
          {cardValueIcon || cardSuitIcon || <BeerBottle />}
        </div>
        <div className="flex w-full rotate-180 items-center justify-between">
          <span>{value}</span>
          <span>{cardSuitIcon}</span>
        </div>
      </IconContext.Provider>
    </div>
  )
}

export default CardFront
