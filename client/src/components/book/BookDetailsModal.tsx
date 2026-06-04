'use client';

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { LoanHistoryRow } from '@/components/loan-history-row/index';
import { Loan } from '@/types/loan';
import RetangularButton from '../layout/RetangularButton';

// Tipagem baseada no que o seu backend (Prisma) deve retornar
interface LivroAPI {
    id: string;
    titulo: string;
    autor: string;
    isbn: string;
    categoria: string;
    editora: string;
    ano: number;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
    emprestimos: any[]; // Vamos mapear isso para o tipo Loan do frontend
}

interface BookDetailsModalProps {
    bookId: string; // Mudamos as props: agora recebemos apenas o ID
}

export function BookDetailsModal({ bookId }: BookDetailsModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bookData, setBookData] = useState<LivroAPI | null>(null);
    const [loans, setLoans] = useState<Loan[]>([]);

    const fetchBookDetails = useCallback(async () => {
        setIsLoading(true);
        try {
            // Buscando o livro com os empréstimos atrelados (exige que a API retorne o include do Prisma)
            const res = await fetch(`/api/livros/${bookId}`);

            if (res.ok) {
                const data = await res.json();
                setBookData(data);

                // Mapeando os dados do Banco (Português) para o tipo Loan do Frontend (Inglês)
                if (data.emprestimos) {
                    const mappedLoans: Loan[] = data.emprestimos.map((emp: any) => ({
                        id: emp.id,
                        bookTitle: data.titulo,
                        clientName: emp.nomeCliente,
                        clientEmail: emp.emailCliente,
                        loanDate: emp.dataLocacao,
                        returnDate: emp.dataPrevistaDevolucao,
                        returned: emp.status === 'DEVOLVIDO'
                    }));
                    setLoans(mappedLoans);
                }
            } else {
                console.error("Falha ao buscar detalhes do livro.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        } finally {
            setIsLoading(false);
        }
    }, [bookId]);

    // Só fazemos a requisição para a API quando o usuário clicar em "Ver" e abrir a modal
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            fetchBookDetails(); // Recarrega sempre que abrir para ter dados frescos
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {/* Substituímos o botão padrão pelo seu botão customizado! */}
                <div className="col-span-1 h-full w-full">
                    <RetangularButton
                        className="w-full h-full border-2 border-brand-green justify-center font-semibold cursor-pointer"
                        text="Ver"
                        backgroundColor="bg-white"
                        textColor="text-emerald-400"
                        srcImage="/img/eye.png"
                    />
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-[55rem] max-h-[100vh] overflow-y-auto gap-6">
                <DialogHeader>
                    <DialogTitle>Detalhes do Livro</DialogTitle>
                </DialogHeader>

                <hr className="border-gray-200" />

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-gray-500 font-medium animate-pulse">Carregando informações...</p>
                    </div>
                ) : bookData ? (
                    <>
                        <div className="flex gap-4">
                            <div className="w-60 h-88 bg-gray-200 rounded-md flex-shrink-0" />

                            <div className="flex flex-col">
                                <h2 className="text-xl font-medium">{bookData.titulo}</h2>
                                <p className="text-gray-500">{bookData.autor}</p>
                                <div className="grid grid-cols-2 gap-x-20 gap-y-4 mt-4">
                                    <div>
                                        <p className="text-sm text-gray-500">ISBN</p>
                                        <p className="">{bookData.isbn}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Categoria</p>
                                        <p className="text-emerald-500">{bookData.categoria}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Editora</p>
                                        <p className="">{bookData.editora}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Ano</p>
                                        <p className="">{bookData.ano}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Quantidade Total</p>
                                        <p className="">{bookData.quantidadeTotal}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Quantidade Disponível</p>
                                        <p className="text-emerald-500">{bookData.quantidadeDisponivel} Unidades</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-medium">Histórico de Empréstimos</h2>
                            {loans.length > 0 ? (
                                loans.map((emprestimo) => (
                                    <LoanHistoryRow
                                        key={emprestimo.id}
                                        loan={emprestimo}
                                    // Você pode passar as funções de Confirmar Devolução aqui depois
                                    />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 py-4">Nenhum empréstimo registrado para este livro.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-red-500 font-medium">Erro ao carregar o livro. Tente novamente.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}