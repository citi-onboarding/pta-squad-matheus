import React from 'react';
import { View, Text } from 'react-native';
import { Emprestimo } from '../types/emprestimo';

interface EmprestimoCardProps {
    emprestimo: Emprestimo;
}

type StatusVisual = 'devolvido' | 'em_andamento' | 'atrasado';

const statusConfig: Record<StatusVisual, { label: string; textClass: string; bgClass: string; borderClass: string }> = {
    devolvido: { label: 'Devolvido', textClass: 'text-[#62C284]', bgClass: 'bg-[#EBF7F0]', borderClass: 'border-[#62C284]' },
    em_andamento: { label: 'Em andamento', textClass: 'text-[#D69E2E]', bgClass: 'bg-[#FEFCF1]', borderClass: 'border-[#D69E2E]' },
    atrasado: { label: 'Atrasado', textClass: 'text-[#E53E3E]', bgClass: 'bg-[#FEF2F2]', borderClass: 'border-[#E53E3E]' },
};

const calcularStatus = (
    emprestimo: Emprestimo
): StatusVisual => {

    if (emprestimo.status === 'DEVOLVIDO') {
        return 'devolvido';
    }

    if (emprestimo.atrasado) {
        return 'atrasado';
    }

    return 'em_andamento';
};

export default function EmprestimoCard({ emprestimo }: EmprestimoCardProps) {
    const statusAtual = calcularStatus(emprestimo);
    const config = statusConfig[statusAtual];

    return (
        <View className="bg-white p-4 rounded-xl mb-3 border border-gray-200 flex-row items-center">

            <View className="w-24 h-36 bg-gray-100 rounded-md border border-gray-200 items-center justify-center mr-4">
                <Text className="text-2xl">📖</Text>
            </View>

            <View className="flex-1">
                <Text className="text-[17px] font-semibold text-gray-900 mb-" numberOfLines={2}>
                    {emprestimo.tituloLivro ?? 'Livro'}
                </Text>

                <Text className="text-gray-500 mb-2" numberOfLines={2}>
                    {emprestimo.nomeCliente ?? 'Cliente'}, {emprestimo.emailCliente ?? 'Email'}
                </Text>

                <View className={`self-start px-3 py-0.5 rounded-full border mb-3 ${config.bgClass} ${config.borderClass}`}>
                    <Text className={`text-xs font-medium ${config.textClass}`}>
                        {config.label}
                    </Text>
                </View>

                <View className="space-y-1">
                    <View className="flex-row items-center">
                        <Text className="text-gray-400 mr-2 text-sm">📅</Text>
                        <Text className="text-sm text-gray-500">Locação: {new Date(emprestimo.dataLocacao).toLocaleDateString('pt-BR')}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-gray-400 mr-2 text-sm">📅</Text>
                        <Text className="text-sm text-gray-500">Devolução: {new Date(emprestimo.dataPrevistaDevolucao).toLocaleDateString('pt-BR')}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}