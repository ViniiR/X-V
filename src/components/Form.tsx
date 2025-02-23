import "@styles/form.scss";
import { FormikProps } from "formik";
import { LoginSchema } from "../schemas/login_schema";
import { SignUpSchema } from "../schemas/signup_shema";
import { useEffect } from "react";

interface FormProps {
    children: JSX.Element[];
    formik: FormikProps<LoginSchema> | FormikProps<SignUpSchema>;
}

export default function Form({ children, formik }: FormProps) {
    //useEffect(() => {
    //    (async function () {
    //        try {
    //            await fetch(`${process.env.ORIGINAL_API_URL_ROOT}`);
    //            // set global message that server will spin up
    //        } catch (err) {
    //            console.error(err);
    //        }
    //    })();
    //}, []);
    return (
        <form
            onReset={formik.handleReset}
            onSubmit={formik.handleSubmit}
            className="form"
        >
            {children}
        </form>
    );
}
