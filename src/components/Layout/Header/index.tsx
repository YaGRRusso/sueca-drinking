import { useThemeContext } from '@/contexts/ThemeContext'
import {
  GithubLogo,
  ListDashes,
  MoonStars,
  Stack,
  Sun,
  Translate,
} from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, HTMLAttributes, useMemo } from 'react'

import HeaderButton from './Button'
import HeaderLink from './Link'

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header: FC<HeaderProps> = ({ children, className, ...rest }) => {
  const { theme, toggleTheme } = useThemeContext()
  const { t: tCommon } = useTranslation('common')
  const router = useRouter()

  const nextLang = useMemo(() => {
    switch (router.locale) {
      case 'pt-BR':
        return 'en-US'
      case 'en-US':
        return 'pt-BR'
    }
  }, [router])

  return (
    <header
      className={clsx(
        'container flex flex-wrap items-center justify-between gap-x-12 gap-y-4 py-6'
      )}
      {...rest}
    >
      <Link href="/" className="text-center text-3xl font-semibold">
        <h1>Sueca</h1>
      </Link>
      <div className="z-40 flex items-center gap-4 text-xl xs:gap-2">
        <div className="flex items-center gap-2">
          <HeaderLink icon={<Stack />} text={tCommon('deck')} href="/deck" />
          <HeaderLink
            icon={<ListDashes />}
            text={tCommon('rules')}
            href="/rules"
          />
          {/* <HeaderLink
            icon={<Gear />}
            text={tCommon('settings')}
            href="/settings"
          /> */}
        </div>
        <div className="h-4 border border-current opacity-10" />
        <div className="flex items-center gap-2">
          <HeaderButton
            onClick={toggleTheme}
            icon={theme === 'dark' ? <MoonStars /> : <Sun />}
          />
          <HeaderLink href="" locale={nextLang} icon={<Translate />} />
          <HeaderLink
            href="https://github.com/YaGRRusso/sueca-drinking"
            className="flex xl:hidden"
            target="_blank"
            icon={<GithubLogo />}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
