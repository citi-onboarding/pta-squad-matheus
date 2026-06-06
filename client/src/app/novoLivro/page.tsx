'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CadastrarLivroForm {
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  ano: number;
  quantidadeTotal: number;
  categoria: string;
  capa?: string;
}

const categorias = [
  { value: 'ROMANCE', label: 'Romance' },
  { value: 'TECNOLOGIA', label: 'Tecnologia' },
  { value: 'HISTORIA', label: 'História' },
  { value: 'CIENCIAS', label: 'Ciências' },
  { value: 'INFANTIL', label: 'Infantil' },
];

export default function CadastrarLivroPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CadastrarLivroForm>();
  const categoriaSelecionada = watch('categoria');
  const [feedback, setFeedback] = useState<
    { tipo: 'sucesso' | 'erro'; texto: string } | null
  >(null);
  const [capaPreview, setCapaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setFeedback({ tipo: 'erro', texto: 'A imagem deve ter no máximo 2MB.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setCapaPreview(base64);
      setValue('capa', base64);
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  async function onSubmit(data: CadastrarLivroForm) {
    setFeedback(null);
    try {
      const res = await fetch('/api/livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setFeedback({
          tipo: 'erro',
          texto:
            res.status === 409
              ? 'Já existe um livro com este ISBN'
              : 'Erro ao cadastrar livro',
        });
        return;
      }
      setFeedback({ tipo: 'sucesso', texto: 'Livro cadastrado com sucesso!' });
      reset();
      setCapaPreview(null);
    } catch {
      setFeedback({ tipo: 'erro', texto: 'Erro de conexão com o servidor' });
    }
  }

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F7F9FA] md:flex md:flex-col">
      <div className="max-w-4xl md:max-w-5xl w-full mx-auto p-6 md:flex md:flex-col md:flex-1">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">
          Cadastrar Novo Livro
        </h1>
        <p className="text-base text-gray-500 mb-8">
          Adicione um novo livro ao acervo
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl border border-[#D9E2E8] p-6 md:flex md:flex-col md:flex-1 md:mb-8 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
        >
          {feedback && (
            <div
              className={`mb-4 px-4 py-3 rounded-md text-sm ${
                feedback.tipo === 'sucesso'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {feedback.texto}
            </div>
          )}

          {/* Seção 1 — Campos do formulário + Capa */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-stretch md:flex-1">

            {/* Campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start md:auto-rows-fr">
              <div className="relative grid gap-2 md:flex md:flex-col md:justify-between">
                <Label className="md:text-base" htmlFor="titulo">
                  Título
                </Label>
                <Input
                  id="titulo"
                  placeholder="Digite o título do livro"
                  className="md:flex-1 md:max-h-[56px] md:!text-base"
                  {...register('titulo', { required: '*Este é um campo obrigatório.' })}
                />
                {errors.titulo && (
                  <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] md:pl-2">
                    {errors.titulo.message}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2 md:flex md:flex-col md:justify-between">
                <Label className="md:text-base" htmlFor="autor">
                  Autor
                </Label>
                <Input
                  id="autor"
                  placeholder="Digite o nome do autor"
                  className="md:flex-1 md:max-h-[56px] md:!text-base"
                  {...register('autor', { required: '*Este é um campo obrigatório.' })}
                />
                {errors.autor && (
                  <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] md:pl-2">
                    {errors.autor.message}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2 md:flex md:flex-col md:justify-between">
                <Label className="md:text-base" htmlFor="isbn">
                  ISBN
                </Label>
                <Input
                  id="isbn"
                  placeholder="Digite o ISBN"
                  className="md:flex-1 md:max-h-[56px] md:!text-base"
                  {...register('isbn', {
                    required: '*Este é um campo obrigatório.',
                    validate: (v) => {
                      const digits = v.replace(/\D/g, '');
                      return (digits.length === 10 || digits.length === 13) || '*ISBN deve ter 10 ou 13 dígitos.';
                    },
                  })}
                />
                {errors.isbn && (
                  <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] md:pl-2">
                    {errors.isbn.message}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2 md:flex md:flex-col md:justify-between">
                <Label className="md:text-base" htmlFor="editora">
                  Editora
                </Label>
                <Input
                  id="editora"
                  placeholder="Digite a editora"
                  className="md:flex-1 md:max-h-[56px] md:!text-base"
                  {...register('editora', { required: '*Este é um campo obrigatório.' })}
                />
                {errors.editora && (
                  <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] md:pl-2">
                    {errors.editora.message}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2 md:flex md:flex-col md:justify-between">
                <Label className="md:text-base" htmlFor="ano">
                  Ano
                </Label>
                <Input
                  id="ano"
                  type="number"
                  placeholder="Digite o ano"
                  className="md:flex-1 md:max-h-[56px] md:!text-base"
                  {...register('ano', {
                    required: '*Este é um campo obrigatório.',
                    valueAsNumber: true,
                  })}
                />
                {errors.ano && (
                  <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] md:pl-2">
                    {errors.ano.message}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2 md:flex md:flex-col md:justify-between">
                <Label className="md:text-base" htmlFor="quantidadeTotal">
                  Quantidade
                </Label>
                <Input
                  id="quantidadeTotal"
                  type="number"
                  placeholder="Digite a quantidade"
                  className="md:flex-1 md:max-h-[56px] md:!text-base"
                  {...register('quantidadeTotal', {
                    required: '*Este é um campo obrigatório.',
                    valueAsNumber: true,
                    min: { value: 1, message: '*Quantidade deve ser maior que 0.' },
                  })}
                />
                {errors.quantidadeTotal && (
                  <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] md:pl-2">
                    {errors.quantidadeTotal.message}
                  </span>
                )}
              </div>
            </div>

            {/* Upload da capa */}
            <div className="flex flex-col gap-3">
              <Label className="md:text-base">Capa do Livro</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center flex-1 [aspect-ratio:2/3] md:[aspect-ratio:auto] md:w-[clamp(180px,18vw,280px)] rounded-xl border-2 border-dashed border-[#D9E2E8] bg-[#F7F9FA] hover:border-gray-400 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden"
              >
                {capaPreview ? (
                  <img src={capaPreview} alt="Pré-visualização da capa" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <img src="/img/upload.png" alt="Upload" className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-xs text-gray-400 text-center px-2">Clique para adicionar</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Seção 2 — Categoria */}
          <div className="border-t border-[#D9E2E8] mt-6 pt-6 grid gap-3">
            <Label className="md:text-base">Categoria</Label>
            <input
              type="hidden"
              {...register('categoria', { required: '*Selecione uma categoria.' })}
            />
            <div className="grid grid-cols-2 md:flex md:flex-nowrap mt-2 gap-4">
              {categorias.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setValue('categoria', value, { shouldValidate: true })
                  }
                  className={[
                    'md:flex-1 flex flex-col items-center pt-2 pb-3 px-4 rounded-xl border-2 transition-colors',
                    categoriaSelecionada === value
                      ? 'border-brand-green bg-emerald-50'
                      : 'border-[#D9E2E8] bg-white hover:border-gray-300',
                  ].join(' ')}
                >
                  <div className="w-full h-[112px] md:h-auto md:aspect-[4/5]" />
                  <span className="mt-2 text-sm font-medium text-gray-800">{label}</span>
                </button>
              ))}
            </div>
            {errors.categoria && (
              <span className="text-xs text-[#FF0000] pl-2">
                {errors.categoria.message}
              </span>
            )}
          </div>

          {/* Seção 3 — Botões */}
          <div className="border-t border-[#D9E2E8] mt-6 pt-6 flex flex-col-reverse md:flex-row justify-end gap-3">
            <Button
              type="button"
              onClick={() => {
                reset();
                setCapaPreview(null);
                setFeedback(null);
              }}
              className="border border-brand-green text-brand-green bg-white hover:bg-emerald-50 md:w-auto w-full md:h-12 md:text-base md:px-6"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-green text-white hover:bg-brand-green/90 md:w-auto w-full md:h-12 md:text-base md:px-6"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Livro'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
