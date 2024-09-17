import { object, string } from "yup";
import i18n from "../i18n";

export type SignUpSchema = {
    userName: string;
    userAt: string;
    email: string;
    password: string;
};

export const signUpSchema = object().shape({
    userName: string()
        .min(2, i18n.t("userNameMinLength"))
        .max(20, i18n.t("userNameMaxLength"))
        .required(i18n.t("userNameRequired"))
        .trim(),

    userAt: string()
        .min(2, i18n.t("userAtMinLength"))
        .max(20, i18n.t("userAtMaxLength"))
        .required(i18n.t("userAtRequired"))
        .trim(),
    email: string()
        .email(i18n.t("invalidEmail"))
        .required(i18n.t("emailRequired"))
        .trim(),
    password: string()
        .min(8, i18n.t("passwordShort"))
        .max(32, i18n.t("passwordLong"))
        .required(i18n.t("passwordRequired"))
        .trim(),
});
