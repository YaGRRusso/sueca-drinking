import * as Dialog from '@radix-ui/react-dialog'
import { FC } from 'react'

export interface RootProps extends Dialog.DialogProps {}

const Root: FC<RootProps> = ({ children, ...rest }) => {
  return <Dialog.Root {...rest}>{children}</Dialog.Root>
}

export default Root
