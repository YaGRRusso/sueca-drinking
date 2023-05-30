import * as Dialog from '@radix-ui/react-dialog'
import { FC } from 'react'

export interface TriggerProps extends Dialog.DialogTriggerProps {}

const Trigger: FC<TriggerProps> = ({ children, ...rest }) => {
  return (
    <Dialog.Trigger asChild {...rest}>
      {children}
    </Dialog.Trigger>
  )
}

export default Trigger
