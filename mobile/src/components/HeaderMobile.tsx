import React from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HeaderMobile() {
    const insets = useSafeAreaInsets();

    // Removemos o excesso e diminuímos o respiro no iOS para colar mais no topo,
    // mas sem o risco de a logo ficar por baixo do relógio ou da câmera.
    const topPadding = Platform.OS === 'ios' ? insets.top - 30 : insets.top + 10;

    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={true} />

            <View
                className="flex-row items-center px-5 pb-3 bg-white border-b border-gray-200"
                style={{ paddingTop: Math.max(topPadding, 10) }}
            >
                <Image
                    source={require('../assets/logoCITi.png')}
                    className="w-16 h-9 mr-4"
                    resizeMode="contain"
                />
                <Text className="text-xl font-medium text-gray-800">Meus Empréstimos</Text>
            </View>
        </>
    );
}