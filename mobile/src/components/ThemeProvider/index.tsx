import React from "react";
import { View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";

interface ThemeProviderViewProps {
  children: React.ReactNode;
}

export default function ThemeProviderView({
  children,
}: ThemeProviderViewProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      {children}
    </View>
  );
}
