import React from 'react';
import { View, Text } from 'react-native';
import { Emprestimo } from '../types/emprestimo'; // A tipagem nova e enxuta!

interface EmprestimoCardProps {
    emprestimo: Emprestimo;
}

// Como tiramos o status da tipagem global, criamos um tipo local só para o visual do card
type StatusVisual = 'devolvido' | 'em_andamento' | 'atrasado';

const statusConfig: Record<StatusVisual, { label: string; textClass: string; bgClass: string; borderClass: string }> = {
    devolvido: { label: 'Devolvido', textClass: 'text-[#62C284]', bgClass: 'bg-[#EBF7F0]', borderClass: 'border-[#62C284]' },
    em_andamento: { label: 'Em andamento', textClass: 'text-[#D69E2E]', bgClass: 'bg-[#FEFCF1]', borderClass: 'border-[#D69E2E]' },
    atrasado: { label: 'Atrasado', textClass: 'text-[#E53E3E]', bgClass: 'bg-[#FEF2F2]', borderClass: 'border-[#E53E3E]' },
};

// --- MÁGICA DAS DATAS ---
// Função auxiliar para transformar "15/06/2026" em uma Data que o JS possa comparar
const converterDataBrasileira = (dataString: string) => {
    const [dia, mes, ano] = dataString.split('/');
    // O mês no JavaScript começa em 0 (Janeiro = 0), por isso o "- 1"
    return new Date(Number(ano), Number(mes) - 1, Number(dia));
};

// Função que define qual é o status real do empréstimo
const calcularStatus = (emprestimo: Emprestimo): StatusVisual => {
    // 1. Se já foi devolvido, não importa a data, o status é verde!
    if (emprestimo.devolvido) return 'devolvido';

    // 2. Se não foi devolvido, vamos checar as datas
    const dataDaDevolucao = converterDataBrasileira(emprestimo.dataDevolucao);
    const hoje = new Date();

    // Zeramos as horas de "hoje" para comparar apenas os dias exatos
    hoje.setHours(0, 0, 0, 0);

    // 3. Se a data de devolução for menor (anterior) a hoje, está atrasado
    if (dataDaDevolucao < hoje) return 'atrasado';

    // 4. Se for maior ou igual a hoje, ainda está no prazo
    return 'em_andamento';
};

export default function EmprestimoCard({ emprestimo }: EmprestimoCardProps) {
    // Agora o config é gerado dinamicamente pela nossa função
    const statusAtual = calcularStatus(emprestimo);
    const config = statusConfig[statusAtual];

    return (
        <View className="bg-white p-4 rounded-xl mb-3 border border-gray-200 flex-row items-center">

            {/* Espaço da capa do livro à esquerda */}
            <View className="w-16 h-24 bg-gray-100 rounded-md border border-gray-200 items-center justify-center mr-4">
                <Text className="text-2xl">📖</Text>
            </View>

            {/* Informações à direita */}
            <View className="flex-1">
                <Text className="text-[17px] font-semibold text-gray-900 mb-2" numberOfLines={2}>
                    {emprestimo.tituloLivro}
                </Text>

                {/* A cor da badge agora muda sozinha baseada nas datas! */}
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