import { Button, ErrorBoundary } from '@/components'
import { useThemeContext } from '@/contexts/ThemeContext'
import { GithubLogo, MoonStars, Sun, Translate } from '@phosphor-icons/react'
import clsx from 'clsx'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HTMLAttributes, useMemo } from 'react'

export interface HeaderLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const HeaderLayout: NextPage<HeaderLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useThemeContext()
  const router = useRouter()

  const nextLang = useMemo(() => {
    switch (router.locale) {
      case 'pt-BR':
        return 'en-US'
      case 'en-US':
        return 'pt-BR'
    }
  }, [router])

  const currentTheme = useMemo(() => {
    return theme === 'dark'
      ? 'dark bg-slate-900 text-slate-100'
      : 'bg-white text-black'
  }, [theme])

  return (
    <div className={clsx('flex min-h-screen flex-col', currentTheme)}>
      <header className="container flex flex-wrap items-center justify-between gap-6 py-6">
        <Link
          href="https://github.com/YaGRRusso/sueca-drinking"
          target="_blank"
          className="text-3xl font-semibold"
        >
          Sueca
        </Link>
        <div className="flex items-center gap-4 text-xl">
          <Button onClick={toggleTheme} variant="light">
            {theme === 'dark' ? <MoonStars /> : <Sun />}
          </Button>
          <Button asChild variant="light">
            <Link href="" locale={nextLang}>
              <Translate />
            </Link>
          </Button>
          <Button asChild variant="light">
            <Link href="https://github.com/YaGRRusso" target="_blank">
              <GithubLogo />
            </Link>
          </Button>
        </div>
      </header>
      <ErrorBoundary>
        <>{children}</>
      </ErrorBoundary>
      {/* <footer className="container flex items-center justify-center gap-1 pb-4 pt-6 text-sm opacity-40">
        {tCommon('createdBy')}
        <Link
          href="https://github.com/YaGRRusso"
          target="_blank"
          className="hover:underline"
        >
          Yago Russo
        </Link>
      </footer> */}
    </div>
  )
}

export default HeaderLayout
