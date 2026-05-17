'use client'

import { Mail } from 'lucide-react'
import { Loan } from '@/types/loan'
import { computeStatus, formatDate } from '@/utils/loan-utils'
import { StatusBadge } from '@/components/ui/status-badge'

interface LoanHistoryRowProps {
  loan: Loan
  onSendReminder?: (loanId: string) => Promise<void>
}

export function LoanHistoryRow({ loan, onSendReminder }: LoanHistoryRowProps) {
  const status = computeStatus(loan)

  return (
    <div className="flex items-center justify-between px-4 py-4 my-4 rounded-lg border border-[#D9E2E8]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-900">{loan.clientName}</span>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-gray-500">{loan.clientEmail}</p>
        <p className="text-sm">
          <span className="text-gray-500">Locação: </span>
          <span className="text-gray-900">{formatDate(loan.loanDate)}</span>
          <span className="text-gray-500">&nbsp;&nbsp;Previsão: </span>
          <span className="text-gray-900">{formatDate(loan.returnDate)}</span>
        </p>
      </div>

      {status === 'Atrasado' && (
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
          style={{ border: '2px solid #00C389', color: '#00C389' }}
          onClick={() => onSendReminder?.(loan.id)}
        >
          <Mail size={18} />
          Enviar Lembrete
        </button>
      )}
    </div>
  )
}
