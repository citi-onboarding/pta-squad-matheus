import { Loan, LoanStatus } from '@/types/loan'

export const statusClass: Record<LoanStatus, string> = {
  'Em andamento': 'status-badge status-badge--ongoing',
  'Atrasado':     'status-badge status-badge--late',
  'Devolvido':    'status-badge status-badge--returned',
}

export function computeStatus(loan: Loan): LoanStatus {
  if (loan.returned) return 'Devolvido'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const ret = new Date(loan.returnDate + 'T00:00:00')
  if (today > ret) return 'Atrasado'
  return 'Em andamento'
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}
