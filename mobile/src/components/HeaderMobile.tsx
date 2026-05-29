import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HeaderMobile() {
    const insets = useSafeAreaInsets();

    return (
        <>
            {/* Força os ícones de bateria/hora a ficarem escuros e pinta o fundo de branco no Android */}
            <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={true} />

            <View
                className="flex-row items-center px-5 pb-4 bg-white border-b border-gray-200"
                // Removemos o "+ 16". Adicionamos apenas um respiro mínimo (ou os insets do notch no iOS)
                style={{ paddingTop: insets.top > 0 ? insets.top + 4 : 20 }}
            >
                <Image
                    source={require('../assets/logoCITi.png')}
                    className="w-16 h-8 mr-4"
                    resizeMode="contain"
                />
                <Text className="text-lg font-medium text-gray-800">Meus Empréstimos</Text>
            </View>
        </>
    );
}