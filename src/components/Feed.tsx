import "@styles/feed.scss";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Post from "./Post";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    FeedStateSelector,
    shiftPost,
    setPosts as feedSetPosts,
} from "../redux/store";

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
    commentsCount: number;
    postId: string;
    hasThisUserLiked: boolean;
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
    const [showZoomStealer, setShowZoomStealer] = useState(false);
    const postList = useSelector(
        (state: FeedStateSelector) => state.feed.value,
    );
    const dispatch = useDispatch();
    const [toggleRefetch, setToggleRefetch] = useState(false);

    useEffect(() => {
        if (postList.length > posts.length && props.mainPage) {
            setToggleRefetch(!toggleRefetch);
            setPosts(postList);
            setIsLoading(false);
        }
    }, [postList]);

    function toggleImgStealerAnimation(open: boolean) {
        if (!imgStealerRef.current) return;
        setSavedWindowScrollY(window.scrollY);
        // shittiest code i have ever written
        // and it smh became even even worse²
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
                const profile = document.querySelector(
                    ".profile-fs",
                ) as HTMLElement | null;
                imgStealerRef.current!.style.bottom = `-${profile?.scrollTop || 0}px`;
                //imgStealerRef.current!.style.bottom = "0px";
            }
        }, 0);
    }, [isImgStealerOpen]);

    useEffect(() => {
        async function fetchPosts() {
            if (postList[0].userAt === "") {
                setIsLoading(true);
            } else {
                setPosts(postList);
            }
            try {
                const url = `${process.env.API_URL_ROOT}${props.mainPage ? process.env.FETCH_POSTS_PATH : process.env.FETCH_USER_POSTS_PATH + (params.user ? "/" + params.user : "")}`;
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
                    if (body.Ok.length > 0) {
                        dispatch(feedSetPosts(body.Ok));
                    }
                }
            } catch (err) {
                console.error("unable to fetch posts");
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, [toggleRefetch]);

    //const followMouseDivZoomRef = useRef<HTMLDivElement>(null);
    const drawableImageRef = useRef<HTMLImageElement>(null);
    //const zoomCanvasRef = useRef<HTMLCanvasElement>(null);

    //useEffect(() => {
    //    function followMouse(e: MouseEvent) {
    //        if (
    //            !followMouseDivZoomRef.current ||
    //            !drawableImageRef.current ||
    //            !zoomCanvasRef.current
    //        )
    //            return;
    //
    //        const ctx = zoomCanvasRef.current!.getContext("2d");
    //
    //        const imgRect = drawableImageRef.current!.getBoundingClientRect();
    //        const divRect =
    //            followMouseDivZoomRef.current!.getBoundingClientRect();
    //        const divWidth = followMouseDivZoomRef.current!.offsetWidth;
    //        const divHeight = followMouseDivZoomRef.current!.offsetHeight;
    //
    //        let x = e.clientX;
    //        let y = e.clientY;
    //        let xMin = imgRect.left + divWidth * 0.7;
    //        let yMin = imgRect.top + divHeight * 0.7;
    //        let xMax = imgRect.right - divWidth * 0.81;
    //        let yMax = imgRect.bottom - divHeight * 0.81;
    //
    //        let bgPosX = divRect.x - imgRect.x;
    //        let bgPosY = divRect.y - imgRect.y;
    //        let bgPosEndX = bgPosX + divRect.width;
    //        let bgPosEndY = bgPosY + divRect.height;
    //
    //        if (x > xMax) x = xMax;
    //        if (x < xMin) x = xMin;
    //        if (y > yMax) y = yMax;
    //        if (y < yMin) y = yMin;
    //
    //        followMouseDivZoomRef.current!.style.left = `${x}px`;
    //        followMouseDivZoomRef.current!.style.top = `${y}px`;
    //
    //        ctx?.drawImage(
    //            drawableImageRef.current!,
    //            //drawableImageRef.current!.naturalWidth * (bgPosX * 100),
    //            //drawableImageRef.current!.naturalHeight * (bgPosY * 100),
    //            //drawableImageRef.current!.naturalWidth * (bgPosX * 100),
    //            //drawableImageRef.current!.naturalHeight * (bgPosY * 100),
    //            //drawableImageRef.current!.naturalWidth * bgPosX,
    //            //drawableImageRef.current!.naturalHeight * bgPosY,
    //            // HARD CODED NUMBERS FIND A WAY TO FIX IT PLS
    //            (bgPosX * drawableImageRef.current!.naturalWidth) / 380,
    //            (bgPosY * drawableImageRef.current!.naturalHeight) / 150,
    //            divRect.width,
    //            divRect.height,
    //            0,
    //            0,
    //            divRect.width * 2,
    //            divRect.height,
    //        );
    //
    //        //const bgPos = `${(bgPosX / imgRect.width) * 100}% ${(bgPosY / imgRect.height) * 100}%`;
    //        //followMouseDivZoomRef.current!.style.backgroundPosition = bgPos;
    //    }
    //    //document.addEventListener("mousemove", followMouse);
    //    //return () => {
    //    //    document.removeEventListener("mousemove", followMouse);
    //    //};
    //}, []);

    return (
        <main
            className={
                `feed  ${props.className ? props.className : ""}` +
                (useDarkTheme ? " feed-dark" : " feed-light")
            }
        >
            {showZoomStealer ? (
                <div
                    className="img-stealer-zoom"
                    onClick={() => {
                        setShowZoomStealer(false);
                    }}
                >
                    <img draggable={false} src={drawableImage} alt="" />
                </div>
            ) : (
                <></>
            )}
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
                                setShowZoomStealer(false);
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
                        {/*<div
                                    className="follow-mouse-zoom"
                                    //style={{ background: `url(${drawableImage})` }}
                                    ref={followMouseDivZoomRef}
                                >
                                        <canvas
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        ref={zoomCanvasRef}
                                    ></canvas>
                                    </div>
                                            */}
                        <img
                            className="image-stealer-image"
                            onClick={() => {
                                setShowZoomStealer(true);
                            }}
                            draggable={false}
                            src={drawableImage}
                            ref={drawableImageRef}
                            alt=""
                        />
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
                                hasThisUserLiked: p.hasThisUserLiked,
                                postId: p.postId,
                                profilePicture: p.icon,
                                image: p.image,
                                likesQuantity: p.likesCount,
                                commentsQuantity: p.commentsCount,
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
