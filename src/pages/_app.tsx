import { Head } from '@/components'
import AppProvider from '@/contexts'
import { HeaderLayout } from '@/layouts'
import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Amatic_SC as font } from 'next/font/google'

// import { Reenie_Beanie as font } from 'next/font/google'

const xyz = font({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-xyz',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <main className={xyz.variable}>
        <HeaderLayout>
          <Head title="Next App" />
          <Component {...pageProps} />
        </HeaderLayout>
      </main>
    </AppProvider>
  )
}

export default appWithTranslation(App)
