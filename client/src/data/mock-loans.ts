import { Loan } from '@/types/loan'

export const mockLoans: Loan[] = [
  {
    id: '1',
    bookTitle: 'Clean Code',
    clientName: 'João Silva',
    loanDate: '2026-05-10',
    returnDate: '2026-05-20',
    returned: false,
  },
  {
    id: '2',
    bookTitle: 'O Pequeno Príncipe',
    clientName: 'Maria Santos',
    loanDate: '2026-04-18',
    returnDate: '2026-04-25',
    returned: false,
  },
  {
    id: '3',
    bookTitle: 'Dom Casmurro',
    clientName: 'Pedro Costa',
    loanDate: '2026-04-15',
    returnDate: '2026-04-22',
    returned: true,
  },
  {
    id: '4',
    bookTitle: 'JavaScript: The Good Parts',
    clientName: 'Ana Oliveira',
    loanDate: '2026-05-08',
    returnDate: '2026-05-22',
    returned: false,
  },
]
