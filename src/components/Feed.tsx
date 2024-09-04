import "@styles/feed.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface FeedProps {
    children?: JSX.Element | JSX.Element[];
}

export default function Feed(props: FeedProps) {
    const useDarkTheme = useContext(ThemeContext) == "dark";
    return (
        <main className={"feed " + (useDarkTheme ? "feed-dark" : "feed-light")}>
            <ul>{props.children}</ul>
        </main>
    );
}
