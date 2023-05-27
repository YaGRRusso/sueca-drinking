import { Flip } from '@/components'
import { useDeckContext } from '@/contexts/DeckContext'
import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ArrowClockwise, BeerBottle, CaretRight } from 'phosphor-react'
import { useCallback, useState } from 'react'

const HomePage: NextPage = ({}) => {
  const { t: tCommon } = useTranslation('common')
  const { t: tRules } = useTranslation('sueca')
  const { deck, getLastDeckCard, resetDeck } = useDeckContext()
  const [card, setCard] = useState<CardProps>()
  const [flipped, setFlipped] = useState(false)

  const handleGetLastCard = useCallback(() => {
    setCard(getLastDeckCard())
  }, [getLastDeckCard])

  const handleResetDeck = useCallback(() => {
    resetDeck()
    setCard(undefined)
  }, [resetDeck])

  return (
    <div className="container-center container flex flex-col gap-4 font-xyz">
      <span
        className={clsx(
          'flex items-center justify-center gap-2 text-xl',
          deck.length === 0 && 'text-red-500'
        )}
      >
        {tCommon('cards', { count: deck.length })}
      </span>
      <Flip
        isFlipped={flipped}
        onClick={() => setFlipped(!flipped)}
        className="flex aspect-card w-full max-w-sm items-center justify-center"
      >
        <div className="flex h-full w-full items-center justify-center rounded-3xl border-2 bg-rose-500 p-12 text-5xl dark:bg-rose-700">
          {card ? card.code : <BeerBottle />}
        </div>
        <div className="flex h-full w-full items-center justify-center rounded-3xl border-2 bg-sky-500 p-12 text-5xl dark:bg-sky-700">
          {tRules(card?.value.toString() || 'Drink')}
        </div>
      </Flip>
      <div className="mt-4 flex items-stretch gap-4">
        <button
          className="flex items-center justify-center gap-2 rounded-3xl bg-gray-200 px-4 py-2 text-xl font-semibold transition-colors hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700"
          onClick={handleResetDeck}
        >
          <ArrowClockwise />
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-3xl bg-gray-200 px-8 py-2 text-xl font-semibold transition-colors hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-40 dark:bg-slate-800 dark:hover:bg-slate-700"
          disabled={deck.length === 0}
          onClick={handleGetLastCard}
        >
          {tCommon('nextCard')}
          <CaretRight />
        </button>
      </div>
    </div>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'sueca'])),
    },
  }
}
