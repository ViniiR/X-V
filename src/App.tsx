import Home from "@components/Home";
import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import "@styles/app.scss";

export default function App(): JSX.Element {
  const storedTheme = localStorage.getItem("theme") ?? "light";
  const [theme, setTheme] = useState(storedTheme);

    // change setTheme= to a more complex function that also sets localStorage
  return (
    <ThemeContext.Provider value={theme}>
      <Home setTheme={setTheme}></Home>
    </ThemeContext.Provider>
  );
}
