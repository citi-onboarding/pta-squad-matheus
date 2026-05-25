// BookDetailsModal.tsx

'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { LoanHistoryRow } from '@/components/loan-history-row/index';

// Dados mockados
const mockLivro = {
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    isbn: '978-0132350884',
    categoria: 'Infantil',
    editora: 'Prentice Hall',
    ano: 2008,
    quantidadeTotal: 10,
    quantidadeDisponivel: 8,
};

const mockEmprestimos = [
    {
        id: '1',
        bookTitle: 'O Pequeno Príncipe',
        clientName: 'João Silva',
        clientEmail: 'joao@email.com',
        loanDate: '2026-04-20',
        returnDate: '2026-05-27',
        returned: false,
    },
    {
        id: '2',
        bookTitle: 'O Pequeno Príncipe',
        clientName: 'Maria Santos',
        clientEmail: 'maria@email.com',
        loanDate: '2026-04-10',
        returnDate: '2026-04-17',
        returned: false,
    },
    {
        id: '3',
        bookTitle: 'O Pequeno Príncipe',
        clientName: 'Pedro Costa',
        clientEmail: 'pedro@email.com',
        loanDate: '2026-04-05',
        returnDate: '2026-04-12',
        returned: true,
    },
];

export function BookDetailsModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-emerald-500 text-emerald-500">
                    Ver
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[55rem] max-h-[100vh] overflow-y-auto gap-6">
                <DialogHeader>
                    <DialogTitle>Detalhes do Livro</DialogTitle>
                </DialogHeader>

                <hr className="border-gray-200" />

                <div className="flex gap-4">
                    <div className="w-60 h-88 bg-gray-200 rounded-md flex-shrink-0" />

                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">{mockLivro.titulo}</h2>
                        <p className="text-gray-500">{mockLivro.autor}</p>
                        <div className="grid grid-cols-2 gap-x-20 gap-y-4 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">ISBN</p>
                                <p className="font-medium">{mockLivro.isbn}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Categoria</p>
                                <p className="font-medium text-emerald-500">{mockLivro.categoria}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Editora</p>
                                <p className="font-medium">{mockLivro.editora}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ano</p>
                                <p className="font-medium">{mockLivro.ano}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Quantidade Total</p>
                                <p className="font-medium">{mockLivro.quantidadeTotal}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Quantidade Disponivel</p>
                                <p className="font-medium text-emerald-500">{mockLivro.quantidadeDisponivel} Unidades</p>
                            </div>
                        </div>
                    </div>

                </div>

                <hr className="border-gray-200" />

                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">Histórico de Empréstimos</h2>
                    {mockEmprestimos.map((emprestimo) => (
                        <LoanHistoryRow
                            key={emprestimo.clientEmail}
                            loan={emprestimo}
                        />
                    ))}
                </div>

            </DialogContent>
        </Dialog>
    );
}