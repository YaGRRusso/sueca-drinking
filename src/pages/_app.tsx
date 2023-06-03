import { Head } from '@/components'
import AppProvider from '@/contexts'
import { HeaderLayout } from '@/layouts'
import '@/styles/globals.css'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Amatic_SC } from 'next/font/google'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const amatic = Amatic_SC({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-amatic',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 Hours
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const persister = createSyncStoragePersister({
      storage: window.localStorage,
    })

    persistQueryClient({
      queryClient,
      persister,
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <main className={amatic.variable}>
          <HeaderLayout>
            <Head title="Next App" />
            <Component {...pageProps} />
            <ToastContainer
              limit={2}
              position="bottom-right"
              autoClose={2500}
              newestOnTop
            />
          </HeaderLayout>
        </main>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)
