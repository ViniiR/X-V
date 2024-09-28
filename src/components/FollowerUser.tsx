import "@styles/follower_user.scss";
import { MouseEventHandler, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import userIcon from "@assets/user-regular-24.png";
import { useNavigate } from "react-router-dom";

interface FollowerUserProps {
    user: { userName: string; userAt: string }; //icon
    beforeOnClick: CallableFunction;
    //unfollow: MouseEventHandler;
}

export default function FollowerUser({
    user,
    beforeOnClick,
}: FollowerUserProps) {
    const useDarkTheme = useContext(ThemeContext) === "dark";
    const navigateTo = useNavigate();
    return (
        <button
            className={`follower-user ${useDarkTheme ? "fuser-dark" : "fuser-light"}`}
            onClick={() => {
                beforeOnClick();
                navigateTo(`/${user.userAt}`);
            }}
        >
            <img src={userIcon} alt="" />
            <section>
                <strong>{user.userName}</strong>
                <span>@{user.userAt}</span>
            </section>
        </button>
    );
}

export function EmptyFollowUser({ text }: { text: string }) {
    const useDarkTheme = useContext(ThemeContext) === "dark";
    return (
        <div
            className={`empty-follow ${useDarkTheme ? "mt-dark" : "mt-light"}`}
        >
            {text}
        </div>
    );
}
