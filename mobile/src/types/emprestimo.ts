export interface Emprestimo {
    id: string;
    livroId: string;
    nomeCliente: string;
    emailCliente: string;
    dataLocacao: string;
    dataPrevistaDevolucao: string;
    status: 'EM_ANDAMENTO' | 'DEVOLVIDO';
    atrasado: boolean;

    tituloLivro?: string;
}