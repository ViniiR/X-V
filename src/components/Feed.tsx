import "@styles/feed.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Post from "./Post";

interface FeedProps {
    className?: string;
    mainPage: boolean;
}

type PostData = {
    // user icon
    icon: string;
    // image content
    image: string;
    // date when post was published
    unixTime: number;
    userAt: string;
    userName: string;
    text: string;
    ownerId: string;
    likesCount: number;
};

export default function Feed(props: FeedProps) {
    const useDarkTheme = useContext(ThemeContext) === "dark";
    const [posts, setPosts] = useState<PostData[]>([
        {
            icon: "",
            unixTime: 0,
            image: "",
            userAt: "",
            userName: "",
            text: "",
            ownerId: "",
            likesCount: 0,
        },
    ]);
    useEffect(() => {
        async function fetchPosts() {
            try {
                const url = `${process.env.API_URL_ROOT}${process.env.FETCH_POSTS_PATH}`;
                const res = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const status = res.status;
                const body: { Ok: PostData[] } = await res.json();
                if (status === 200) {
                    setPosts(body.Ok);
                }
            } catch (err) {
                console.error("unable to fetch posts");
            }
        }
        fetchPosts();
    }, []);
    return (
        <main
            className={
                `feed ${props.className ? props.className : ""}` +
                (useDarkTheme ? "feed-dark" : "feed-light")
            }
        >
            <ul>
                {posts.map((p, i) => (
                    <Post
                        key={i}
                        postDetails={{
                            unixTime: p.unixTime,
                            profilePicture: p.icon,
                            image: p.image,
                            likesQuantity: p.likesCount,
                            userAt: p.userAt,
                            userName: p.userName,
                            content: p.text,
                        }}
                    ></Post>
                ))}
            </ul>
        </main>
    );
}
