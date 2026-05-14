'use client';

import Image from "next/image";
import RetangularButton from "../layout/RetangularButton";
import { useState } from 'react';
import { LogoCITi } from "../../assets";

type ActiveTab = 'dashboard' | 'livros' | 'novo livro';

export function Header() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  return (
    <>
      {/* Barrinha verde decorativa no topo */}
      <div className="h-1 bg-green-400 w-full" />

      {/* Container principal */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-around">

        {/* Lado esquerdo: Logo + Nome */}
        <div className="flex items-center gap-3">
          <Image className="brightness-1" src={LogoCITi} alt="Logo do CITi" width={40} height={40} />
          <span className="text-lg font-semibold text-gray-800">
            Biblioteca Escolar
          </span>
        </div>

        {/* Lado direito: Navegação */}
        <nav className="flex items-center gap-3">
          {/* Criar os 3 itens de navegação aqui */}
          {/* 1. Dashboard — estilo texto simples com ícone Home */}
          <RetangularButton 
            backgroundColor={activeTab === 'dashboard' ? 'bg-emerald-100' : 'bg-transparent'}
            textColor={activeTab === 'dashboard' ? 'text-emerald-600' : 'text-gray-800'}
            text="Dashboard"
            srcImage={activeTab === 'dashboard' ? "/img/selecthome.png" : "/img/home.png"}
            onClick={() => {setActiveTab('dashboard'),
                            console.log('Aba atual: dashboard');}}
          />
          {/* 2. Livros — estilo outline verde com ícone BookOpen */}
          <RetangularButton
            text="Livros"
            backgroundColor={activeTab === 'livros' ? 'bg-emerald-100' : 'bg-transparent'}
            textColor={activeTab === 'livros' ? 'text-emerald-600' : 'text-gray-800'}
            srcImage={activeTab === 'livros' ? "/img/selectopenbook.png" : "/img/openbook.png"}
            onClick={() => {setActiveTab('livros'),
                            console.log('Aba atual: livros');}}
          />
          {/* 3. + Novo Livro — estilo sólido verde com ícone Plus */}
          <RetangularButton
            text="Novo Livro"
            textColor="text-white"
            backgroundColor="bg-green-400"
            srcImage="/img/plus.png"
            onClick={() => {setActiveTab('novo livro'),
                            console.log('Aba atual: novo livro');}}
          />
        </nav>

      </header>
    </>
  );
}