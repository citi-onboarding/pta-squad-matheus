import { Header } from '@/components/layout/Header';
import { LastLoansTable } from '@/components/last-loans-table/index';
import { BookCard } from '@/components/layout/book/BookCard';

export default function TestPage() {
  return (
    <div>
      <Header />
      <div className="p-10 grid grid-cols-3 gap-4 w-[70%] mx-auto">
        <BookCard
          title="Livro 1"
          author="Autor 1"
          category="Genero 1"
          availableQuantity={1}
          coverUrl="/img/Ciencias.png"
        />
        <BookCard
          title="Livro 2"
          author="Autor 2"
          category="Genero 2"
          availableQuantity={2}
          coverUrl="/img/Ciencias.png"
        />
        <BookCard
          title="Livro 3"
          author="Autor 3"
          category="Genero 3"
          availableQuantity={3}
          coverUrl="/img/Ciencias.png"
        />
        <BookCard
          title="Livro 4"
          author="Autor 4"
          category="Genero 4"
          availableQuantity={4}
          coverUrl="/img/Ciencias.png"
        />
      </div>
    </div>
  );
}