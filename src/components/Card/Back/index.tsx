import Modal from '@/components/Modal'
import { Info } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, HTMLAttributes, useMemo } from 'react'

export interface CardBackProps extends HTMLAttributes<HTMLDivElement> {
  value?: number | undefined
}

const CardBack: FC<CardBackProps> = ({
  value,
  children,
  className,
  ...rest
}) => {
  const { t: tRules } = useTranslation('sueca')

  const cardRule = useMemo(() => {
    if (value) {
      return {
        title: tRules(value.toString()),
        info: tRules(value.toString() + 'info'),
      }
    } else {
      return { title: tRules('info') }
    }
  }, [value, tRules])

  return (
    <div
      className={clsx(
        'relative flex aspect-card h-full w-full items-center justify-center rounded-3xl border-2 bg-sky-600 p-12 text-5xl text-white dark:bg-sky-700',
        className
      )}
      {...rest}
    >
      {cardRule.info && (
        <Modal.Root>
          <Modal.Trigger>
            <div
              className="absolute right-4 top-4 rounded-full p-4 transition-colors hover:bg-sky-500 dark:hover:bg-sky-600 xs:right-2 xs:top-2 xs:p-4"
              role="button"
              onClick={(ev) => ev.stopPropagation()}
            >
              <Info />
            </div>
          </Modal.Trigger>
          <Modal.Content title={tRules(cardRule.title) || ''}>
            {tRules(cardRule.info)}
          </Modal.Content>
        </Modal.Root>
      )}
      <span>{cardRule.title}</span>
    </div>
  )
}

export default CardBack
