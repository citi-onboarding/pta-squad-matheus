import React, { createContext, useContext } from "react";
import theme from "../styles/theme";

const ThemeContext = createContext(theme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
