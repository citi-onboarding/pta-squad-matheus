import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function HeaderMobile() {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>citi</Text>
            <Text style={styles.titulo}>Meus Empréstimos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        // Adaptação para descer o header da barra de status (notch)
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#111827',
        marginRight: 12,
    },
    titulo: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
    },
});