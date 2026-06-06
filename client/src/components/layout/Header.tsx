'use client';

import Image from "next/image";
import RetangularButton from "../layout/RetangularButton";
import { LogoCITi } from "../../assets";

export type ActiveTab = 'dashboard' | 'livros' | 'novo livro';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <>
      <div className="w-full" />
      <header className="bg-white border-b border-gray-100 pr-3 py-3 flex items-center justify-around">
        <div className="flex items-center gap-4">
          <Image className="brightness-1" src={LogoCITi} alt="Logo do CITi" width={40} height={40} />
          <span className="text-lg font-semibold text-gray-800">Biblioteca Escolar</span>
        </div>
        <nav className="flex items-center gap-3">
          <RetangularButton
            backgroundColor={activeTab === 'dashboard' ? 'bg-emerald-100' : 'bg-transparent'}
            textColor={activeTab === 'dashboard' ? 'text-emerald-600' : 'text-gray-800'}
            text="Dashboard"
            srcImage={activeTab === 'dashboard' ? "/img/selecthome.png" : "/img/home.png"}
            onClick={() => onTabChange('dashboard')}
          />
          <RetangularButton
            text="Livros"
            backgroundColor={activeTab === 'livros' ? 'bg-emerald-100' : 'bg-transparent'}
            textColor={activeTab === 'livros' ? 'text-emerald-600' : 'text-gray-800'}
            srcImage={activeTab === 'livros' ? "/img/selectopenbook.png" : "/img/openbook.png"}
            onClick={() => onTabChange('livros')}
          />
          <RetangularButton
            text="Novo Livro"
            textColor="text-white"
            backgroundColor="bg-brand-green"
            srcImage="/img/plus.png"
            onClick={() => onTabChange('novo livro')}
          />
        </nav>
      </header>
    </>
  );
}