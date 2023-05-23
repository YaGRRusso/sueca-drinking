import { Head } from '@/components'
import AppProvider from '@/contexts'
import { HeaderLayout } from '@/layouts'
import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <HeaderLayout>
        <Head title="Next App" />
        <Component {...pageProps} />
      </HeaderLayout>
    </AppProvider>
  )
}

export default appWithTranslation(App)
