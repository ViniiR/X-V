import Home from "@components/Home";
import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import "@styles/app.scss";
import Profile from "./components/Profile";
import { Outlet } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import FSPost from "./components/FSPost";
import { UserAtContext } from "./contexts/UserAtContext";

interface AppProps {
    component: string;
}

export default function App({ component }: AppProps): JSX.Element {
    const storedTheme = localStorage.getItem("theme") ?? "light";
    const [theme, setTheme] = useState(storedTheme);
    const [userAt, setUserAt] = useState("");

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
    async function changeUserAt(userAt: string) {
        setUserAt(userAt);
    }

    switch (component) {
        case "Home":
            return (
                <ThemeContext.Provider value={theme}>
                    <UserAtContext.Provider value={userAt}>
                        <Home
                            setTheme={changeGlobalTheme}
                            setUserAtContext={changeUserAt}
                        />
                    </UserAtContext.Provider>
                </ThemeContext.Provider>
            );
        case "Profile":
            return (
                <ThemeContext.Provider value={theme}>
                    <UserAtContext.Provider value={userAt}>
                        <Profile
                            setTheme={changeGlobalTheme}
                            setUserAtContext={changeUserAt}
                        />
                    </UserAtContext.Provider>
                </ThemeContext.Provider>
            );
        case "EditProfile":
            return (
                <ThemeContext.Provider value={theme}>
                    <EditProfile setTheme={changeGlobalTheme} />
                </ThemeContext.Provider>
            );
        case "Post":
            return (
                <ThemeContext.Provider value={theme}>
                    <UserAtContext.Provider value={userAt}>
                        <FSPost setTheme={changeGlobalTheme} />
                    </UserAtContext.Provider>
                </ThemeContext.Provider>
            );
        default:
            return <div>something went wrong</div>;
    }
}
