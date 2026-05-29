import React from 'react';
import { View, Text } from 'react-native';
import { Emprestimo, StatusEmprestimo } from '../types/emprestimo';

interface EmprestimoCardProps {
    emprestimo: Emprestimo;
}

const statusConfig: Record<StatusEmprestimo, { label: string; textClass: string; bgClass: string; borderClass: string }> = {
    devolvido: { label: 'Devolvido', textClass: 'text-[#62C284]', bgClass: 'bg-[#EBF7F0]', borderClass: 'border-[#62C284]' },
    em_andamento: { label: 'Em andamento', textClass: 'text-[#D69E2E]', bgClass: 'bg-[#FEFCF1]', borderClass: 'border-[#D69E2E]' },
    atrasado: { label: 'Atrasado', textClass: 'text-[#E53E3E]', bgClass: 'bg-[#FEF2F2]', borderClass: 'border-[#E53E3E]' },
};

export default function EmprestimoCard({ emprestimo }: EmprestimoCardProps) {
    const config = statusConfig[emprestimo.status];

    return (
        // 1. Adicionamos flex-row e items-center para alinhar a capa e os textos lado a lado
        <View className="bg-white p-4 rounded-xl mb-3 border border-gray-200 flex-row items-center">

            {/* 2. Espaço reservado para a capa do livro à esquerda */}
            <View className="w-16 h-24 bg-gray-100 rounded-md border border-gray-200 items-center justify-center mr-4">
                {/* Placeholder: Troque por <Image source={{ uri: emprestimo.capa }} /> futuramente */}
                <Text className="text-2xl">📖</Text>
            </View>

            {/* 3. Container das informações com flex-1 para empurrar o layout e evitar que o texto vaze */}
            <View className="flex-1">
                <Text className="text-[17px] font-semibold text-gray-900 mb-2" numberOfLines={2}>
                    {emprestimo.tituloLivro}
                </Text>

                <View className={`self-start px-3 py-0.5 rounded-full border mb-3 ${config.bgClass} ${config.borderClass}`}>
                    <Text className={`text-xs font-medium ${config.textClass}`}>
                        {config.label}
                    </Text>
                </View>

                <View className="space-y-1">
                    <View className="flex-row items-center">
                        <Text className="text-gray-400 mr-2 text-sm">📅</Text>
                        <Text className="text-sm text-gray-500">Locação: {emprestimo.dataLocacao}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-gray-400 mr-2 text-sm">📅</Text>
                        <Text className="text-sm text-gray-500">Devolução: {emprestimo.dataDevolucao}</Text>
                    </View>
                </View>
            </View>

        </View>
    );
}