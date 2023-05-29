import { clsx } from 'clsx'
import { useTranslation } from 'next-i18next'
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
  const { t: tRules } = useTranslation('sueca')

  const cardRule = useMemo(() => {
    if (rule) {
      return rule
    } else {
      return tRules('info')
    }
  }, [rule, tRules])

  return (
    <div
      className={clsx(
        'flex aspect-card h-full w-full items-center justify-center rounded-3xl border-2 bg-sky-500 p-12 text-5xl dark:bg-sky-700',
        className
      )}
      {...rest}
    >
      <span>{cardRule}</span>
    </div>
  )
}

export default CardBack
