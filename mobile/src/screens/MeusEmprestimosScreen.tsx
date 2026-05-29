import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

import HeaderMobile from '../components/HeaderMobile';
import EmprestimoCard from '../components/EmprestimoCard';
import { Emprestimo } from '../types/emprestimo';

const mockEmprestimos: Emprestimo[] = [
    {
        id: '1',
        tituloLivro: 'Dom Casmurro',
        status: 'devolvido',
        dataLocacao: '02/03/2026',
        dataDevolucao: '12/03/2026',
    },
    {
        id: '2',
        tituloLivro: 'Clean Code',
        status: 'em_andamento',
        dataLocacao: '15/04/2026',
        dataDevolucao: '30/04/2026',
    },
    {
        id: '3',
        tituloLivro: 'História do Brasil',
        status: 'atrasado',
        dataLocacao: '01/03/2026',
        dataDevolucao: '10/03/2026',
    },
    {
        id: '4',
        tituloLivro: 'Introdução à Ciência',
        status: 'em_andamento',
        dataLocacao: '20/04/2026',
        dataDevolucao: '05/05/2026',
    },
    {
        id: '5',
        tituloLivro: 'O Pequeno Príncipe',
        status: 'devolvido',
        dataLocacao: '10/03/2026',
        dataDevolucao: '20/03/2026',
    },
];

export default function MeusEmprestimosScreen() {
    const [busca, setBusca] = useState('');
    // Estado para armazenar os itens filtrados, inicia com todos os mocks
    const [listaFiltrada, setListaFiltrada] = useState<Emprestimo[]>(mockEmprestimos);

    const handleBuscar = () => {
        const termo = busca.toLowerCase().trim();
        const resultados = mockEmprestimos.filter((emp) =>
            emp.tituloLivro.toLowerCase().includes(termo)
        );
        setListaFiltrada(resultados);
    };

    return (
        <View style={styles.container}>
            <HeaderMobile />

            <View style={styles.content}>
                {/* Campo de busca */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar por título do livro..."
                        placeholderTextColor="#9CA3AF"
                        value={busca}
                        onChangeText={setBusca}
                    />
                </View>

                {/* Botão Buscar */}
                <TouchableOpacity style={styles.searchButton} onPress={handleBuscar}>
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>

                {/* Contagem de resultados */}
                <Text style={styles.resultsCount}>
                    {listaFiltrada.length} empréstimo(s) encontrado(s)
                </Text>

                {/* Lista de empréstimos */}
                <FlatList
                    data={listaFiltrada}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <EmprestimoCard emprestimo={item} />}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhum empréstimo encontrado.</Text>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: '#111827',
    },
    searchButton: {
        backgroundColor: '#22C55E', // Botão "verde"
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultsCount: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    listContainer: {
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6B7280',
        marginTop: 20,
        fontStyle: 'italic',
    },
});