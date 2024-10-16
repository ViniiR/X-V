import "@styles/post.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import userIcon from "@assets/user-circle-solid-108.png"

export type PostDetails = {
    profilePicture: string;
    image: string;
    userName: string;
    userAt: string;
    content: string;
    unixTime: number;
    //commentsQuantity: number;
    likesQuantity: number;
    //likes: ""; // todo
    //comments: ""; //  todo
};

interface PostProps {
    postDetails: PostDetails;
}

export default function Post({ postDetails }: PostProps) {
    const useDarkTheme = useContext(ThemeContext) == "dark";
    //const [imageSrc, setImageSrc] = useState("");
    //const [iconSrc, setIconSrc] = useState("");
    //useEffect(() => {
    //    if (!postDetails.profilePicture) return;
    //    const img = new Image();
    //    img.src = postDetails.image;
    //    setIconSrc(img.src);
    //}, []);
    //useEffect(() => {
    //    if (!postDetails.image) return;
    //    const img = new Image();
    //    img.src = postDetails.image;
    //    setImageSrc(img.src);
    //}, []);
    return (
        <li className="post">
            <section className="post-header">
                <img src={postDetails.profilePicture || userIcon} alt="" />
                <strong>{postDetails.userName}</strong>
                <span>@{postDetails.userAt}</span>
            </section>
            <section className="post-content">
                <p>{postDetails.content}</p>
                {postDetails.image ? <img src={postDetails.image} alt="" /> : <></>}
            </section>
            <section className="post-footer">
                <button className="post-interaction-btn">
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
                        <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path>
                        <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
                    </svg>
                    <span>{0}</span>
                </button>
                <button className="post-interaction-btn">
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
                        <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
                    </svg>
                    <span>{postDetails.likesQuantity}</span>
                </button>
            </section>
        </li>
    );
}
