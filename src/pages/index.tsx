import { Button, Card, Flip } from '@/components'
import { useDeckContext } from '@/contexts/DeckContext'
import { ArrowClockwise, CaretRight } from '@phosphor-icons/react'
import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TouchEvent, useCallback, useMemo, useState } from 'react'

const HomePage: NextPage = ({}) => {
  const { t: tCommon } = useTranslation('common')
  const { deck, getLastDeckCard, resetDeck, isDeckEmpty } = useDeckContext()
  const [card, setCard] = useState<CardProps>()
  const [flipped, setFlipped] = useState<boolean>()
  const [swipeStart, setSwipeStart] = useState<number>()
  const [swipeEnd, setSwipeEnd] = useState<number>()

  const handleGetLastCard = useCallback(() => {
    setCard(getLastDeckCard())
    setFlipped(false)
  }, [getLastDeckCard])

  const handleResetDeck = useCallback(() => {
    resetDeck()
    setCard(undefined)
  }, [resetDeck])

  const handleTouchStart = useCallback((ev: TouchEvent<HTMLButtonElement>) => {
    const touch = ev.touches[0]
    setSwipeStart(touch.clientX)
  }, [])

  const handleTouchMove = useCallback((ev: TouchEvent<HTMLButtonElement>) => {
    const touch = ev.touches[0]
    setSwipeEnd(touch.clientX)
  }, [])

  const swipeDirection = useMemo(() => {
    if (swipeStart && swipeEnd) {
      const delta = swipeEnd - swipeStart
      if (delta < -80) return 'left'
      if (delta > 80) return 'right'
    }
  }, [swipeEnd, swipeStart])

  const handleSwipe = useCallback(() => {
    if (swipeDirection && !isDeckEmpty) {
      handleGetLastCard()
    }
    setSwipeStart(undefined)
    setSwipeEnd(undefined)
  }, [handleGetLastCard, isDeckEmpty, swipeDirection])

  return (
    <div className="container-center container flex flex-col gap-4 overflow-x-hidden font-amatic">
      {/* <Modal.Root>
        <Modal.Trigger>
          <Button variant="light" className="font-thin">
            <span>{tCommon('cards', { count: deck.length })}</span>
            <Eye weight="thin" size={16} />
          </Button>
        </Modal.Trigger>
        <Modal.Content
          className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-2"
          title="Deck"
          icon={<Stack />}
        >
          {deck.map((item) => (
            <Card.Preview key={item.code} suit={item.suit} value={item.value} />
          ))}
        </Modal.Content>
      </Modal.Root> */}
      <span>{tCommon('cards', { count: deck.length })}</span>
      <Flip
        className={clsx(
          'flex aspect-card w-full max-w-sm items-center justify-center',
          swipeDirection === 'left' && '-translate-x-7 -rotate-1',
          swipeDirection === 'right' && 'translate-x-7 rotate-1'
        )}
        isFlipped={flipped}
        onClick={() => setFlipped(!flipped)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleSwipe}
      >
        <Card.Front value={card?.value} suit={card?.suit} />
        <Card.Back value={card?.value} />
      </Flip>
      <div className="mt-4 flex items-center gap-4">
        <Button disabled={flipped} onClick={handleResetDeck} size="sm">
          <ArrowClockwise />
        </Button>
        <Button disabled={flipped || isDeckEmpty} onClick={handleGetLastCard}>
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
