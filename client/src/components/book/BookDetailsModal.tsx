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
import RetangularButton from '../layout/RetangularButton';

interface Livro {
    titulo: string;
    autor: string;
    isbn: string;
    categoria: string;
    editora: string;
    ano: number;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
}

interface Emprestimo {
    id: string;
    bookTitle: string;
    clientName: string;
    clientEmail: string;
    loanDate: string;
    returnDate: string;
    returned: boolean;
}

interface BookDetailsModalProps {
    livro: Livro;
    emprestimos: Emprestimo[];
}

export function BookDetailsModal({ livro, emprestimos }: BookDetailsModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <RetangularButton className="col-span-1 border-2 border-brand-green justify-center font-semibold" text="Ver" backgroundColor="bg-white" textColor="text-emerald-400" srcImage="/img/eye.png"/>
            </DialogTrigger>

            <DialogContent className="max-w-[55rem] max-h-[100vh] overflow-y-auto gap-6">
                <DialogHeader>
                    <DialogTitle>Detalhes do Livro</DialogTitle>
                </DialogHeader>

                <hr className="border-gray-200" />

                <div className="flex gap-4">
                    <div className="w-60 h-88 bg-gray-200 rounded-md flex-shrink-0" />

                    <div className="flex flex-col">
                        <h2 className="text-xl font-medium">{livro.titulo}</h2>
                        <p className="text-gray-500">{livro.autor}</p>
                        <div className="grid grid-cols-2 gap-x-20 gap-y-4 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">ISBN</p>
                                <p className="">{livro.isbn}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Categoria</p>
                                <p className="text-emerald-500">{livro.categoria}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Editora</p>
                                <p className="">{livro.editora}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ano</p>
                                <p className="">{livro.ano}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Quantidade Total</p>
                                <p className="">{livro.quantidadeTotal}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Quantidade Disponivel</p>
                                <p className="text-emerald-500">{livro.quantidadeDisponivel} Unidades</p>
                            </div>
                        </div>
                    </div>

                </div>

                <hr className="border-gray-200" />

                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-medium">Histórico de Empréstimos</h2>
                    {emprestimos.map((emprestimo) => (
                        <LoanHistoryRow
                            key={emprestimo.id}
                            loan={emprestimo}
                        />
                    ))}
                </div>

            </DialogContent>
        </Dialog>
    );
}