'use client';

import { useState, useEffect } from 'react';
import { LastLoansTable } from '@/components/last-loans-table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {

  const [totalLivros, setTotalLivros] = useState(0);
  const [emprestimosAtivos, setEmprestimosAtivos] = useState(0);
  const [livrosAtrasados, setLivrosAtrasados] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [ultimosEmprestimos, setUltimosEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function carregarDados() {
      try {
        // Buscar livros
        const resLivros = await fetch('/api/livros');
        const livros = await resLivros.json();

        // Buscar empréstimos
        const resEmprestimos = await fetch('/api/emprestimos');
        const emprestimos = await resEmprestimos.json();

        // Calcular métricas
        setTotalLivros(livros.length);

        // VOCÊ DEVE: calcular empréstimos ativos e atrasados
        const hoje = new Date();

        let ativos = 0;
        let atrasados = 0;
        
        emprestimos.forEach(emprestimo => {
          const dataDevolucao = new Date(emprestimo.dataPrevistaDevolucao);
          const emprestimoStatus = emprestimo.status;
          if (emprestimoStatus === 'EM_ANDAMENTO') {
            ativos++;
          } 
          if (dataDevolucao < hoje && emprestimoStatus != 'DEVOLVIDO') {
            atrasados++;
          }
        });
        setEmprestimosAtivos(ativos);
        setLivrosAtrasados(atrasados);

        // VOCÊ DEVE: agrupar livros por categoria pro gráfico
        const categoriasMap = [
          { name: 'ROMANCE', quantidade: 0 },
          { name: 'INFANTIL', quantidade: 0 },
          { name: 'TECNOLOGIA', quantidade: 0 },
          { name: 'HISTORIA', quantidade: 0 },
          { name: 'CIENCIAS', quantidade: 0 },
        ];

        livros.forEach(livro => {
          const categoria = livro.categoria;
          if (categoria === 'ROMANCE') {
            categoriasMap[0].quantidade++;
          }
          if (categoria === 'INFANTIL') {
            categoriasMap[1].quantidade++;
          }
          if (categoria === 'TECNOLOGIA') {
            categoriasMap[2].quantidade++;
          }
          if (categoria === 'HISTORIA') {
            categoriasMap[3].quantidade++;
          }
          if (categoria === 'CIENCIAS') {
            categoriasMap[4].quantidade++;
          }
        });

        setCategorias(categoriasMap);

        // VOCÊ DEVE: pegar os últimos empréstimos pra tabela
        const listaEmprestimos = emprestimos.map(emprestimo => {
          const livroEncontrado = livros.find(livro => livro.id === emprestimo.livroId);

          return {
            bookTitle: livroEncontrado ? livroEncontrado.titulo : 'Livro não encontrado',
            clientName: emprestimo.nomeCliente,
            clientEmail: emprestimo.emailCliente,
            loanDate: emprestimo.dataLocacao,
            returnDate: emprestimo.dataPrevistaDevolucao,
            id: emprestimo.id,
            returned: emprestimo.status === 'DEVOLVIDO' ? true : false,
          }
        });

        setUltimosEmprestimos(listaEmprestimos);

        


      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex flex-col items-center justify-center h-[70vh]">
        {/* Esse é um spinner animado feito puramente com Tailwind */}
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Carregando métricas da biblioteca...</p>
      </div>
    );
  }
  
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
          <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-4">
            <div className="bg-green-100 p-2 rounded-md">
              <img src="/img/greenOpenBook.png" alt="Total de Livros" className="w-6 h-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-1 ml-3">
              <h1 className="">Total de livros</h1>
              <span>{totalLivros}</span>
            </div>
          </div>

          {/* CARD 2: Empréstimos Ativos */}
          <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-4">
            <div className="bg-green-100 p-2 rounded-md">
              <img src="/img/greenClock.png" alt="Empréstimos Ativos" className="w-6 h-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-1 ml-3">
              <h1 className="">Empréstimos Ativos</h1>
              <span>{emprestimosAtivos}</span>
            </div>
          </div>

          {/* CARD 3: Livros Atrasados */}
          <div className="flex items-center gap-2 bg-white rounded-md shadow-sm border border-gray-100 px-4 py-4">
            <div className="bg-red-100 p-2 rounded-md">
              <img src="/img/redAlert.png" alt="Livros Atrasados" className="w-6 h-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-1 ml-3">
              <h1 className="">Livros Atrasados</h1>
              <span>{livrosAtrasados}</span>
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
            <BarChart data={categorias}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
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
              <LastLoansTable loans={ultimosEmprestimos} />
          </div>
        </div>

      </div>
    </>
  );
}