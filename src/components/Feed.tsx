import "@styles/feed.scss";
import {
    MouseEvent,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Post from "./Post";
import Loading from "./Loading";
import i18n from "../i18n";
import FSPost from "./FSPost";
import { Params, useParams } from "react-router-dom";

interface FeedProps {
    className?: string;
    mainPage: boolean;
    profilepageRef?: RefObject<HTMLDivElement>;
}

export type PostData = {
    // user icon
    icon: string;
    // image content
    image: string;
    // date when post was published
    unixTime: string;
    userAt: string;
    userName: string;
    text: string;
    ownerId: string;
    likesCount: number;
    postId: string;
};

export default function Feed(props: FeedProps) {
    const useDarkTheme = useContext(ThemeContext) === "dark";
    const [isImgStealerOpen, setIsImgStealerOpen] = useState(false);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [drawableImage, setDrawableImage] = useState("");
    const imgStealerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const [savedWindowScrollY, setSavedWindowScrollY] = useState(0);

    function toggleImgStealerAnimation(open: boolean) {
        if (!imgStealerRef.current) return;
        setSavedWindowScrollY(window.scrollY);
        if (open) {
            imgStealerRef.current!.style.bottom = "0px";
            if (props.profilepageRef?.current != null) {
                props.profilepageRef!.current.classList.add(
                    "disable-profile-fs-scroll",
                );
            }
        } else {
            imgStealerRef.current!.style.bottom = "-100%";
            setTimeout(() => {
                if (props.profilepageRef?.current != null) {
                    props.profilepageRef!.current.classList.remove(
                        "disable-profile-fs-scroll",
                    );
                    window.scrollTo({ top: savedWindowScrollY });
                }
            }, 100);
        }
    }

    useEffect(() => {
        if (!imgStealerRef.current) return;
        setTimeout(() => {
            if (isImgStealerOpen) {
                imgStealerRef.current!.style.bottom = "0px";
            }
        }, 0);
    }, [isImgStealerOpen]);

    useEffect(() => {
        async function fetchPosts() {
            setIsLoading(true);
            try {
                const url = `${process.env.API_URL_ROOT}${props.mainPage ? process.env.FETCH_POSTS_PATH : process.env.FETCH_USER_POSTS_PATH + (params.user ? "/" + params.user : "")}`;
                console.log(url);
                const res = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const status = res.status;
                // TODO it might return {Err: string}
                const body: { Ok: PostData[] } = await res.json();
                if (!body.Ok) {
                    throw new Error("failed");
                }
                if (status === 200) {
                    setPosts(body.Ok);
                }
            } catch (err) {
                console.error("unable to fetch posts");
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <main
            className={
                `feed  ${props.className ? props.className : ""}` +
                (useDarkTheme ? " feed-dark" : " feed-light")
            }
        >
            {isImgStealerOpen ? (
                <section
                    className="image-stealer-fullscreen"
                    ref={imgStealerRef}
                >
                    <header>
                        <button
                            className="go-back-stealer-btn"
                            onClick={() => {
                                toggleImgStealerAnimation(false);
                                setTimeout(() => {
                                    setIsImgStealerOpen(false);
                                }, 100);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                viewBox="0 0 24 24"
                                className={
                                    "btn-icon " +
                                    (useDarkTheme
                                        ? "btn-icon-dark"
                                        : "btn-icon-light")
                                }
                            >
                                <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
                            </svg>
                        </button>
                        <a download href={drawableImage} className="steal-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                viewBox="0 0 24 24"
                                className={
                                    "btn-icon " +
                                    (useDarkTheme
                                        ? "btn-icon-dark"
                                        : "btn-icon-light")
                                }
                            >
                                <path d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"></path>
                            </svg>
                        </a>
                    </header>
                    <section>
                        <img src={drawableImage} alt="" />
                    </section>
                </section>
            ) : (
                <></>
            )}
            {isLoading ? (
                <Loading useDarkTheme={useDarkTheme} />
            ) : (
                <ul>
                    {posts.map((p, i) => (
                        <Post
                            key={i}
                            postDetails={{
                                unixTime: p.unixTime,
                                postId: p.postId,
                                profilePicture: p.icon,
                                image: p.image,
                                likesQuantity: p.likesCount,
                                userAt: p.userAt,
                                userName: p.userName,
                                content: p.text,
                                imgStealerCallback: (img: string) => {
                                    setIsImgStealerOpen(true);
                                    setDrawableImage(img);
                                    setTimeout(() => {
                                        toggleImgStealerAnimation(true);
                                    }, 0);
                                },
                            }}
                        ></Post>
                    ))}
                </ul>
            )}
            {posts.length > 0 && <div className="refetch-trigger"></div>}
        </main>
    );
}
