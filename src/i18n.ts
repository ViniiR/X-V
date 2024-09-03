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
        profileSettings: "Profile settings",
        profileSettingsDesc: "Manage your Profile picture, Username and more.",
        languageSettings: "Language settings",
        languageSettingsDesc: "Change your current language.",
        ok: "Ok",
    },
    "pt-BR": {
        followCount: "Seguidores",
        followingCount: "Seguindo",
        profile: "Perfil",
        config: "Configurações",
        profileSettings: "Configurações do perfil",
        profileSettingsDesc:
            "Altere sua foto de Perfil, Nome de usuário e mais.",
        languageSettings: "Preferências de idioma",
        languageSettingsDesc: "Altere o idioma atual.",
        ok: "Ok",
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
