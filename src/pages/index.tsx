import { FlipCard } from '@/components'
import { cards } from '@/mock/cards'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { ArrowsClockwise } from 'phosphor-react'
import { useEffect, useState } from 'react'

const HomePage: NextPage = ({}) => {
  const { t } = useTranslation('sueca')
  const [card, setCard] = useState<CardProps>()
  const [flipped, setFlipped] = useState(false)

  const generateCard = () => {
    const index = Math.floor(Math.random() * 52)
    setCard(cards[index])
    console.log(cards[index])
  }

  useEffect(() => generateCard(), [])

  return (
    <div className="container-center container flex flex-col gap-4 font-xyz">
      <button onClick={generateCard}>
        <ArrowsClockwise />
      </button>
      <FlipCard.Root value={flipped} onClick={() => setFlipped(!flipped)}>
        <FlipCard.Card side="front">
          {card && (
            <Image
              alt={card.suit + card.value + card.code}
              src={`/images/${card.suit}/${card.code}.jpg`}
              fill
              sizes="100%"
              priority
            />
          )}
        </FlipCard.Card>
        <FlipCard.Card side="back">
          <Image
            alt="card back"
            src="/images/especial/back2.jpg"
            fill
            sizes="100%"
            priority
          />
          <h1 className="absolute w-1/2 text-center text-7xl font-medium text-gray-300">
            {t(card?.value.toString() || '')}
          </h1>
        </FlipCard.Card>
      </FlipCard.Root>
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
