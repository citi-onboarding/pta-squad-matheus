export type LoanStatus = 'Em andamento' | 'Atrasado' | 'Devolvido'

export interface Loan {
  id: string
  bookTitle: string
  clientName: string
  clientEmail: string
  loanDate: string
  returnDate: string
  returned: boolean
}
