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
import emailLight from "@assets/envelope-regular-96.png";
import lockClosed from "@assets/lock-solid-96.png";
import userIcon from "@assets/user-solid-96.png";
import userAt from "@assets/at-regular-96.png";

export async function translateServerErrorMessages(
    msg: string,
): Promise<string> {
    switch (msg.toLowerCase()) {
        // username / userat
        case "username already in use":
            return i18n.t("usernameInUse");
        case "username invalid character":
            return i18n.t("usernameInvalidCharacter");
        case "username too short":
            return i18n.t("usernameShort");
        case "username too long":
            return i18n.t("usernameLong");
        //
        case "user_at invalid character":
            return i18n.t("userAtInvalidCharacter");
        case "user_at too short":
            return i18n.t("userAtShort");
        case "user_at too long":
            return i18n.t("userAtLong");

        // email
        case "email already in use":
            return i18n.t("emailInUse");
        case "invalid email":
            return i18n.t("emailInvalid");
        //case "unavailable email":
        //    return i18n.t("emailUnavailable");

        // password
        case "password invalid character":
            return i18n.t("passwordInvalidCharacter");
        case "password too short":
            return i18n.t("passwordShort");
        case "password too long":
            return i18n.t("passwordLong");

        // extra
        case "internal server error":
            return i18n.t("internalErr");
        case "invalid credentials":
            return i18n.t("loginInvalidCredentials");
        case "user does not exist":
            return i18n.t("userNoExist");

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
                    navigateTo("/");
                }
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
                        icon={userIcon}
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
                        icon={userAt}
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
