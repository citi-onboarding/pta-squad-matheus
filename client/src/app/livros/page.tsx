'use client';

import { BookCard } from '@/components/book/BookCard';
import { Search } from 'lucide-react';

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
        <div className = "flex items-center gap-2 rounded-md shadow-sm border border-gray-100 h-9 w-full"> 
          <Search className="ml-2 w-5 h-5 text-gray-400" />
          <input type="email" placeholder="Buscar por título ou autor..." className='border-gray-600 px-4 flex-auto hover:bg-gray-50 p-1'/>
        </div>
        {/* Dica: flex com ícone Search do Lucide à esquerda */}
        <div className = "flex items-center gap-2 rounded-md shadow-sm border border-gray-100 h-9"> 
          <select name="category" id="category" className='border-gray-100 px-4 rounded-2xl hover:bg-gray-50'>
            <option value="">Todas as categorias</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="infantil">Infantil</option>
            <option value="romance">Romance</option>
            <option value="ficção">Ficção</option>
          </select>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* VOCÊ DEVE: mapear o array mockLivros e renderizar um BookCard pra cada */}
      </div>
    </div>
    
  );
}