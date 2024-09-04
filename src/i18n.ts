import { I18n } from "i18n-js";

// RULES:
// all text should be capitalized as "This"
//
const i18n = new I18n({
    en: {
        followCount: "Followers",
        followingCount: "Following",
        profile: "Profile",
        config: "Settings",
        profileSettings: "Profile",
        profileSettingsDesc: "Manage your Profile picture, Username and more.",
        languageSettings: "Language",
        languageSettingsDesc: "Change your current language.",
        ok: "Ok",
        accountSettings: "Account",
        accountSettingsDesc: "Change your password, E-mail and more.",
    },
    "pt-BR": {
        followCount: "Seguidores",
        followingCount: "Seguindo",
        profile: "Perfil",
        config: "Configurações",
        profileSettings: "Perfil",
        profileSettingsDesc:
            "Altere sua foto de Perfil, Nome de usuário e mais.",
        languageSettings: "Preferências de idioma",
        languageSettingsDesc: "Altere o idioma atual.",
        ok: "Ok",
        accountSettings: "Conta",
        accountSettingsDesc: "Mude sua senha, E-mail e mais.",
    },
    ru: {
        //
    },
});

const selectedLang = localStorage.getItem("language");

if (!selectedLang) {
    i18n.defaultLocale = "en";
    i18n.locale = "en";
} else {
    i18n.locale = selectedLang;
}

export default i18n;
