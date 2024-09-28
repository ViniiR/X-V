import "@styles/header.scss";
import { MouseEventHandler, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import StellaOctangula from "@assets/stella_octangula_tr.png";
import UserIcon from "./UserIcon";
import userImg from "@assets/user-regular-24.png";

interface HeaderProps {
    showSlideMenu: MouseEventHandler
}

export default function Header({showSlideMenu}: HeaderProps) {
    const useDarkTheme = useContext(ThemeContext) == "dark";

    return (
        <header
            className={
                "header " + (useDarkTheme ? "dark-header" : "light-header")
            }
        >
            <section className="mini-profile-wrapper" onClick={showSlideMenu}>
                <UserIcon userIconImg={userImg}></UserIcon>
            </section>
            <div className="logo-wrapper">
                <img src={StellaOctangula} className="logo" alt="" />
            </div>
        </header>
    );
}
