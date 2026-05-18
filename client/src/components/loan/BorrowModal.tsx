'use client';

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
  bookTitle: string;
  className?: string;
}

export function BorrowModal({ bookTitle, className }: BorrowModalProps) {
  return (
    <Dialog>
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
                <p className="text-sm text-gray-600">{bookTitle}</p>
            </div>
        </div>
        
        <div className="grid gap-5 py-3 ">
          <div className="grid gap-2">
            <Label htmlFor="clientName">Nome do Cliente</Label>
            <Input
              id="clientName"
              placeholder="Digite o nome do cliente"
              className="rounded-xl focus-visible:ring-emerald-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientEmail">Email do Cliente</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="Digite o email do cliente"
              className="rounded-xl focus-visible:ring-emerald-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="borrowDate">Data da Locação</Label>
            <Input
              id="borrowDate"
              type="date"
              className="rounded-xl focus-visible:ring-emerald-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expectedReturnDate">Data Prevista de Devolução</Label>
            <Input
              id="expectedReturnDate"
              type="date"
              className="rounded-xl focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 border-t border-gray-200 pt-4">
          <DialogClose asChild>
            <Button variant="ghost" className="text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 border border-emerald-600 w-28 h-12">
              Cancelar
            </Button>
          </DialogClose>

          <Button className="bg-brand-green hover:bg-emerald-600 text-white w-52 h-12">
            Confirmar Empréstimo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}