import "@styles/loading.scss";

interface LoadingProps {
    useDarkTheme?: boolean;
}

export default function Loading({ useDarkTheme }: LoadingProps) {
    return (
        <div
            className={`loading ${useDarkTheme ? "loading-dark" : "loading-light"}`}
        ></div>
    );
}
