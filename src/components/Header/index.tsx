import * as S from './styles'
import logoImg from '../../assets/logo.svg'

import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Header() {
  const { transactions } = useContext(TransactionsContext)

  return (
    <S.Container>
      <S.HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.Container>
  )
}
