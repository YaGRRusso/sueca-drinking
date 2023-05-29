import { Button, Flip } from '@/components'
import { useDeckContext } from '@/contexts/DeckContext'
import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  ArrowClockwise,
  BeerBottle,
  CaretRight,
  Club,
  Diamond,
  Heart,
  Spade,
} from 'phosphor-react'
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
        <div className="flex h-full w-full items-center justify-center rounded-3xl border-2 bg-rose-500 p-12 text-5xl font-bold dark:bg-rose-700">
          {card ? (
            <div className="flex flex-col items-center gap-4">
              {card.suit === 'club' && <Club />}
              {card.suit === 'diamond' && <Diamond />}
              {card.suit === 'heart' && <Heart />}
              {card.suit === 'spade' && <Spade />}
              <span>{card.value}</span>
            </div>
          ) : (
            <BeerBottle />
          )}
        </div>
        <div className="flex h-full w-full items-center justify-center rounded-3xl border-2 bg-sky-500 p-12 text-5xl dark:bg-sky-700">
          {tRules(card?.value.toString() || 'Drink')}
        </div>
      </Flip>
      <div className="mt-4 flex items-center gap-4">
        <Button disabled={flipped} onClick={handleResetDeck} padding="sm">
          <ArrowClockwise />
        </Button>
        <Button
          disabled={flipped || deck.length === 0}
          onClick={handleGetLastCard}
        >
          {tCommon('nextCard')}
          <CaretRight />
        </Button>
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
