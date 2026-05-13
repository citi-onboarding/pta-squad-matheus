'use client';

import Image from "next/image";
import { useState } from 'react';
import { Home, BookOpen, Plus } from '';
import { LogoCITi } from "../../assets";

import { Button } from "../ui/button"

type ActiveTab = 'dashboard' | 'livros';

export function Header() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  return (
    <>
      {/* Barrinha verde decorativa no topo */}
      <div className="h-1 bg-green-400 w-full" />

      {/* Container principal */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">

        {/* Lado esquerdo: Logo + Nome */}
        <div className="flex items-center gap-3">
          <Image src={LogoCITi} alt="Logo do CITi" width={40} height={40} />
          <span className="text-lg font-semibold text-gray-800">
            Biblioteca Escolar
          </span>
        </div>

        {/* Lado direito: Navegação */}
        <nav className="flex items-center gap-3">
          {/* Criar os 3 itens de navegação aqui */}
          {/* 1. Dashboard — estilo texto simples com ícone Home */}
          <Button variant="ghost" className="flex gap-2">
            <Image src={LogoCITi} alt="Logo do CITi" width={40} height={40} />
            <h1>Dashboard</h1>
          </Button>
          {/* 2. Livros — estilo outline verde com ícone BookOpen */}
          {/* 3. + Novo Livro — estilo sólido verde com ícone Plus */}
        </nav>

      </header>
    </>
  );
}