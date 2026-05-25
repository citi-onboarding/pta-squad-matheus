'use client';

import { BookCard } from '@/components/book/BookCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Dados mockados para desenvolvimento
const mockLivros = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Tecnologia',
    availableQuantity: 5,
  },
  {
    id: '2',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    category: 'Infantil',
    availableQuantity: 8,
  },
  {
    id: '3',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    category: 'Romance',
    availableQuantity: 3,
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    category: 'Ficção',
    availableQuantity: 5,
  },
  {
    id: '5',
    title: 'Tudo é Rio',
    author: 'Carla Madeira',
    category: 'Romance',
    availableQuantity: 3,
  },
  {
    id: '6',
    title: 'morte e vida severina',
    author: 'João Cabral de Melo Neto',
    category: 'Romance',
    availableQuantity: 3,
  },
  // VOCÊ DEVE: adicionar mais 3 livros mockados pra preencher o grid
];

export default function LivrosPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Título da página */}
      <h1 className="text-2xl font-bold text-gray-800">Livros</h1>
      <p className="text-sm text-gray-500 mb-6">
        Gerencie o acervo da biblioteca
      </p>

      {/* Barra de busca */}
      <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-2 mb-6">
        {/* VOCÊ DEVE: montar a barra de busca com ícone e input */}
        <Search className="w-5 h-5 text-gray-400" />
        <input type="email" placeholder="Buscar por título ou autor..." className='border-gray-100 px-4 flex-auto hover:bg-gray-50 p-1'/>
        {/* Dica: flex com ícone Search do Lucide à esquerda */}
        <select name="category" id="category" className='border-gray-100 px-4 rounded-2xl hover:bg-gray-50'>
          <option value="">Todas as categorias</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="infantil">Infantil</option>
          <option value="romance">Romance</option>
          <option value="ficção">Ficção</option>
        </select>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLivros.map((livro) => (
        <BookCard
          key={livro.id}
          id={livro.id}
          title={livro.title}
          author={livro.author}
          category={livro.category}
          availableQuantity={livro.availableQuantity}
          onView={(id) => console.log('Ver', id)}
          onBorrow={(id) => console.log('Emprestar', id)}
          onDelete={(id) => console.log('Excluir', id)}
        />))}
        {/* VOCÊ DEVE: mapear o array mockLivros e renderizar um BookCard pra cada */}
      </div>
    </div>
    
  );
}