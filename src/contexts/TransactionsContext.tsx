import { createContext, ReactNode, useEffect, useState } from 'react'

export interface ITransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface ITransactionsContextType {
  transactions: ITransactionProps[]
}

interface ItransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionsContextType)

export function TransactionsProvider({ children }: ItransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactionProps[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()
    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
