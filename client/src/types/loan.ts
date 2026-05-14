export type LoanStatus = 'Em andamento' | 'Atrasado' | 'Devolvido'

export interface Loan {
  id: string
  bookTitle: string
  clientName: string
  loanDate: string   
  returnDate: string 
  returned: boolean
}
