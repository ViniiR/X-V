import "@styles/slide_menu.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface SlideMenuProps {
    children?: string | JSX.Element | JSX.Element[];
}

function menuCloserHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const menu = document.querySelector(".slide-menu") as HTMLElement;
    if (window.location.pathname == "/login" || window.location.pathname == "/sign-up") {
        return;
    }
    const isMenuActive = menu.style.left == "0px" ?? false;

    // hides menu before it appears on the screen
    if (!menu.contains(target) && isMenuActive) {
        hideSlideMenu();
    }
}

export function showSlideMenu() {
    const isSlideMenuOpen =
        (document.querySelector(".slide-menu") as HTMLElement)?.style.left ==
            "0px" ?? false;
    const menuRef: HTMLElement | null = document.querySelector(".slide-menu");

    menuRef!.style.left = "0px";

    setTimeout(() => {
        document.addEventListener("click", menuCloserHandler);
    }, 0);
}

export function hideSlideMenu() {
    const isSlideMenuOpen =
        (document.querySelector(".slide-menu") as HTMLElement)?.style.left ==
            "0px" ?? false;
    if (!isSlideMenuOpen) return;
    const menuRef: HTMLElement | null = document.querySelector(".slide-menu");

    menuRef!.style.left = "-100%";

    document.removeEventListener("click", menuCloserHandler);
}

export default function SlideMenu({ children }: SlideMenuProps) {
    const useDarkTheme = useContext(ThemeContext) == "dark";

    return (
        <menu
            className={
                "slide-menu " +
                (useDarkTheme ? "slide-menu-dark" : "slide-menu-light")
            }
        >
            {children}
        </menu>
    );
}
