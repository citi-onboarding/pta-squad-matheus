export interface Emprestimo {
    id: string;
    tituloLivro: string;
    usuario: string;
    emailUsuario: string;
    dataLocacao: string;
    dataDevolucao: string;
    devolvido: boolean;
}