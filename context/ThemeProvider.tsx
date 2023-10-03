import React, { useContext, createContext, useState, useEffect } from "react";

interface ThemeContextTypes {
  mode: string;
  setMode: (mode: string) => void;
} // types for context

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined); // creating context

// creating provider
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("");

  // function to change theme
  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else {
      setMode("dark");
      document.documentElement.classList.remove("light");
    }
  };
  useEffect(() => {
    handleThemeChange();
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

// creating hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider"); // error handling if we use useTheme outside ThemeProvider
  }
  return context;
}
