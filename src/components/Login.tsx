import Form from "./Form";
import "@styles/login.scss";
import Input from "./Input";
import i18n from "../i18n";
import Submit from "./Submit";
import { Link, useNavigate } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import { loginSchema, LoginSchema } from "@src/schemas/login_schema";
import { APP_ROUTES } from "../main";
import { useState } from "react";
import { translateServerErrorMessages } from "./SignUp";
import emailLight from "@assets/envelope-regular-96.png";
import lockClosed from "@assets/lock-solid-96.png";
//import lockOpen from '@assets/lock-open-solid-24.png'

export default function Login() {
    const [isStatusGood, setIsStatusGood] = useState(true);
    const navigateTo = useNavigate();
    const formik: FormikProps<LoginSchema> = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        validateOnChange: false,
        async onSubmit(formData: LoginSchema, { setStatus }) {
            try {
                const url = `${process.env.API_URL_ROOT}${process.env.LOGIN_USER_PATH}`;
                const res = await fetch(url, {
                    mode: "cors",
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (res.status < 200 || res.status > 299) {
                    setIsStatusGood(false);
                    setStatus(
                        await translateServerErrorMessages(await res.text()),
                    );
                } else {
                    setIsStatusGood(true);
                    setStatus(i18n.t("loginSuccess"));
                    navigateTo("/");
                }
            } catch (err) {
                setIsStatusGood(false);
                setStatus(translateServerErrorMessages(err as string));
            }
        },
    });

    return (
        <main className="login-page">
            <Form formik={formik}>
                <section className="form-up-sect">
                    <span className="title">{i18n.t("login")}</span>
                    <Input
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setErrors({
                                email: "",
                                password: "",
                            });
                        }}
                        formikError={formik.errors.email}
                        type="text"
                        id="email"
                        label={i18n.t("email")}
                        icon={emailLight}
                    />
                    <Input
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setErrors({
                                email: "",
                                password: "",
                            });
                        }}
                        formikError={formik.errors.password}
                        type="password"
                        id="password"
                        label={i18n.t("password")}
                        icon={lockClosed}
                    />
                    <output
                        className={`server-message ${isStatusGood ? "formik-success" : "formik-failure"}`}
                    >
                        {formik.status}
                    </output>
                </section>
                <section className="form-lower-sect">
                    <Submit name={i18n.t("login")} />
                    <p className="alt-auth-link">
                        <span>{i18n.t("signupLinkDesc")}</span>
                        <Link to={APP_ROUTES.AUTH_SIGNUP}>
                            {i18n.t("signup")}
                        </Link>
                    </p>
                </section>
            </Form>
        </main>
    );
}
