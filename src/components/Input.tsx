import "@styles/input.scss";
import { ChangeEventHandler } from "react";

interface InputProps {
    label: string;
    type: string;
    id: string;
    formikError?: string;
    onChange: ChangeEventHandler;
}

export default function Input({
    id,
    label,
    type,
    formikError,
    onChange,
}: InputProps) {
    return (
        <section className="input-wrapper">
            <input
                onChange={onChange}
                placeholder={label}
                formNoValidate
                type={type == "email" ? "text" : type}
                id={id}
            />
            <output className="invalid-warnings">{formikError}</output>
        </section>
    );
}
