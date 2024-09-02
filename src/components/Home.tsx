import Header from "@components/Header";
import Footer from "@components/Footer";
import Feed from "./Feed";
import SlideMenu from "./SlideMenu";
import userIcon from "@assets/user-regular-24.png";
import "@styles/home.scss";
import UserIcon from "./UserIcon";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n";
import IconButton from "./IconButton";
import profileIcon from "@assets/usericon-light.svg";
import MenuBtnList from "./MenuButtonList";
import Switch from "./SwitchInput";
import darkProfileIcon from "@assets/usericon.svg"

interface HomeProps {
    setTheme: CallableFunction;
}

enum LanguageNumber {
    PT_BR,
    EN_US,
}

//TODO:
function formatNumber(type: LanguageNumber, number: number): string {
    switch (type) {
        case LanguageNumber.PT_BR:
            break;
        case LanguageNumber.EN_US:
            break;
    }
    return "";
}

function dummyFunc() {}

export default function Home({ setTheme }: HomeProps) {
    const useDarkTheme = useContext(ThemeContext) == "dark";
    const [profileBtnIcon, setProfileBtnIcon] = useState<any>();

    useEffect(() => {
        if (useDarkTheme) {
            setProfileBtnIcon(darkProfileIcon);
        } else {
            setProfileBtnIcon(profileIcon);
        }
    }, [useDarkTheme, profileBtnIcon]);

    const userName = "Vinii";
    const userAt = "@owner";

    const followCount: string = "0";
    const followersCount: string = "10.000";
    //format numbers 10K 1M 1.000

    return (
        <main className="home">
            <SlideMenu>
                <section className="menu-profile-section">
                    <UserIcon className="" userIconImg={userIcon}></UserIcon>
                    <strong className="user-name">{userName}</strong>
                    <strong className="user-at">{userAt}</strong>
                    <div className="follow-info">
                        <span>
                            <strong
                                className={
                                    useDarkTheme
                                        ? "follow-number-dark"
                                        : "follow-number-light"
                                }
                            >
                                {followCount}
                            </strong>
                            {i18n.t("followingCount")}
                        </span>
                        <span>
                            <strong
                                className={
                                    useDarkTheme
                                        ? "follow-number-dark"
                                        : "follow-number-light"
                                }
                            >
                                {followersCount}
                            </strong>
                            {i18n.t("followCount")}
                        </span>
                    </div>
                </section>
                <section className="menu-content-section">
                    <MenuBtnList>
                        <IconButton
                            icon={profileBtnIcon}
                            executeFunction={dummyFunc}
                            altText="An icon representing a person's profile"
                        >
                            {i18n.t("profile")}
                        </IconButton>
                    </MenuBtnList>
                </section>
                <section className="menu-bottom">
                    <Switch execFunction={setTheme as any}></Switch>
                </section>
            </SlideMenu>
            <Header></Header>
            <Feed></Feed>
            <Footer></Footer>
        </main>
    );
}
