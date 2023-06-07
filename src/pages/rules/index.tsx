import { Head, Modal } from '@/components'
import { cardValuesEnum } from '@/mock/cards'
import { Info } from '@phosphor-icons/react'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toast } from 'react-toastify'

const DeckPage: NextPage = ({}) => {
  const { t: tCommon } = useTranslation('common')
  const { t: tRules } = useTranslation('rules')

  return (
    <>
      <Head title="Sueca - Rules" />
      <div className="container-center container flex flex-col gap-12 overflow-x-hidden font-amatic">
        <h2 className="text-5xl">{tCommon('deckRules')}</h2>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-end gap-2 text-lg">
            <Info />
            <span>{tCommon('deckRulesInfo')}</span>
          </div>
          {[...Array(13)].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-x-8 gap-y-2 rounded bg-slate-300 bg-opacity-20 bg-clip-padding px-4 py-2 text-3xl shadow-sm backdrop-blur-md backdrop-filter dark:bg-slate-800 dark:bg-opacity-30 lg:text-2xl sm:text-xl"
            >
              <Modal.Root>
                <Modal.Trigger>
                  <span className="group relative flex-1 cursor-pointer pr-6">
                    {tRules((index + 1).toString())}
                    <Info
                      weight="thin"
                      className="absolute m-1 inline text-xl opacity-0 transition-all group-hover:opacity-80 sm:text-lg"
                    />
                  </span>
                </Modal.Trigger>
                <Modal.Content title={tRules((index + 1).toString()) || ''}>
                  {tRules(index + 1 + 'info') || ''}
                </Modal.Content>
              </Modal.Root>
              <select
                value={index + 1}
                className="w-24 cursor-pointer rounded bg-slate-200 pl-6 shadow-sm transition-all hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 md:w-14 md:pl-3"
                onClick={() => toast.error(tCommon('featUnderDevelopment'))}
              >
                {cardValuesEnum.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
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
      ...(await serverSideTranslations(locale as string, ['common', 'rules'])),
    },
  }
}
