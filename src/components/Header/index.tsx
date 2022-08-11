import logoImg from '../../assets/logo.svg'
import * as S from './styles'

import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [ModalOpen, setModalOpen] = useState(false)

  function handleCloseNewTransactionModal() {
    setModalOpen(false)
  }

  return (
    <S.Container>
      <S.HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={ModalOpen} onOpenChange={setModalOpen}>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal onCloseModal={handleCloseNewTransactionModal} />
        </Dialog.Root>
      </S.HeaderContent>
    </S.Container>
  )
}
