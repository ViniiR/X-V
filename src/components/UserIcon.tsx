import "@styles/user_icon.scss";

interface UserIconProps {
    userIconImg: any;
    className?: string;
}

export default function UserIcon({ userIconImg, className }: UserIconProps) {
    return (
        <button className={"user-icon-toggle-btn   " + className}>
            <img src={userIconImg} alt="" />
        </button>
    );
}
