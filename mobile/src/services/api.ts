const API_URL = 'http://localhost:3001';

export const api = {
    async buscarEmprestimos(nome?: string, pagina: number = 1) {
        let url = `${API_URL}/api/emprestimos?pagina=${pagina}&limite=15`;

        if (nome) {
            url += `&nome=${encodeURIComponent(nome)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao buscar empréstimos');
        }
        return response.json();
    },

    async buscarLivroPorId(id: string) {
        const response = await fetch(`${API_URL}/api/livros/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar livro');
        return response.json();
    }
};