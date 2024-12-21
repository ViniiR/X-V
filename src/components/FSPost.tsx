import "@styles/fullscreen_post.scss";
import { makeAnchor } from "./Post";
import i18n from "../i18n";
import Post, {
    getSmartHours,
    PostDetails,
    URL_REGEX_PATTERN,
    USER_AT_REGEX_PATTERN,
} from "./Post";
import userIcon from "@assets/user-circle-solid-108.png";
import { useNavigate, useParams } from "react-router-dom";
import {
    MouseEvent,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { PostData } from "./Feed";
import Loading from "./Loading";

interface FSPostProps {
    //useDarkTheme: boolean;
    //closeFSP: CallableFunction;
    //postDetails: PostDetails;
    //reference: RefObject<HTMLDivElement>;
    setTheme: CallableFunction;
}

export default function FSPost(
    {
        //useDarkTheme,
        //closeFSP,
        //postDetails,
        //reference,
    }: FSPostProps,
) {
    const navigateTo = useNavigate();
    const [postDetails, setPostDetails] = useState<PostDetails>({
        hasThisUserLiked: false,
        postId: "0",
        userAt: "",
        image: "",
        content: "",
        unixTime: "0",
        userName: "",
        likesQuantity: 0,
        profilePicture: "",
        imgStealerCallback: () => {},
    });
    const useDarkTheme = useContext(ThemeContext) === "dark";
    const params = useParams<{ postId: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const [isImgStealerOpen, setIsImgStealerOpen] = useState(false);
    const [drawableImage, setDrawableImage] = useState("");
    const imgStealerRef = useRef<HTMLDivElement>(null);
    const [hasSetLike, setHasSetLike] = useState(postDetails.hasThisUserLiked);
    const [likesCount, setLikesCount] = useState(postDetails.likesQuantity);

    function toggleImgStealerAnimation(open: boolean) {
        if (!imgStealerRef.current) return;
        if (open) {
            imgStealerRef.current!.style.bottom = "0px";
        } else {
            imgStealerRef.current!.style.bottom = "-100%";
        }
    }

    async function comment(e: MouseEvent) {
        e.stopPropagation();
        try {
            console.log("uninmplemented");
        } catch (err) {
            console.error("unable to communicate with the server");
        }
    }

    async function toggleLike(e: MouseEvent) {
        e.stopPropagation();
        setLikesCount(hasSetLike ? likesCount - 1 : likesCount + 1);
        setHasSetLike(!hasSetLike);

        const parentPost = (e.target as HTMLElement).closest(
            ".post",
        ) as HTMLElement | null;
        if (parentPost != null) {
            parentPost!.style.backgroundColor = "transparent";
        }

        try {
            const url = `${process.env.API_URL_ROOT}${process.env.LIKE_PATH}`;
            const res = await fetch(url, {
                method: "PATCH",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    post_id: postDetails.postId,
                }),
            });
            if (res.status <= 299 && res.status >= 200) {
                //
            }
        } catch (err) {
            console.error("unable to communicate with the server");
        } finally {
            if (parentPost != null) {
                parentPost!.style.backgroundColor = "";
            }
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
        setIsLoading(true);
        async function fetchPostDetails() {
            const url = `${process.env.API_URL_ROOT}${process.env.GET_POST_PATH}/${params.postId}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const status = response.status;
                const res: { Ok: PostData } = await response.json();
                const body = res.Ok;
                if (status > 199 && status < 300) {
                    setPostDetails({
                        hasThisUserLiked: body.hasThisUserLiked,
                        unixTime: body.unixTime,
                        postId: body.postId,
                        profilePicture: body.icon,
                        image: body.image,
                        likesQuantity: body.likesCount,
                        userAt: body.userAt,
                        userName: body.userName,
                        content: body.text,
                        imgStealerCallback: (img: string) => {
                            setIsImgStealerOpen(true);
                            setDrawableImage(img);
                            setTimeout(() => {
                                toggleImgStealerAnimation(true);
                            }, 0);
                        },
                    });
                    setHasSetLike(body.hasThisUserLiked);
                    setLikesCount(body.likesCount);
                    setIsLoading(false);
                } else {
                    //
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchPostDetails();
    }, []);

    function navigateToProfile() {
        navigateTo(`/${postDetails.userAt}`);
    }

    const date = new Date(Number(postDetails.unixTime));

    return (
        <main
            className={`fullscreen-post ${useDarkTheme ? "fs-post-dark" : "fs-post-light"}`}
        >
            <header>
                <button
                    className="fs-back-btn"
                    onClick={() => {
                        history.back();
                    }}
                >
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
                <strong className="fs-title">{i18n.t("post")}</strong>
            </header>
            {isLoading ? (
                <Loading useDarkTheme={useDarkTheme} />
            ) : isImgStealerOpen ? (
                <section
                    className={`image-stealer-fullscreen ${useDarkTheme ? "image-stealer-fullscreen-dark" : "image-stealer-fullscreen-light"}`}
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
                <main>
                    <section className="post-header">
                        <section className="post-hdr-left">
                            <img
                                onClick={navigateToProfile}
                                src={postDetails.profilePicture || userIcon}
                                alt=""
                            />
                            <strong onClick={navigateToProfile}>
                                {postDetails.userName}
                            </strong>
                            <span
                                className="user-at-main"
                                onClick={navigateToProfile}
                            >
                                @{postDetails.userAt}
                            </span>
                        </section>
                        <button className="post-aditional-info">⋮</button>
                    </section>
                    <section className="post-content">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: makeAnchor(postDetails.content),
                            }}
                        ></p>
                        {postDetails.image ? (
                            <section
                                className="post-image"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    postDetails.imgStealerCallback(
                                        postDetails.image,
                                    );
                                }}
                            >
                                <img src={postDetails.image} alt="" />
                            </section>
                        ) : (
                            <></>
                        )}
                    </section>
                    <section className="post-footer">
                        <span className="date-age">
                            {`${new Intl.DateTimeFormat(i18n.locale === "en" ? "pt-BR" : i18n.locale, { dateStyle: "short" }).format(date)} - ${getSmartHours(date)}`}
                        </span>
                        <section>
                            <button
                                className="post-interaction-btn"
                                onClick={comment}
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
                                    <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path>
                                    <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
                                </svg>
                                <span>100</span>
                            </button>
                            <button
                                className={`post-interaction-btn `}
                                onClick={toggleLike}
                            >
                                {hasSetLike ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 24 24"
                                        className={
                                            "btn-icon " + "btn-icon-colored"
                                        }
                                    >
                                        <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
                                    </svg>
                                ) : (
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
                                        <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
                                    </svg>
                                )}
                                <span>{likesCount}</span>
                            </button>
                        </section>
                    </section>
                    <strong className="comments-list-title">
                        {i18n.t("comments")}
                    </strong>
                    <ul className="comments-list">
                        <Post postDetails={postDetails} />
                    </ul>
                </main>
            )}
        </main>
    );
}
