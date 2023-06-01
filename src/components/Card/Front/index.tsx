import {
  BeerBottle,
  Club,
  Crown,
  CrownSimple,
  Diamond,
  Heart,
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
        return <Shield weight="fill" />
      case 12:
        return <CrownSimple weight="fill" />
      case 13:
        return <Crown weight="fill" />
    }
  }, [value])

  const cardSuitIcon = useMemo(() => {
    switch (suit) {
      case 'club':
        return <Club weight="fill" />
      case 'diamond':
        return <Diamond weight="fill" />
      case 'heart':
        return <Heart weight="fill" />
      case 'spade':
        return <Spade weight="fill" />
      default:
        return <BeerBottle weight="fill" />
    }
  }, [suit])

  return (
    <div
      className={clsx(
        'flex aspect-card h-full w-full flex-col items-center justify-between gap-4 rounded-3xl border-2 bg-rose-500 p-8 text-5xl font-bold text-white dark:bg-rose-700',
        className
      )}
      {...rest}
    >
      <div className="flex w-full items-center justify-between">
        <span>{value}</span>
        <span>{cardSuitIcon}</span>
      </div>
      <div className="[&>svg]:h-40 [&>svg]:w-40 [&>svg]:xs:h-32 [&>svg]:xs:w-32">
        {cardValueIcon || cardSuitIcon}
      </div>
      <div className="flex w-full rotate-180 items-center justify-between">
        <span>{value}</span>
        <span>{cardSuitIcon}</span>
      </div>
    </div>
  )
}

export default CardFront
