import { LoanStatus } from '@/types/loan'
import { statusClass } from '@/utils/loan-utils'

interface StatusBadgeProps {
  status: LoanStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={statusClass[status]}>{status}</span>
}
