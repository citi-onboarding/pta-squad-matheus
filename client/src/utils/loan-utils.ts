import { Loan, LoanStatus } from '@/types/loan'

export const statusClass: Record<LoanStatus, string> = {
  'Em andamento': 'status-badge status-badge--ongoing',
  'Atrasado':     'status-badge status-badge--late',
  'Devolvido':    'status-badge status-badge--returned',
}

export function computeStatus(loan: Loan): LoanStatus {
  if (loan.returned) return 'Devolvido'
  const today = new Date().toISOString().split('T')[0]
  if (today > loan.returnDate) return 'Atrasado'
  return 'Em andamento'
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}
