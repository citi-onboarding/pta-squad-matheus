import { ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importação para o topo branco
import HeaderMobile from '../components/HeaderMobile';
import EmprestimoCard from '../components/EmprestimoCard';
import { Emprestimo } from '../types/emprestimo';

const mockEmprestimos: Emprestimo[] = [];

export default function MeusEmprestimosScreen() {
    const [busca, setBusca] = useState('');
    const [listaFiltrada, setListaFiltrada] =
        useState<Emprestimo[]>([]);

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    const handleBuscar = async () => {
        Keyboard.dismiss();

        try {
            setLoading(true);
            setErro('');

            const emprestimos = await api.buscarEmprestimos();

            const emprestimosComTitulo = await Promise.all(
                emprestimos.map(async (emp: Emprestimo) => {

                    const livro = await api.buscarLivroPorId(emp.livroId);

                    return {
                        ...emp,
                        tituloLivro: livro.titulo,
                    };
                })
            );

            const termo = busca.toLowerCase().trim();

            const resultados = emprestimosComTitulo.filter(
                (emp: Emprestimo) =>
                    emp.nomeCliente.toLowerCase().includes(termo)
            );

            setListaFiltrada(resultados);

        } catch (error) {
            console.error(error);
            setErro('Erro ao buscar empréstimos');
        } finally {
            setLoading(false);
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

                {loading && (
                    <ActivityIndicator
                        size="large"
                        color="#78C594"
                        style={{ marginBottom: 20 }}
                    />
                )}

                {erro ? (
                    <Text className="text-red-500 mb-3">
                        {erro}
                    </Text>
                ) : null}

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