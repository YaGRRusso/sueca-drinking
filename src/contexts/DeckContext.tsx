import { randomNumber, shuffle } from '@/helpers/arrayHelper'
import { cards } from '@/mock/cards'
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export interface DeckContextProps {
  deck: CardProps[]
  isDeckEmpty: boolean
  shuffleDeck: () => void
  resetDeck: () => void
  getLastDeckCard: () => CardProps | undefined
  getRandomDeckCard: () => CardProps | undefined
}

export const DeckContext = createContext<DeckContextProps>(
  {} as DeckContextProps
)

export const DeckProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [deck, setDeck] = useState<CardProps[]>([])

  const resetDeck = useCallback(() => {
    setDeck(shuffle(cards))
  }, [])

  const shuffleDeck = useCallback(() => {
    setDeck((oldDeck) => shuffle(oldDeck))
  }, [])

  const getLastDeckCard = useCallback(() => {
    const newDeck = [...deck]
    const card = newDeck.pop()
    setDeck(newDeck)
    return card
  }, [deck])

  const getRandomDeckCard = useCallback(() => {
    const newDeck = [...deck]
    const position = randomNumber(0, newDeck.length - 1)
    const card = newDeck.splice(position, 1)[0]
    setDeck(newDeck)
    return card
  }, [deck])

  const isDeckEmpty = useMemo(() => (deck.length <= 0 ? true : false), [deck])

  useEffect(() => {
    resetDeck()
  }, [resetDeck])

  return (
    <DeckContext.Provider
      value={{
        getLastDeckCard,
        getRandomDeckCard,
        resetDeck,
        shuffleDeck,
        deck,
        isDeckEmpty,
      }}
    >
      {children}
    </DeckContext.Provider>
  )
}

export const useDeckContext = (): DeckContextProps => {
  const context = useContext(DeckContext)

  if (context === undefined) {
    throw new Error('Context should be used under a provider')
  }

  return context
}
