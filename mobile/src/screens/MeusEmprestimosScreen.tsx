import { ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';

import HeaderMobile from '../components/HeaderMobile';
import EmprestimoCard from '../components/EmprestimoCard';
import { Emprestimo } from '../types/emprestimo';

export default function MeusEmprestimosScreen() {
    const [busca, setBusca] = useState('');
    const [listaFiltrada, setListaFiltrada] = useState<Emprestimo[]>([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    const [pagina, setPagina] = useState(1);
    const [totalEncontrados, setTotalEncontrados] = useState(0);
    const [carregandoMais, setCarregandoMais] = useState(false);

    const handleBuscar = async () => {
        Keyboard.dismiss();

        try {
            setLoading(true);
            setErro('');
            setPagina(1);

            const { total, data } = await api.buscarEmprestimos(busca.trim(), 1);

            const resultados = data.map((emp: any) => ({
                ...emp,
                tituloLivro: emp.livro?.titulo || 'Livro não encontrado',
            }));

            setListaFiltrada(resultados);
            setTotalEncontrados(total);

        } catch (error) {
            console.error(error);
            setErro('Erro ao buscar empréstimos');
        } finally {
            setLoading(false);
        }
    };

    const handleCarregarMais = async () => {
        if (loading || carregandoMais || listaFiltrada.length >= totalEncontrados) return;

        try {
            setCarregandoMais(true);
            const proximaPagina = pagina + 1;

            const { data } = await api.buscarEmprestimos(busca.trim(), proximaPagina);

            const novosResultados = data.map((emp: any) => ({
                ...emp,
                tituloLivro: emp.livro?.titulo || 'Livro não encontrado',
            }));

            setListaFiltrada((prev) => {
                const idsNaTela = new Set(prev.map(item => item.id));

                const apenasNovosValidos = novosResultados.filter((item: any) => !idsNaTela.has(item.id));

                return [...prev, ...apenasNovosValidos];
            });

            setPagina(proximaPagina);

        } catch (error) {
            console.error("Erro ao carregar mais registros:", error);
        } finally {
            setCarregandoMais(false);
        }
    };
    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <HeaderMobile />

            <View className="flex-1 px-4 pt-4">
                <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3 mb-3">
                    <Text className="text-gray-400 text-lg mr-2">🔍</Text>
                    <TextInput
                        className="flex-1 h-12 text-lg text-gray-900 mb-2"
                        placeholder="João Silva"
                        placeholderTextColor="#9CA3AF"
                        value={busca}
                        onChangeText={setBusca}
                    />
                </View>

                <TouchableOpacity
                    className="bg-[#78C594] py-3.5 rounded-lg items-center mb-4 w-full"
                    onPress={handleBuscar}
                >
                    <Text className="text-white text-base font-medium">Buscar</Text>
                </TouchableOpacity>

                <Text className="text-sm text-gray-500 mb-3">
                    {totalEncontrados} empréstimo(s) encontrado(s)
                </Text>

                {loading && (
                    <ActivityIndicator size="large" color="#78C594" style={{ marginBottom: 20 }} />
                )}

                {erro ? <Text className="text-red-500 mb-3">{erro}</Text> : null}

                <FlatList
                    data={listaFiltrada}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <EmprestimoCard emprestimo={item} />}
                    contentContainerClassName="pb-5"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"

                    onEndReached={handleCarregarMais}
                    onEndReachedThreshold={0.2}

                    ListFooterComponent={
                        carregandoMais ? (
                            <ActivityIndicator size="small" color="#78C594" style={{ marginVertical: 15 }} />
                        ) : null
                    }

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