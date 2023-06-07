import { clsx } from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

const Footer: FC<FooterProps> = ({ children, className, ...rest }) => {
  const { t: tCommon } = useTranslation('common')

  return (
    <footer
      className={clsx(
        'container flex items-center justify-center gap-1 pb-4 pt-6 text-sm opacity-30'
      )}
      {...rest}
    >
      {tCommon('createdBy')}
      <Link
        href="https://github.com/YaGRRusso"
        target="_blank"
        className="hover:underline"
      >
        Yago Russo
      </Link>
    </footer>
  )
}

export default Footer
