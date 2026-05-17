import { Loan } from '@/types/loan'
import { computeStatus, formatDate } from '@/utils/loan-utils'
import { StatusBadge } from '@/components/ui/status-badge'

interface LastLoansTableProps {
  loans: Loan[]
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
