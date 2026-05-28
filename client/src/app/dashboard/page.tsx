'use client';

import { LastLoansTable } from '@/components/last-loans-table';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        {/* Título */}
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">Visão geral da biblioteca</p>

        {/* SEÇÃO 1: Cards de Métricas */}
        {/* VOCÊ DEVE: criar os 3 cards aqui */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* CARD 1: Total de Livros */}
          <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-4 mb-6">
            <div className="bg-green-100 p-2 rounded-md">
              <img src="/img/greenOpenBook.png" alt="Total de Livros" className="w-6 h-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-1 ml-3">
              <h1 className="">Total de livros</h1>
              <h1>{/* total de livros */}</h1>
            </div>
          </div>

          {/* CARD 2: Empréstimos Ativos */}
          <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-4 mb-6">
            <div className="bg-green-100 p-2 rounded-md">
              <img src="/img/greenClock.png" alt="Total de Livros" className="w-6 h-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-1 ml-3">
              <h1 className="">Empréstimos Ativos</h1>
              <h1>{/* emprestimos ativos */}</h1>
            </div>
          </div>

          {/* CARD 3: Livros Atrasados */}
          <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-4 mb-6">
            <div className="bg-red-100 p-2 rounded-md">
              <img src="/img/redAlert.png" alt="Total de Livros" className="w-6 h-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-1 ml-3">
              <h1 className="">Livros Atrasados</h1>
              <h1>{/* livros atrasados */}</h1>
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: Gráfico de Barras */}
        {/* VOCÊ DEVE: criar o gráfico "Livros por Categoria" aqui */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Livros por Categoria
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[]/* dados de livros por categoria */}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="quantidade" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SEÇÃO 3: Tabela de Últimos Empréstimos */}
        {/* VOCÊ DEVE: usar o TableRow da Sprint 1 aqui */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Últimos Empréstimos
          </h2>
          <div className="divide-y divide-gray-100">
              <LastLoansTable loans={[]/* últimos empréstimos */} />
          </div>
        </div>

      </div>
    </>
  );
}