// BookCard.tsx

import { Eye, BookOpen, Trash2 } from 'lucide-react';
import RetangularButton from '../RetangularButton';

interface IBookCardProps {
  title: string;
  author: string;
  category: string;
  availableQuantity: number;
  coverUrl: string;
}

export function BookCard({
  title,
  author,
  category,
  availableQuantity,
  coverUrl,
}: IBookCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100
      overflow-hidden hover:shadow-md transition-shadow">

      {/* SEÇÃO 1: Área da capa */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
      
      </div>

      {/* SEÇÃO 2: Informações do livro */}
      <div className="p-4 space-y-1">
        {/* Título */}
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        {/* Autor */}
        <h2 className="text-sm text-gray-500">{author}</h2>
        {/* Categoria */}
        <p className="text-sm text-green-600 font-medium">{category}</p>
        {/* Disponíveis */}
        <p className="text-sm text-gray-500">Disponíveis: {availableQuantity} unidade(s)</p>
        {/* Renderizar o autor, a categoria e a quantidade */}
        {/* Dica: autor em cinza, categoria em verde*/}
      </div>

      {/* SEÇÃO 3: Botões de ação */}
      <div className="grid grid-cols-4 gap-2 p-4 pt-0">
        {/* Criar os 3 botões aqui */}
        {/* 1. Ver — outline verde (borda verde, texto verde, fundo transparente) */}
        <RetangularButton className="col-span-1 border-2 border-green-400 justify-center" text="Ver" backgroundColor="bg-white" textColor="text-green-600" srcImage="/img/eye.png"/>
        {/* 2. Emprestar — sólido verde (fundo verde, texto branco) */}
        <RetangularButton 
            className="col-span-2 justify-center"
            text={availableQuantity > 0 ? "Emprestar" : "Indisponível"} 
            backgroundColor={availableQuantity > 0 ? "bg-green-600" : "bg-gray-400"} 
            textColor="text-white" 
            srcImage="/img/borrow.png"/>
        {/* 3. Excluir — sólido vermelho, só ícone (fundo vermelho, ícone branco) */}
        <RetangularButton className="col-span-1 justify-center" text= "" backgroundColor="bg-red-600" textColor="text-white" srcImage="/img/trash.png"/>
      </div>

    </div>
  );
}