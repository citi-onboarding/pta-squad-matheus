'use client';

import { useCallback, useEffect, useState } from 'react';
import { BookCard } from '@/components/book/BookCard';
import { Search } from 'lucide-react';

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  ano: number;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  categoria: string;
  capa?: string;
}

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const fetchLivros = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/livros');
      if (res.ok) {
        setLivros(await res.json());
      }
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLivros();
  }, [fetchLivros]);

  const livrosFiltrados = livros.filter((livro) => {
    const matchText =
      livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      livro.autor.toLowerCase().includes(busca.toLowerCase());

    const matchCategory =
      categoriaSelecionada === '' || livro.categoria === categoriaSelecionada;

    return matchText && matchCategory;
  });

  async function handleDelete(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir este livro?')) return;

    try {
      const res = await fetch(`/api/livros/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
      }
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex flex-col items-center justify-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Carregando métricas da biblioteca...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">Livros</h1>
      <p className="text-sm text-gray-500 mb-6">Gerencie o acervo da biblioteca</p>

      <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-2 mb-6">
        <div className="flex items-center gap-2 rounded-md shadow-sm border border-gray-100 h-9 w-full">
          <Search className="ml-2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            className="border-gray-600 px-4 flex-auto hover:bg-gray-50 p-1"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 rounded-md shadow-sm border border-gray-100 h-9">
          <select
            name="category"
            id="category"
            className="border-gray-100 px-4 rounded-2xl hover:bg-gray-50"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="TECNOLOGIA">Tecnologia</option>
            <option value="INFANTIL">Infantil</option>
            <option value="ROMANCE">Romance</option>
            <option value="HISTORIA">História</option>
            <option value="CIENCIAS">Ciência</option>
          </select>
        </div>
      </div>

      {livrosFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-medium">Nenhum livro encontrado.</p>
          <p className="text-sm">Tente buscar por outro título ou autor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {livrosFiltrados.map((livro) => (
            <BookCard
              key={livro.id}
              id={livro.id}
              title={livro.titulo}
              author={livro.autor}
              category={livro.categoria}
              availableQuantity={livro.quantidadeDisponivel}
              coverUrl={livro.capa || '/img/openbook.png'}
              onLoanSuccess={fetchLivros}
              onDelete={() => handleDelete(livro.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
