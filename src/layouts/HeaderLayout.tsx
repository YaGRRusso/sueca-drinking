import { ErrorBoundary, Layout } from '@/components'
import { useThemeContext } from '@/contexts/ThemeContext'
import { NextPage } from 'next'
import { HTMLAttributes } from 'react'

export interface HeaderLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const HeaderLayout: NextPage<HeaderLayoutProps> = ({ children }) => {
  const { theme } = useThemeContext()

  return (
    <div className={theme}>
      <div className="flex min-h-screen flex-col bg-gradient-to-tl from-white via-slate-200 via-40% to-white text-black dark:from-slate-950 dark:via-slate-900 dark:via-40% dark:to-slate-950 dark:text-slate-100">
        <Layout.Header />
        <ErrorBoundary>
          <>{children}</>
        </ErrorBoundary>
        <Layout.Footer />
      </div>
    </div>
  )
}

export default HeaderLayout
