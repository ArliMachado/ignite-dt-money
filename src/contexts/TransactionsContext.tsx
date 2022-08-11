import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export interface ITransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface ICreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface ITransactionsContextType {
  transactions: ITransactionProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: ICreateTransactionInput) => Promise<void>
}

interface ItransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionsContextType)

export function TransactionsProvider({ children }: ItransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactionProps[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransaction(data: ICreateTransactionInput) {
    const { description, price, category, type } = data
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((prevState) => [response.data, ...prevState])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
