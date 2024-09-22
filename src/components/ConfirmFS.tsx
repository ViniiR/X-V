import "@styles/confirm_fs.scss";
import { MouseEventHandler, RefObject, useContext, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface ConfirmProps {
    ok: string;
    cancel: string;
    description: string;
    onConfirm: MouseEventHandler;
    reference: RefObject<HTMLDivElement>;
}

export default function Confirm({
    ok,
    cancel,
    description,
    onConfirm,
    reference,
}: ConfirmProps) {
    const useDarkTheme = useContext(ThemeContext) === "dark";
    return (
        <main
            className={`confirm-wrapper ${useDarkTheme ? "dark-confirm" : "light-confirm"}`}
            ref={reference}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <main className="confirm">
                <strong className="confirm-description">{description}</strong>
                <button
                    className="cancel-btn"
                    onClick={() => {
                        if (reference == null) return;
                        reference.current!.style.display = "none";
                    }}
                >
                    {cancel}
                </button>
                <button className="ok-btn" onClick={onConfirm}>
                    {ok}
                </button>
            </main>
        </main>
    );
}
