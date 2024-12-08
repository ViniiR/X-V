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
import { RefObject, useContext, useEffect, useRef, useState } from "react";
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

    function toggleImgStealerAnimation(open: boolean) {
        if (!imgStealerRef.current) return;
        if (open) {
            imgStealerRef.current!.style.bottom = "0px";
        } else {
            imgStealerRef.current!.style.bottom = "-100%";
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
                            {`${date.getDay().toString().padStart(2, "0")}/${date.getMonth().toString().padStart(2, "0")}/${date.getFullYear()} - ${i18n.t("ago", { time: getSmartHours(date) })}`}
                        </span>
                        <section>
                            <button className="post-interaction-btn">
                                <span>
                                    <span className="inner-fs-post-interaction-value">
                                        {100}{" "}
                                    </span>
                                    {i18n.t("comments")}
                                </span>
                            </button>
                            <button className="post-interaction-btn">
                                <span>
                                    <span className="inner-fs-post-interaction-value">
                                        {postDetails.likesQuantity}{" "}
                                    </span>
                                    {i18n.t("likes")}
                                </span>
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

//<main
//    className={`fullscreen-post ${useDarkTheme ? "fs-post-dark" : "fs-post-light"}`}
//>
//    <header>
//        <button
//            className="fs-back-btn"
//            onClick={() => {
//                history.back();
//            }}
//        >
//            <svg
//                xmlns="http://www.w3.org/2000/svg"
//                width="100%"
//                height="100%"
//                viewBox="0 0 24 24"
//                className={
//                    "btn-icon " +
//                    (useDarkTheme ? "btn-icon-dark" : "btn-icon-light")
//                }
//            >
//                <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
//            </svg>
//        </button>
//        <strong className="fs-title">{i18n.t("post")}</strong>
//    </header>
//    <main>
//        <section className="post-header">
//            <section className="post-hdr-left">
//                <img
//                    onClick={navigateToProfile}
//                    src={postDetails.profilePicture || userIcon}
//                    alt=""
//                />
//                <strong onClick={navigateToProfile}>
//                    {postDetails.userName}
//                </strong>
//                <span className="user-at-main" onClick={navigateToProfile}>
//                    @{postDetails.userAt}
//                </span>
//            </section>
//            <button className="post-aditional-info">⋮</button>
//        </section>
//        <section className="post-content">
//            <p
//                dangerouslySetInnerHTML={{
//                    __html: makeAnchor(postDetails.content),
//                }}
//            ></p>
//            {postDetails.image ? (
//                <section
//                    className="post-image"
//                    onClick={(e) => {
//                        e.stopPropagation();
//                        postDetails.imgStealerCallback(postDetails.image);
//                    }}
//                >
//                    <img src={postDetails.image} alt="" />
//                </section>
//            ) : (
//                <></>
//            )}
//        </section>
//        <section className="post-footer">
//            <span className="date-age">
//                {`${date.getDay().toString().padStart(2, "0")}/${date.getMonth().toString().padStart(2, "0")}/${date.getFullYear()} - ${i18n.t("ago", { time: getSmartHours(date) })}`}
//            </span>
//            <section>
//                <button className="post-interaction-btn">
//                    <span>
//                        <span className="inner-fs-post-interaction-value">
//                            {100}{" "}
//                        </span>
//                        {i18n.t("comments")}
//                    </span>
//                </button>
//                <button className="post-interaction-btn">
//                    <span>
//                        <span className="inner-fs-post-interaction-value">
//                            {postDetails.likesQuantity}{" "}
//                        </span>
//                        {i18n.t("likes")}
//                    </span>
//                </button>
//            </section>
//        </section>
//        <strong className="comments-list-title">{i18n.t("comments")}</strong>
//        <ul className="comments-list">
//            <Post postDetails={postDetails} />
//        </ul>
//    </main>
//</main>;
