import "@styles/confirm_fs.scss";
import { MouseEventHandler, RefObject, useRef } from "react";

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
    return (
        <main
            className="confirm-wrapper"
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
