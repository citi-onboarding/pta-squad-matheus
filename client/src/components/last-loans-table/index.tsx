import { Loan, LoanStatus } from '@/types/loan'

interface LastLoansTableProps {
  loans: Loan[]
}

const statusClass: Record<LoanStatus, string> = {
  'Em andamento': 'status-badge status-badge--ongoing',
  'Atrasado':     'status-badge status-badge--late',
  'Devolvido':    'status-badge status-badge--returned',
}

function computeStatus(loan: Loan): LoanStatus {
  if (loan.returned) return 'Devolvido'
  const today = new Date().toISOString().split('T')[0]
  if (today > loan.returnDate) return 'Atrasado'
  return 'Em andamento'
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

function StatusBadge({ status }: { status: LoanStatus }) {
  return <span className={statusClass[status]}>{status}</span>
}

export function LastLoansTable({ loans }: LastLoansTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="table-header-row table-row-border">
            <th className="py-3 pl-4 pr-8 text-left font-bold text-gray-900">Livro</th>
            <th className="py-3 pl-4 pr-8 text-left font-bold text-gray-900">Cliente</th>
            <th className="py-3 pl-4 pr-8 text-left font-bold text-gray-900">Data de Locação</th>
            <th className="py-3 pl-4 pr-8 text-left font-bold text-gray-900">Data de Devolução</th>
            <th className="py-3 pl-4 text-left font-bold text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => {
            const status = computeStatus(loan)
            return (
              <tr key={loan.id} className="table-row-border">
                <td className="py-3 pl-4 pr-8 text-gray-900">{loan.bookTitle}</td>
                <td className="py-3 pl-4 pr-8 text-gray-900">{loan.clientName}</td>
                <td className="py-3 pl-4 pr-8 text-gray-900">{formatDate(loan.loanDate)}</td>
                <td className="py-3 pl-4 pr-8 text-gray-900">{formatDate(loan.returnDate)}</td>
                <td className="py-3 pl-4">
                  <StatusBadge status={status} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
