// emprestimo.ts

export type StatusEmprestimo = 'em_andamento' | 'devolvido' | 'atrasado';

export interface Emprestimo {
    id: string;
    tituloLivro: string;
    status: StatusEmprestimo;
    dataLocacao: string;
    dataDevolucao: string;
}