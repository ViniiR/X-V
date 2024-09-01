import "@styles/header.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import StellaOctangula from "@assets/stella_octangula_tr.png";
import UserIcon from "@assets/user-regular-24.png";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
    const useDarkTheme = useContext(ThemeContext) == "dark";

    return (
        <header
            className={
                "header " + (useDarkTheme ? "dark-header" : "light-header")
            }
        >
            <section className="mini-profile-wrapper">
                <img src={UserIcon} alt="" />
            </section>
            <div className="logo-wrapper">
                <img src={StellaOctangula} className="logo" alt="" />
            </div>
        </header>
    );
}
