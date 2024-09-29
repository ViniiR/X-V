import Home from "@components/Home";
import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import "@styles/app.scss";
import Profile from "./components/Profile";
import { Outlet } from "react-router-dom";
import EditProfile from "./components/EditProfile";

interface AppProps {
    component: string;
}

export default function App({ component }: AppProps): JSX.Element {
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

    switch (component) {
        case "Home":
            return (
                <ThemeContext.Provider value={theme}>
                    <Home setTheme={changeGlobalTheme} />
                </ThemeContext.Provider>
            );
        case "Profile":
            return (
                <ThemeContext.Provider value={theme}>
                    <Profile setTheme={changeGlobalTheme} />
                </ThemeContext.Provider>
            );
        case "EditProfile":
            return (
                <ThemeContext.Provider value={theme}>
                    <EditProfile setTheme={changeGlobalTheme} />
                </ThemeContext.Provider>
            );
        default:
            return <>something went wrong</>;
    }
}
