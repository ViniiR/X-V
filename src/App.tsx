import Home from "@components/Home";
import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import "@styles/app.scss";

export default function App(): JSX.Element {
    const storedTheme = localStorage.getItem("theme") ?? "light";
    const [theme, setTheme] = useState(storedTheme);

    async function changeGlobalTheme() {
        switch (theme) {
            case "dark":
                setTheme("light");
                localStorage.setItem("theme", "light");
                break;
            case "light":
                setTheme("dark");
                localStorage.setItem("theme", "dark");
                break;
        }
    }

    return (
        <ThemeContext.Provider value={theme}>
            <Home setTheme={changeGlobalTheme}></Home>
        </ThemeContext.Provider>
    );
}
