import { Button, Card, Flip } from '@/components'
import { useDeckContext } from '@/contexts/DeckContext'
import { ArrowClockwise, CaretRight } from '@phosphor-icons/react'
import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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
        <Card.Front value={card?.value} suit={card?.suit} />
        <Card.Back rule={tRules(card?.value.toString() || '')} />
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
