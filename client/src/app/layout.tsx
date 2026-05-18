'use client';

import "styles/globals.css";
import { Header } from '@/components/layout/Header';
import { usePathname, useRouter } from 'next/navigation';
import { ActiveTab } from '@/components/layout/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab: ActiveTab = pathname.includes('/livros')
    ? 'livros'
    : 'dashboard';

  function handleTabChange(tab: ActiveTab) {
    if (tab === 'dashboard') router.push('/dashboard');
    if (tab === 'livros') router.push('/livros');
    if (tab === 'novo livro') router.push('/novoLivro');
  }

  return (
    <html>
      <body>
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        {children}
      </body>
    </html>
  );
}