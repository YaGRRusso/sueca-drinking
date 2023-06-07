import Button, { ButtonProps } from '@/components/Button'
import { FC, ReactNode } from 'react'

export interface HeaderButtonProps extends ButtonProps {
  icon: ReactNode
  text?: string | null
}

const HeaderButton: FC<HeaderButtonProps> = ({
  icon,
  text,
  children,
  className,
  ...rest
}) => {
  return (
    <Button variant="light" {...rest}>
      {icon}
      {text && <span className="text-xs md:hidden">{text}</span>}
    </Button>
  )
}

export default HeaderButton
