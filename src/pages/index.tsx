import { FlipCard } from '@/components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: NextPage = ({}) => {
  const { t } = useTranslation('common')

  return (
    <div className="container-center container flex flex-col gap-4">
      <FlipCard.Root>
        <FlipCard.Card>Front</FlipCard.Card>
        <FlipCard.Card back>Back</FlipCard.Card>
      </FlipCard.Root>
    </div>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'form'])),
    },
  }
}
