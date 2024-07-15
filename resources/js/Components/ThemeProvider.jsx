import { useEffect, useState } from "react";
import { ThemeContext } from "@/contexts";
import ThemeManager from "@/theme";

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(localStorage.getItem('theme') || ThemeManager.SYSTEM);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');

    if (localStorageTheme === ThemeManager.LIGHT) {
      ThemeManager.setToLight(setTheme)(false);
    } else if (localStorageTheme === ThemeManager.DARK) {
      ThemeManager.setToDark(setTheme)(false);
    } else {
      ThemeManager.setToSystem(setTheme)(false);
    }
  }, []);

  const changeThemeTo = (newTheme) => {
    if (newTheme === ThemeManager.LIGHT) {
      return ThemeManager.setToLight(setTheme);
    } else if (newTheme === ThemeManager.DARK) {
      return ThemeManager.setToDark(setTheme);
    } else {
      return ThemeManager.setToSystem(setTheme);
    }
  };

  return <ThemeContext.Provider value={{ theme, changeThemeTo }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
