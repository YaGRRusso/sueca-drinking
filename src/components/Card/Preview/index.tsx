import { BeerBottle, Club, Diamond, Heart, Spade } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { FC, HTMLAttributes, useMemo } from 'react'

export interface CardPreviewProps extends HTMLAttributes<HTMLDivElement> {
  suit?: CardSuitProps
  value?: CardValueProps
}

const CardPreview: FC<CardPreviewProps> = ({
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
        'flex aspect-card flex-col items-center justify-center gap-2 rounded-lg border bg-rose-500 p-2 text-xl font-bold dark:bg-rose-700',
        className
      )}
      {...rest}
    >
      {value && <span>{value}</span>}
      {cardIcon}
    </div>
  )
}

export default CardPreview
