export type StatusEmprestimo = 'devolvido' | 'em_andamento' | 'atrasado';

export interface Emprestimo {
    id: string;
    usuario: string; // Adicionado para cumprir a busca por nome
    tituloLivro: string;
    status: StatusEmprestimo;
    dataLocacao: string;
    dataDevolucao: string;
}