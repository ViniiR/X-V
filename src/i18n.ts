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
        login: "Login",
        signup: "Sign Up",
        signupAlt: "Sign Up",
        signupLinkDesc: "Don't have an account?",
        loginLinkDesc: "Already have an account?",
        email: "Email",
        password: "Password",
        emailRequired: "Email is a required field!",
        passwordRequired: "Password is a required field!",
        invalidEmail: "Invalid email!",
        passwordShort: "Password must be at least 8 characters!",
        passwordLong: "Password must be at maximum 32 characters!",
        loginSuccess: "User succesfully authenticated",
        userName: "Name",
        userAt: "Username",
        signupSuccess: "User succesfully created",
        userNameMinLength: "Name must be at least 2 characters!",
        userNameMaxLength: "Name must be at maximum 20 characters!",
        userNameRequired: "Name is a required field!",
        userAtMinLength: "Username must be at least 2 characters!",
        userAtMaxLength: "Username must be at maximum 20 characters!",
        userAtRequired: "Username is a required field!",
        loginInvalidCredentials: "Invalid credentials!",
        accountSubMenu: "Settings > Account",
        changeUserAt: "Change your Username",
        changeUserAtDesc: "Change your @Username.",
        changeUserEmail: "Change your Email",
        changeUserEmailDesc: "Change your account's current Email.",
        changeUserPassword: "Change your Password",
        changeUserPasswordDesc: "Change your account's Password.",
        logOut: "Log Out",
        logOutDesc: "Log Out of your Account.",
        deleteAcct: "Delete your Account",
        deleteAcctDesc: "Delete your Account Permanently.",
        logoutConfirm: "Are you sure you want to Log Out?",
        logout: 'Log Out',
        cancel: "Cancel",
        deleteConfirm: "Are you sure you want to Delete your Account?",
        delete: "Delete",

        // server
        userAtInUse: "Username already in use",
        emailInUse: "Email already in use",
        internalErr: "Internal server error :("
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
        login: "Entrar",
        signup: "Cadastre-se",
        signupAlt: "Cadastrar-se",
        signupLinkDesc: "Não possui uma conta?",
        loginLinkDesc: "Já possui uma conta?",
        email: "Email",
        password: "Senha",
        emailRequired: "Email é um campo obrigatório!",
        passwordRequired: "Senha é um campo obrigatório!",
        invalidEmail: "Email invalido!",
        passwordShort: "Senha deve ter no mínimo 8 caracteres!",
        passwordLong: "Senha deve ter no máximo 8 caracteres!",
        loginSuccess: "Usuário autenticado com sucesso",
        userName: "Nome",
        userAt: "Nome de usuário",
        signupSuccess: "Usuário criado com sucesso",
        userNameMinLength: "Nome deve ter no mínimo 2 caracteres!",
        userNameMaxLength: "Nome deve ter no máximo 2 caracteres!",
        userNameRequired: "Nome é um campo obrigatório!",
        userAtMinLength: "Nome de usuário deve ter no mínimo 2 caracteres!",
        userAtMaxLength: "Nome de usuário deve ter no máximo 2 caracteres!",
        userAtRequired: "Nome de usuário é um campo obrigatório!",
        loginInvalidCredentials: "Credenciais inválidas!",
        accountSubMenu: "Configurações > Conta",
        changeUserAt: "Mude seu Nome de usuário",
        changeUserAtDesc: "Altere seu @NomeDeUsuário.",
        changeUserEmail: "Mude seu Email",
        changeUserEmailDesc: "Altere o Email da sua conta.",
        changeUserPassword: "Mude sua Senha",
        changeUserPasswordDesc: "Altere a senha da sua conta.",
        logOut: "Sair",
        logOutDesc: "Sair da sua Conta.",
        deleteAcct: "Deletar sua Conta",
        deleteAcctDesc: "Deletar sua Conta Permanentemente.",
        logoutConfirm: "Tem certeza que deseja Sair da sua Conta?",
        logout: 'Sair',
        cancel: "Cancelar",
        deleteConfirm: "Tem certeza que deseja Deletar sua Conta?",
        delete: "Deletar",

        // server
        userAtInUse: "Nome de usuário já está sendo usado",
        emailInUse: "Email já está sendo usado",
        internalErr: "Erro interno do servidor :("
    },
    ru: {
        //TODO
        //oh boy am i cooked
    },
});

const selectedLang = localStorage.getItem("language");
const userBrowserLang = navigator.language;

//please make this better it looks like shit
if (selectedLang == null || selectedLang == "") {
    if (userBrowserLang.match(/^pt($|-.)/)) {
        i18n.locale = "pt-BR";
        //} else if (userBrowserLang.match(/^en($|-)./)) {
        //    i18n.locale = "en";
    } else if (userBrowserLang.match(/^ru($|-.)/)) {
        i18n.locale = "ru";
    } else {
        i18n.locale = "en";
    }
} else if (selectedLang.match(/(en|pt|ru)(-([A-Z]|[a-z]){2}|$)/)) {
    if (selectedLang.match(/^pt($|-.)/)) {
        i18n.locale = "pt-BR";
    } else if (selectedLang.match(/^ru($|-.)/)) {
        i18n.locale = "ru";
    } else {
        i18n.locale = "en";
    }
} else {
    i18n.locale = "en";
}

export default i18n;
