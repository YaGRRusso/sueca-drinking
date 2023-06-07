import { Card, Head } from '@/components'
import { useDeckContext } from '@/contexts/DeckContext'
import { Stack } from '@phosphor-icons/react'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const DeckPage: NextPage = ({}) => {
  const { deck } = useDeckContext()
  const { t: tCommon } = useTranslation('common')

  return (
    <>
      <Head title="Sueca - Deck" />
      <div className="container-center container flex flex-col gap-12 overflow-x-hidden font-amatic">
        <h2 className="text-5xl">{tCommon('currentDeck')}</h2>
        <div className="flex items-center gap-2 text-3xl font-bold">
          <Stack />
          <span>{deck.length}</span>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-2">
          {deck.map((item) => (
            <Card.Preview key={item.code} suit={item.suit} value={item.value} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DeckPage

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
