import React from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HeaderMobile() {
    const insets = useSafeAreaInsets();

    const topPadding = Platform.OS === 'ios' ? insets.top - 40 : insets.top - 0;

    return (
        <>
            <StatusBar style="dark" backgroundColor="#ffffff" translucent={true} />

            <View
                className="flex-row items-center px-5 pb-3 bg-white border-b border-gray-200"
                style={{ paddingTop: Math.max(topPadding, 0) }}
            >
                <Image
                    source={require('../assets/logoCITi.png')}
                    className="h-14 w-16 mr-4"
                    resizeMode="contain"
                />
                <Text className="text-[24px] font-medium text-gray-800 mt-1">Meus Empréstimos</Text>
            </View>
        </>
    );
}