const API_URL = 'http://10.0.2.2:3001';

export const api = {
    async buscarEmprestimos() {
        const response = await fetch(`${API_URL}/api/emprestimos`);

        if (!response.ok) {
            throw new Error('Erro ao buscar empréstimos');
        }
        return response.json();
    },

    async buscarLivroPorId(id: string) {
        const response = await fetch(`${API_URL}/api/livros/${id}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar livro');
        }
        return response.json();
    }
};