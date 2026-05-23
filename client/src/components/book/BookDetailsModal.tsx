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
        borrowerName: 'João Silva',
        borrowerEmail: 'joao@email.com',
        borrowDate: '20/04/2026',
        expectedReturnDate: '27/04/2026',
        status: 'em_andamento' as const,
    },
    {
        borrowerName: 'Maria Santos',
        borrowerEmail: 'maria@email.com',
        borrowDate: '10/04/2026',
        expectedReturnDate: '17/04/2026',
        status: 'atrasado' as const,
    },
    {
        borrowerName: 'Pedro Costa',
        borrowerEmail: 'pedro@email.com',
        borrowDate: '05/04/2026',
        expectedReturnDate: '12/04/2026',
        status: 'devolvido' as const,
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
                {/* linha cinza */}
                <hr className="border-gray-200" />

                {/* div que contem lado a lado a capa e as infos */}
                <div className="flex gap-4">
                    {/* capa */}
                    <div className="w-60 h-88 bg-gray-200 rounded-md flex-shrink-0" />

                    {/* div que contem titulo autor e tabela em coluna(um em cima do outro) */}
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
                            {/* ... repete o padrão para os outros campos */}
                        </div>
                    </div>

                </div>


                {/* SEÇÃO 1: Informações do livro */}
                {/* VOCÊ DEVE: montar capa + título + autor + grid de infos */}

                {/* Separador */}
                <hr className="border-gray-200" />

                {/* SEÇÃO 2: Histórico de Empréstimos */}
                {/* VOCÊ DEVE: título "Histórico de Empréstimos" + HistoryRows */}

            </DialogContent>
        </Dialog>
    );
}