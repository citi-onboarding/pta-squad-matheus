import { Header } from '@/components/layout/Header';
import { LastLoansTable } from '@/components/last-loans-table/index';
import { BookCard } from '@/components/layout/book/BookCard';

export default function TestPage() {
  return (
    <div>
      <Header />
      <div className="p-10 grid grid-cols-3 gap-4">
        <BookCard
          title="O Senhor dos Anéis"
          author="J.R.R. Tolkien"
          category="Fantasia"
          availableQuantity={5}
          coverUrl="/img/lotr.jpg"
        />
        <BookCard
          title="Tudo é rio"
          author="Carla Madeira"
          category="Romance"
          availableQuantity={0}
          coverUrl="/img/lotr.jpg"
        />
        <BookCard
          title="ddd 81"
          author="fulaninho"
          category="Romance"
          availableQuantity={2}
          coverUrl="/img/lotr.jpg"
        />
        <BookCard
          title="Hora da estrela"
          author="Clarice Lispector"
          category="Romance"
          availableQuantity={2}
          coverUrl="/img/lotr.jpg"
        />
      </div>
    </div>
  );
}