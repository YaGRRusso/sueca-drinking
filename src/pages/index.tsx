import { Button, Card, Flip } from '@/components'
import { useDeckContext } from '@/contexts/DeckContext'
import { ArrowClockwise, CaretRight } from '@phosphor-icons/react'
import clsx from 'clsx'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TouchEvent, useCallback, useState } from 'react'

const HomePage: NextPage = ({}) => {
  const { t: tCommon } = useTranslation('common')
  const { t: tRules } = useTranslation('sueca')
  const { deck, getLastDeckCard, resetDeck } = useDeckContext()
  const [card, setCard] = useState<CardProps>()
  const [flipped, setFlipped] = useState<boolean>()
  const [swipeStart, setSwipeStart] = useState<number>()
  const [swipeEnd, setSwipeEnd] = useState<number>()
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>()

  const handleGetLastCard = useCallback(() => {
    setCard(getLastDeckCard())
    setFlipped(false)
  }, [getLastDeckCard])

  const handleResetDeck = useCallback(() => {
    resetDeck()
    setCard(undefined)
  }, [resetDeck])

  const handleGetSwipeDirection = useCallback(
    (current: number) => {
      if (swipeStart) {
        swipeStart > current
          ? setSwipeDirection('left')
          : setSwipeDirection('right')
      }
    },
    [swipeStart]
  )

  // const handleMouseStart = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
  //   setSwipeStart(ev.clientX)
  // }, [])

  // const handleMouseMove = useCallback(
  //   (ev: MouseEvent<HTMLButtonElement>) => {
  //     handleGetSwipeDirection(ev.clientX)
  //     setSwipeEnd(ev.clientX)
  //   },
  //   [handleGetSwipeDirection]
  // )

  const handleTouchStart = useCallback((ev: TouchEvent<HTMLButtonElement>) => {
    const touch = ev.touches[0]
    setSwipeStart(touch.clientX)
  }, [])

  const handleTouchMove = useCallback(
    (ev: TouchEvent<HTMLButtonElement>) => {
      const touch = ev.touches[0]
      handleGetSwipeDirection(touch.clientX)
      setSwipeEnd(touch.clientX)
    },
    [handleGetSwipeDirection]
  )

  const handleSwipe = useCallback(() => {
    if (swipeStart && swipeEnd) {
      handleGetLastCard()
      setSwipeDirection(undefined)
      setSwipeStart(undefined)
      setSwipeEnd(undefined)
    }
  }, [handleGetLastCard, swipeEnd, swipeStart])

  return (
    <div className="container-center container flex flex-col gap-4 overflow-x-hidden font-amatic">
      <span
        className={clsx(
          'flex items-center justify-center gap-2 text-xl',
          deck.length === 0 && 'text-red-500'
        )}
      >
        <span>{tCommon('cards', { count: deck.length })}</span>
        {/* <Button variant="light" onClick={() => console.log(deck)}>
          <Eye weight="thin" />
        </Button> */}
      </span>
      <Flip
        className={clsx(
          'flex aspect-card w-full max-w-sm items-center justify-center',
          swipeDirection === 'left' && '-translate-x-5 -rotate-1',
          swipeDirection === 'right' && 'translate-x-5 rotate-1'
        )}
        isFlipped={flipped}
        onClick={() => setFlipped(!flipped)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleSwipe}
      >
        <Card.Front value={card?.value} suit={card?.suit} />
        <Card.Back rule={tRules(card?.value.toString() || '')} />
      </Flip>
      <div className="mt-4 flex items-center gap-4">
        <Button disabled={flipped} onClick={handleResetDeck} size="sm">
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
