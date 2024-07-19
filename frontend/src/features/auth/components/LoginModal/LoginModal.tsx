import * as Dialog from '@radix-ui/react-dialog'
import { LoginForm } from '../LoginForm'
import { useLoginModal } from '../..'

export const LoginModal = () => {
  const { showLoginModal, setShowLoginModal } = useLoginModal()

  return (
    <Dialog.Root open={showLoginModal} onOpenChange={setShowLoginModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed w-full max-w-xl p-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 focus:outline-none">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <Dialog.Title className="mb-2 text-2xl font-medium text-center">
              Login
            </Dialog.Title>
            <Dialog.Description className="mb-4 text-center">
              To continue you need to login or register an account.
            </Dialog.Description>
            <LoginForm />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
