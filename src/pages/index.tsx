import { Button, Card, Flip, Head } from '@/components'
import { useDeckContext } from '@/contexts/DeckContext'
import { ArrowClockwise, CaretRight } from '@phosphor-icons/react'
import clsx from 'clsx'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toast } from 'react-toastify'

const HomePage: NextPage = ({}) => {
  const { t: tCommon } = useTranslation('common')
  const { deck, getLastDeckCard, resetDeck, isDeckEmpty } = useDeckContext()
  const [card, setCard] = useState<CardProps>()
  const [flipped, setFlipped] = useState<boolean>()
  const [animating, setAnimating] = useState<boolean>()
  const [swipeStart, setSwipeStart] = useState<number>()
  const [swipeEnd, setSwipeEnd] = useState<number>()

  const handleGetLastCard = useCallback(() => {
    setCard(getLastDeckCard())
    setAnimating(true)
    setTimeout(() => {
      setAnimating(false)
    }, 200)
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

  const handleMouseStart = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
    setSwipeStart(ev.clientX)
  }, [])

  const handleMouseMove = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
    setSwipeEnd(ev.clientX)
  }, [])

  const swipeDelta = useMemo(() => {
    if (swipeStart && swipeEnd) {
      return swipeEnd - swipeStart
    }
  }, [swipeEnd, swipeStart])

  const swipeDirection = useMemo(() => {
    if (swipeDelta) {
      if (swipeDelta < -80) return 'left'
      if (swipeDelta > 80) return 'right'
    }
  }, [swipeDelta])

  const handleSwipe = useCallback(() => {
    if (swipeDirection) {
      if (!isDeckEmpty) {
        handleGetLastCard()
      } else {
        toast.error(tCommon('emptyDeck'))
      }
    }
    setSwipeStart(undefined)
    setSwipeEnd(undefined)
  }, [handleGetLastCard, isDeckEmpty, swipeDirection, tCommon])

  useEffect(() => {
    if (swipeDelta) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [swipeDelta])

  return (
    <>
      <Head title="Sueca - Play" />
      <div className="container-center container flex flex-col gap-4 overflow-hidden font-amatic">
        <span>{tCommon('cards', { count: deck.length })}</span>
        <div
          className={clsx(
            'h-full w-full max-w-sm',
            animating && 'animate-popin'
          )}
          style={swipeDelta ? { transform: `translate(${swipeDelta}px)` } : {}}
        >
          <Flip
            className="flex aspect-card w-full max-w-sm items-center justify-center"
            isFlipped={flipped}
            onClick={() => !animating && setFlipped(!flipped)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseStart}
            onMouseMove={handleMouseMove}
            onTouchEnd={handleSwipe}
            onMouseUp={handleSwipe}
            onMouseLeave={handleSwipe}
          >
            <Card.Front value={card?.value} suit={card?.suit} />
            <Card.Back value={card?.value} />
          </Flip>
        </div>
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
    </>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'rules'])),
    },
  }
}
