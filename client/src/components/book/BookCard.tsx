// BookCard.tsx

import { Eye, BookOpen, Trash2 } from 'lucide-react';
import RetangularButton from '../layout/RetangularButton';

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
    <div className="bg-white rounded-md shadow-sm border border-gray-100
      overflow-hidden hover:shadow-md transition-shadow flex flex-col max-w-full sm:max-w-[24rem]">

        {/* SEÇÃO 1: Área da capa */}
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <img src={coverUrl} alt={`Capa do livro ${title}`} className="w-full h-full object-cover" />
      </div>

        {/* SEÇÃO 2: Informações do livro */}
      <div className="px-5 pt-4 pb-2 space-y-1">
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          <h2 className="text-sm text-gray-500">{author}</h2>
          <p className="text-sm text-emerald-400 font-medium">{category}</p>
          <p className="text-sm text-gray-500">Disponíveis: {availableQuantity} unidade(s)</p>
      </div>

      {/* SEÇÃO 3: Botões de ação */}
      <div className="grid grid-cols-4 gap-2 px-4 pb-4 pt-4 mt-auto">
        {/* 1. Ver — outline verde (borda verde, texto verde, fundo transparente) */}
        <RetangularButton className="col-span-1 border-2 border-emerald-400 justify-center font-semibold" text="Ver" backgroundColor="bg-white" textColor="text-emerald-400" srcImage="/img/eye.png"/>
        {/* 2. Emprestar — sólido verde (fundo verde, texto branco) */}
        <RetangularButton 
            className="col-span-2 justify-center"
            text={availableQuantity > 0 ? "Emprestar" : "Indisponível"} 
            backgroundColor={availableQuantity > 0 ? "bg-emerald-400" : "bg-gray-400"} 
            textColor="text-white" 
            srcImage="/img/borrow.png"/>
        {/* 3. Excluir — sólido vermelho, só ícone (fundo vermelho, ícone branco) */}
        <RetangularButton className="col-span-1 justify-center" text= "" backgroundColor="bg-red-600" textColor="text-white" srcImage="/img/trash.png"/>
      </div>

    </div>
  );
}