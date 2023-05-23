import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useState } from 'react'

const HomePage: NextPage = ({}) => {
  const { t } = useTranslation('common')
  const [card, setCard] = useState('black')

  return (
    <div className="container-center container flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <button
          className="h-6 w-6 rounded bg-red-500"
          onClick={() => setCard('red')}
        />
        <button
          className="h-6 w-6 rounded bg-slate-500"
          onClick={() => setCard('black')}
        />
      </div>
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl"
        style={{ aspectRatio: '17/24' }}
      >
        <Image
          alt="card back"
          src={`/images/back-${card}.jpg`}
          width={850}
          height={1200}
          className="h-full w-full"
        />
      </div>
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
