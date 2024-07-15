import { useEffect, useState } from "react";
import { ThemeContext } from "@/contexts";
import Theme from "@/theme";

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(localStorage.getItem('theme') || Theme.SYSTEM);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');

    if (localStorageTheme === Theme.LIGHT) {
      Theme.setToLight(setTheme)(false);
    } else if (localStorageTheme === Theme.DARK) {
      Theme.setToDark(setTheme)(false);
    } else {
      Theme.setToSystem(setTheme)(false);
    }
  }, []);

  const changeThemeTo = (newTheme) => {
    if (newTheme === Theme.LIGHT) {
      return Theme.setToLight(setTheme);
    } else if (newTheme === Theme.DARK) {
      return Theme.setToDark(setTheme);
    } else {
      return Theme.setToSystem(setTheme);
    }
  };

  return <ThemeContext.Provider value={{ theme, changeThemeTo }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
