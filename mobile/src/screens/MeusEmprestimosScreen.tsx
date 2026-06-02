import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importação para o topo branco
import HeaderMobile from '../components/HeaderMobile';
import EmprestimoCard from '../components/EmprestimoCard';
import { Emprestimo } from '../types/emprestimo';

// Mock atualizado com a nova tipagem (sem status, com devolvido e emailUsuario)
const mockEmprestimos: Emprestimo[] = [
    { id: '1', usuario: 'João Silva', emailUsuario: 'joao.silva@email.com', tituloLivro: 'Dom Casmurro', devolvido: true, dataLocacao: '02/03/2026', dataDevolucao: '12/03/2026' },

    // Para ficar "em andamento", coloquei a devolução para Junho (data futura)
    { id: '2', usuario: 'João Silva', emailUsuario: 'joao.silva@email.com', tituloLivro: 'Clean Code', devolvido: false, dataLocacao: '15/05/2026', dataDevolucao: '15/06/2026' },

    // Para ficar "atrasado", mantive a data no passado (Março) e devolvido: false
    { id: '3', usuario: 'João Silva', emailUsuario: 'joao.silva@email.com', tituloLivro: 'História do Brasil', devolvido: false, dataLocacao: '01/03/2026', dataDevolucao: '10/03/2026' },

    { id: '4', usuario: 'João Silva', emailUsuario: 'joao.silva@email.com', tituloLivro: 'Introdução à Ciência', devolvido: false, dataLocacao: '20/05/2026', dataDevolucao: '05/06/2026' },

    { id: '5', usuario: 'Maria Souza', emailUsuario: 'maria.souza@email.com', tituloLivro: 'O Pequeno Príncipe', devolvido: true, dataLocacao: '10/03/2026', dataDevolucao: '20/03/2026' },
];

export default function MeusEmprestimosScreen() {
    const [busca, setBusca] = useState('');
    const [listaFiltrada, setListaFiltrada] = useState<Emprestimo[]>(mockEmprestimos);

    const handleBuscar = () => {
        Keyboard.dismiss();
        const termo = busca.toLowerCase().trim();

        if (termo === '') {
            setListaFiltrada(mockEmprestimos);
        } else {
            const resultados = mockEmprestimos.filter((emp) =>
                emp.usuario.toLowerCase().includes(termo)
            );
            setListaFiltrada(resultados);
        }
    };

    return (
        <View className="flex-1 bg-[#F9FAFB]">

            {/* Header protegido pela SafeAreaView para unificar a cor com o topo do iPhone */}
            <SafeAreaView edges={['top']} className="bg-white">
                <HeaderMobile />
            </SafeAreaView>

            <View className="flex-1 px-4 pt-4">
                {/* Campo de busca com ícone de lupa */}
                <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 mb-3">
                    <Text className="text-gray-400 text-lg mr-2">🔍</Text>
                    <TextInput
                        className="flex-1 h-12 text-base text-gray-900"
                        placeholder="João Silva"
                        placeholderTextColor="#9CA3AF"
                        value={busca}
                        onChangeText={setBusca}
                    />
                </View>

                {/* Botão Buscar verde de largura total */}
                <TouchableOpacity
                    className="bg-[#78C594] py-3.5 rounded-lg items-center mb-4 w-full"
                    onPress={handleBuscar}
                >
                    <Text className="text-white text-base font-medium">Buscar</Text>
                </TouchableOpacity>

                {/* Contagem de resultados exibida */}
                <Text className="text-sm text-gray-500 mb-3">
                    {listaFiltrada.length} empréstimo(s) encontrado(s)
                </Text>

                {/* Lista de cards com FlatList */}
                <FlatList
                    data={listaFiltrada}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <EmprestimoCard emprestimo={item} />}
                    contentContainerClassName="pb-5"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    ListEmptyComponent={
                        <Text className="text-center text-gray-400 mt-8 italic text-sm">
                            Nenhum usuário ou empréstimo encontrado.
                        </Text>
                    }
                />
            </View>
        </View>
    );
}