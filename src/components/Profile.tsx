import "@styles/profile.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import userIcon from "@assets/user-circle-solid-108.png";
import UserIcon from "./UserIcon";
import { useNavigate, useParams } from "react-router-dom";
import Feed from "./Feed";
import Post from "./Post";
import NotFound from "./NotFound";
import Loading from "./Loading";
import i18n from "../i18n";
import FollowPage from "@components/FullscreenMenu";
import FollowerUser, { EmptyFollowUser } from "@components/FollowerUser";
import FSWarning from "./FSWarning";

interface ProfileProps {
    // not actually used
    setTheme?: CallableFunction;
    setUserAtContext: CallableFunction;
}

export default function Profile(props: ProfileProps) {
    const useDarkTheme = useContext(ThemeContext) === "dark";
    const navigateTo = useNavigate();
    const [currentUserData, setCurrentUserData] = useState({
        icon: "",
        userAt: "",
        userName: "",
        bio: "",
        followingCount: 0,
        followersCount: 0,
        isFollowing: false,
    });
    const [updateDataTrigger, setUpdateDataTrigger] = useState(false);
    const params = useParams<{ user: string }>();
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [isFollowingPage, setIsFollowingPage] = useState(false);
    const followPageRef = useRef<HTMLDivElement>(null);
    const [_isFollowPageClosed, setIsFollowPageClosed] = useState(true);
    const [followPageTitle, setFollowPageTitle] = useState("");
    const [followListVector, setFollowListVector] = useState([
        {
            userAt: "",
            userName: "",
            icon: "",
        },
    ]);
    const [isLoadingFollows, setIsLoadingFollows] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        props.setUserAtContext(
            isOwnProfile ? currentUserData.userAt : "INVALID_USERÑAME",
        );
    }, [currentUserData, isOwnProfile]);

    async function followUnfollow() {
        try {
            const url = `${process.env.API_URL_ROOT}${process.env.FOLLOW_USER_PATH}`;
            const res = await fetch(url, {
                mode: "cors",
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_at: currentUserData.userAt,
                    follow: !currentUserData.isFollowing,
                }),
            });
            const status = res.status;
            if (status > 199 && status < 300) {
                setUpdateDataTrigger(!updateDataTrigger);
            } else if (status > 399 && status < 500) {
                setShowWarning(true);
            }
        } catch (err) {
            console.error("could not communicate with the server");
        }
    }

    async function fetchFollowsData(following: boolean) {
        setIsLoadingFollows(true);
        if (following) {
            try {
                const url = `${process.env.API_URL_ROOT}${process.env.FOLLOWING_DATA_PATH}/${params.user}`;
                const res = await fetch(url, {
                    mode: "cors",
                    method: "GET",
                    //credentials: "include",
                });
                const body = await res.json();
                const status = res.status;
                if (status > 199 && status < 300) {
                    const users: Array<{
                        userAt: string;
                        userName: string;
                        icon: string;
                    }> = body.Ok;
                    setFollowListVector(users);
                    setIsLoadingFollows(false);
                } else {
                    // set failed to fetch component idk
                }
            } catch (err) {
                console.error("failed to communicate with the server");
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                const url = `${process.env.API_URL_ROOT}${process.env.FOLLOWERS_DATA_PATH}/${params.user}`;
                const res = await fetch(url, {
                    mode: "cors",
                    method: "GET",
                    //credentials: "include",
                });
                const body = await res.json();
                const status = res.status;
                if (status > 199 && status < 300) {
                    const users: Array<{
                        userAt: string;
                        userName: string;
                        icon: string;
                    }> = body.Ok;
                    setFollowListVector(users);
                    setIsLoadingFollows(false);
                } else {
                    // set failed to fetch component idk
                }
            } catch (err) {
                console.error("failed to communicate with the server");
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        if (isFollowingPage) {
            setFollowPageTitle(i18n.t("followingCount"));
        } else {
            setFollowPageTitle(i18n.t("followCount"));
        }
    }, [isLoadingFollows]);

    async function openFollowMenu(following: boolean) {
        if (followPageRef == null) return;
        fetchFollowsData(following);
        followPageRef.current!.style.right = "0px";

        if (ref?.current != null) {
            ref!.current.classList.add("disable-profile-fs-scroll");
        }
    }

    useEffect(() => {
        async function fetchUserData() {
            const url = `${process.env.API_URL_ROOT}${process.env.GET_PROFILE_DATA_PATH}`;
            try {
                setIsOwnProfile(false);
                setIsLoading(true);
                const res = await fetch(url + `/${params.user}`, {
                    mode: "cors",
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
                const status = res.status;
                const body: {
                    userName: string;
                    userAt: string;
                    icon: string;
                    followingCount: number;
                    followersCount: number;
                    isFollowing: boolean;
                    isHimself: boolean;
                    bio: string;
                } = (await res.json()).Ok;
                if (status > 199 && status < 300) {
                    setCurrentUserData({
                        icon: body.icon,
                        userAt: body.userAt,
                        userName: body.userName,
                        followersCount: body.followersCount,
                        followingCount: body.followingCount,
                        isFollowing: body.isFollowing,
                        bio: body.bio,
                    });
                    setIsOwnProfile(body.isHimself);
                } else {
                    setNotFound(true);
                }
            } catch (err) {
                console.error("unable to connect to server");
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, [updateDataTrigger, params]);

    if (notFound) {
        return <NotFound />;
    }

    async function exitProfile() {
        // i love this
        window.history.go(-1);
        //navigateTo("/");
    }

    if (isLoading) {
        return <Loading useDarkTheme={true} />;
    }

    return (
        <main
            ref={ref}
            className={`profile-fs   ${useDarkTheme ? "profile-dark" : "profile-light"}`}
        >
            {showWarning ? (
                <FSWarning
                    handleClose={() => {
                        setShowWarning(false);
                    }}
                    text={i18n.t("mustSignIn")}
                />
            ) : (
                <></>
            )}
            <FollowPage
                title={followPageTitle}
                reference={followPageRef}
                zIndex={60}
                closedStateSetter={(set: boolean) => {
                    setIsFollowPageClosed(set);
                    if (set && ref?.current != null) {
                        ref!.current.classList.remove(
                            "disable-profile-fs-scroll",
                        );
                    }
                }}
            >
                {isLoadingFollows ? (
                    <Loading useDarkTheme={useDarkTheme} />
                ) : followListVector.length > 0 ? (
                    followListVector.map((e, i) => (
                        <FollowerUser
                            key={i}
                            user={e}
                            beforeOnClick={() => {}}
                        />
                    ))
                ) : (
                    <EmptyFollowUser
                        text={
                            isFollowingPage
                                ? i18n.t("heFollowsNobody")
                                : i18n.t("heIsFollowedByNobody")
                        }
                    />
                )}
            </FollowPage>
            <header className="profile-header">
                <button className="back-btn" onClick={exitProfile}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        className={
                            "btn-icon " +
                            (useDarkTheme ? "btn-icon-dark" : "btn-icon-light")
                        }
                    >
                        <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
                    </svg>
                </button>
            </header>
            <main className="profile-body">
                <UserIcon
                    className="user-icon"
                    userIconImg={
                        currentUserData.icon === ""
                            ? userIcon
                            : currentUserData.icon
                    }
                />
                <section className="names-sect">
                    <strong className="user-name">
                        {currentUserData.userName}
                    </strong>
                    <span className="user-at">@{currentUserData.userAt}</span>
                </section>
                <button
                    onClick={() => {
                        if (isOwnProfile) {
                            navigateTo(`/edit/profile`);
                        } else {
                            followUnfollow();
                        }
                    }}
                    className={`follow-btn ${currentUserData.isFollowing || isOwnProfile ? "following" : "not-following"}`}
                >
                    {isOwnProfile
                        ? i18n.t("edit")
                        : currentUserData.isFollowing
                          ? i18n.t("following")
                          : i18n.t("follow")}
                </button>
                <textarea
                    value={currentUserData.bio}
                    readOnly
                    className="bio"
                    name="bio"
                    id="bioProfile"
                ></textarea>
                <span
                    onClick={() => {
                        setIsFollowingPage(true);
                        openFollowMenu(true);
                    }}
                    className="following-count"
                >
                    <span>{currentUserData.followingCount}</span>
                    {i18n.t("followingCount")}
                </span>
                <span
                    onClick={() => {
                        setIsFollowingPage(false);
                        openFollowMenu(false);
                    }}
                    className="followers-count"
                >
                    <span>{currentUserData.followersCount}</span>
                    {i18n.t("followCount")}
                </span>
            </main>
            <Feed
                profilepageRef={ref}
                mainPage={false}
                className="feed-merge-scroll"
            ></Feed>
        </main>
    );
}
