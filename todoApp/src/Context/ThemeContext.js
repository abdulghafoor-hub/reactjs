import { createContext, useContext } from "react";
 
export const ThemeContext=createContext({
    theme: "light",
    setTheme: () =>{}
});
export const ThemeProvider= ThemeContext.Provider;

export const useTheme=()=>{
    return useContext(ThemeContext);
}