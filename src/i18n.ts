import { I18n } from "i18n-js";

// RULES:
// all text should be capitalized as "This"
//
const i18n = new I18n({
    "en": {
        followCount: "Followers",
        followingCount: "Following",
        profile: "Profile",
    },
    "pt-BR": {
        followCount: "Seguidores",
        followingCount: "Seguindo",
        profile: "Perfil",
    },
});

i18n.defaultLocale = "en";
i18n.locale = "en";

export default i18n;
