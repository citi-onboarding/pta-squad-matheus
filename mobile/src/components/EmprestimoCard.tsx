import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Emprestimo, StatusEmprestimo } from '../types/emprestimo';

interface EmprestimoCardProps {
    emprestimo: Emprestimo;
}

// Configuração das cores para cada status
const statusConfig: Record<StatusEmprestimo, { label: string; color: string; bg: string }> = {
    devolvido: { label: 'Devolvido', color: '#166534', bg: '#DCFCE7' },       // Verde
    em_andamento: { label: 'Em andamento', color: '#1E40AF', bg: '#DBEAFE' }, // Azul
    atrasado: { label: 'Atrasado', color: '#991B1B', bg: '#FEE2E2' },         // Vermelho
};

export default function EmprestimoCard({ emprestimo }: EmprestimoCardProps) {
    const config = statusConfig[emprestimo.status];

    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.titulo} numberOfLines={2}>
                    {emprestimo.tituloLivro}
                </Text>
                <View style={[styles.badge, { backgroundColor: config.bg }]}>
                    <Text style={[styles.badgeText, { color: config.color }]}>
                        {config.label}
                    </Text>
                </View>
            </View>
            <Text style={styles.dateText}>📅 Locação: {emprestimo.dataLocacao}</Text>
            <Text style={styles.dateText}>📅 Devolução: {emprestimo.dataDevolucao}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        flex: 1,
        marginRight: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    dateText: {
        fontSize: 14,
        color: '#4B5563',
        marginTop: 4,
    },
});