import Button from '@/components/Button'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { FC, ReactNode } from 'react'

export interface ContentProps extends Dialog.DialogContentProps {
  title?: string
  icon?: ReactNode
}

const Content: FC<ContentProps> = ({ icon, title, children, ...rest }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <Dialog.Content
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden shadow-xl focus:outline-none data-[state=open]:animate-popup"
        {...rest}
      >
        <div className="flex w-[90vw] max-w-[768px] flex-col gap-8 rounded-lg border bg-gray-900 p-8 text-gray-100">
          <div className="flex items-center justify-between text-3xl font-semibold">
            <span className="flex items-center gap-2">
              {icon}
              {title}
            </span>
            <Dialog.Close asChild>
              <Button variant="light">
                <X />
              </Button>
            </Dialog.Close>
          </div>
          <div className="max-h-[60vh] overflow-auto rounded-lg px-2">
            {children}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default Content
