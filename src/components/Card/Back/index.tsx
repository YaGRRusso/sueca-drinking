import { clsx } from 'clsx'
import { FC, HTMLAttributes, useMemo } from 'react'

export interface CardBackProps extends HTMLAttributes<HTMLDivElement> {
  rule?: string | null
}

const CardBack: FC<CardBackProps> = ({
  rule,
  children,
  className,
  ...rest
}) => {
  const cardRule = useMemo(() => {
    if (rule) {
      return rule
    } else {
      return 'Drink'
    }
  }, [rule])

  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center rounded-3xl border-2 bg-sky-500 p-12 text-5xl dark:bg-sky-700',
        className
      )}
      {...rest}
    >
      <span>{cardRule}</span>
    </div>
  )
}

export default CardBack
