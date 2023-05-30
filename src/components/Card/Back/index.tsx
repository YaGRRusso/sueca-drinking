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
        'relative flex aspect-card h-full w-full items-center justify-center rounded-3xl border-2 bg-sky-500 p-12 text-5xl dark:bg-sky-700',
        className
      )}
      {...rest}
    >
      {cardRule.info && (
        <Modal.Root>
          <Modal.Trigger>
            <div
              className="absolute right-0 top-0 p-2"
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
