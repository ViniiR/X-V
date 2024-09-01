import "@styles/feed.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface FeedProps {}

export default function Feed(props: FeedProps) {
    const useDarkTheme = useContext(ThemeContext) == "dark";
    return (
        <main className={"feed " + (useDarkTheme ? "feed-dark" : "feed-light")}>
            Hello, World!
        </main>
    );
}
