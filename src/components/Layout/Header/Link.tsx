import Button, { ButtonProps } from '@/components/Button'
import Link, { LinkProps } from 'next/link'
import { FC, HTMLAttributeAnchorTarget, ReactNode } from 'react'

export interface HeaderLinkProps extends ButtonProps {
  icon: ReactNode
  text?: string | null
  href?: LinkProps['href']
  target?: HTMLAttributeAnchorTarget
  locale?: LinkProps['locale']
}

const HeaderLink: FC<HeaderLinkProps> = ({
  icon,
  text,
  href = '',
  target,
  locale,
  children,
  ...rest
}) => {
  return (
    <Button asChild variant="light" {...rest}>
      <Link href={href} target={target} locale={locale}>
        {icon}
        {text && <span className="text-xs md:hidden">{text}</span>}
      </Link>
    </Button>
  )
}

export default HeaderLink
