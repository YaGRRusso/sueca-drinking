import { Head } from '@/components'
import AppProvider from '@/contexts'
import { HeaderLayout } from '@/layouts'
import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Amatic_SC } from 'next/font/google'

// import { Reenie_Beanie } from 'next/font/google'

const amatic = Amatic_SC({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-amatic',
})

// const reenie = Reenie_Beanie({
//   weight: '400',
//   subsets: ['latin'],
//   variable: '--font-reenie',
// })

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <main className={amatic.variable}>
        <HeaderLayout>
          <Head title="Next App" />
          <Component {...pageProps} />
        </HeaderLayout>
      </main>
    </AppProvider>
  )
}

export default appWithTranslation(App)
