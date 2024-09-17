import Form from "./Form";
import "@styles/login.scss";
import Input from "./Input";
import i18n from "../i18n";
import Submit from "./Submit";
import { Link, useNavigate } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import { APP_ROUTES } from "../main";
import { signUpSchema, SignUpSchema } from "../schemas/signup_shema";
import { useState } from "react";

export async function translateServerErrorMessages(
    msg: string,
): Promise<string> {
    switch (msg.toLowerCase()) {
        case "username already in use":
            return i18n.t("userAtInUse");
        case "email already in use":
            return i18n.t("emailInUse");
        case "internal server error":
            return i18n.t("internalErr");
        default:
            return msg;
    }
}

export default function SignUp() {
    const [isStatusGood, setIsStatusGood] = useState(true); // this is just for the color changes
    const navigateTo = useNavigate();
    const formik: FormikProps<SignUpSchema> = useFormik({
        initialValues: {
            userName: "",
            userAt: "",
            email: "",
            password: "",
        },
        validationSchema: signUpSchema,
        validateOnChange: false,
        async onSubmit(formData: SignUpSchema, { setStatus }) {
            try {
                const url = `${process.env.API_URL_ROOT}${process.env.CREATE_USER_PATH}`;
                const res = await fetch(url, {
                    mode: "cors",
                    credentials: "include",
                    method: "POST",
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
                    setStatus(i18n.t("signupSuccess"));
                }
                navigateTo("/");
            } catch (err) {
                setIsStatusGood(false);
                setStatus("error communicating with the server");
            }
        },
    });

    return (
        <main className="login-page">
            <Form formik={formik}>
                <section className="form-up-sect">
                    <span className="title">{i18n.t("signup")}</span>
                    <Input
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setErrors({
                                userName: "",
                                userAt: "",
                                email: "",
                                password: "",
                            });
                        }}
                        formikError={formik.errors.userName}
                        type="text"
                        id="userName"
                        label={i18n.t("userName")}
                    />
                    <Input
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setErrors({
                                email: "",
                                password: "",
                            });
                        }}
                        formikError={formik.errors.userAt}
                        type="text"
                        id="userAt"
                        label={i18n.t("userAt")}
                    />
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
                    />
                    <output
                        className={`server-message ${isStatusGood ? "formik-success" : "formik-failure"}`}
                    >
                        {formik.status}
                    </output>
                </section>
                <section className="form-lower-sect">
                    <Submit name={i18n.t("signup")} />
                    <p className="alt-auth-link">
                        <span>{i18n.t("loginLinkDesc")}</span>
                        <Link to={APP_ROUTES.AUTH_LOGIN}>
                            {i18n.t("login")}
                        </Link>
                    </p>
                </section>
            </Form>
        </main>
    );
}
