import { BeerBottle, Club, Diamond, Heart, Spade } from '@phosphor-icons/react'
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
  const cardIcon = useMemo(() => {
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
        'flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 bg-rose-500 p-12 text-5xl font-bold dark:bg-rose-700',
        className
      )}
      {...rest}
    >
      {value && <span>{value}</span>}
      {cardIcon}
    </div>
  )
}

export default CardFront
