'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BorrowModalProps {
  livroId: string;
  livroTitulo: string;
  onSuccess?: () => void;
  className?: string;
}

interface EmprestimoForm {
  nomeCliente: string;
  emailCliente: string;
  dataLocacao: string;
  dataPrevistaDevolucao: string;
}

export function BorrowModal({ livroId, livroTitulo, onSuccess, className }: BorrowModalProps) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<
    { tipo: 'sucesso' | 'erro'; texto: string } | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmprestimoForm>();

  useEffect(() => {
    if (!open) {
      reset();
      setFeedback(null);
    }
  }, [open, reset]);

  async function onSubmit(data: EmprestimoForm) {
    setFeedback(null);

    if (data.dataPrevistaDevolucao < data.dataLocacao) {
      setFeedback({
        tipo: 'erro',
        texto: 'Data de devolução deve ser posterior à data de locação',
      });
      return;
    }

    try {
      const res = await fetch('/api/emprestimos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ livroId, ...data }),
      });

      if (!res.ok) {
        setFeedback({
          tipo: 'erro',
          texto:
            res.status === 409
              ? 'Este livro não possui unidades disponíveis'
              : 'Erro ao realizar empréstimo',
        });
        return;
      }

      setFeedback({ tipo: 'sucesso', texto: 'Empréstimo realizado com sucesso!' });
      reset();
      onSuccess?.();
      setOpen(false);
    } catch {
      setFeedback({ tipo: 'erro', texto: 'Erro de conexão com o servidor' });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`bg-brand-green hover:bg-brand-green/80 text-white h-11 ${className}`}>
          Emprestar
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[24rem] flex flex-col border-b border-gray-200 pb-4">
        <div>
            <DialogHeader className="pb-4 border-b border-gray-200">
                <DialogTitle>Realizar Empréstimo</DialogTitle>
                <DialogDescription>
                    Preencha as informações abaixo para registrar o empréstimo.
                </DialogDescription>
            </DialogHeader>

            <div className=" mt-5 bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Livro selecionado</p>
                <p className="text-sm text-gray-600">{livroTitulo}</p>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="grid gap-6 pt-3 pb-6">
            <div className="relative grid gap-2">
              <Label htmlFor="nomeCliente">Nome do Cliente</Label>
              <Input
                id="nomeCliente"
                placeholder="Digite o nome do cliente"
                className="rounded-xl focus-visible:ring-emerald-500"
                {...register('nomeCliente', {
                  required: '*Nome é obrigatório',
                })}
              />
              {errors.nomeCliente && (
                <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] pl-2">{errors.nomeCliente.message}</span>
              )}
            </div>

            <div className="relative grid gap-2">
              <Label htmlFor="emailCliente">Email do Cliente</Label>
              <Input
                id="emailCliente"
                type="text"
                placeholder="Digite o email do cliente"
                className="rounded-xl focus-visible:ring-emerald-500"
                {...register('emailCliente', {
                  required: '*Email é obrigatório',
                  validate: (value) => value.includes('@') || '*Email inválido',
                })}
              />
              {errors.emailCliente && (
                <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] pl-2">{errors.emailCliente.message}</span>
              )}
            </div>

            <div className="relative grid gap-2">
              <Label htmlFor="dataLocacao">Data da Locação</Label>
              <Input
                id="dataLocacao"
                type="date"
                className="rounded-xl focus-visible:ring-emerald-500"
                {...register('dataLocacao', {
                  required: '*Data de locação é obrigatória',
                })}
              />
              {errors.dataLocacao && (
                <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] pl-2">{errors.dataLocacao.message}</span>
              )}
            </div>

            <div className="relative grid gap-2">
              <Label htmlFor="dataPrevistaDevolucao">Data Prevista de Devolução</Label>
              <Input
                id="dataPrevistaDevolucao"
                type="date"
                className="rounded-xl focus-visible:ring-emerald-500"
                {...register('dataPrevistaDevolucao', {
                  required: '*Data de devolução é obrigatória',
                })}
              />
              {errors.dataPrevistaDevolucao && (
                <span className="absolute top-[calc(100%+3px)] text-xs text-[#FF0000] pl-2">{errors.dataPrevistaDevolucao.message}</span>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3 border-t border-gray-200 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 border border-emerald-600 w-28 h-12">
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-green hover:bg-emerald-600 text-white w-52 h-12"
            >
              {isSubmitting ? 'Confirmando...' : 'Confirmar Empréstimo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
