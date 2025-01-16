import "@styles/post_writer.scss";
import { MouseEventHandler, RefObject, useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n";
import x from "@assets/x-regular-120(2).png";
import darkImgIcon from "@assets/image-add-regular-120(1).png";
import lightImgIcon from "@assets/image-add-regular-120.png";

interface PostWriterProps {
    animatePostWriter: CallableFunction;
    publish: MouseEventHandler;
    postWriterRef: RefObject<HTMLDivElement>;
    setOpenPostWriter: CallableFunction;
    postImage: string;
    postText: string;
    setPostImage: CallableFunction;
    setPostText: CallableFunction;
    placeholder: string;
}

export default function PostWriter({
    animatePostWriter,
    publish,
    placeholder,
    postWriterRef,
    setOpenPostWriter,
    postImage,
    postText,
    setPostImage,
    setPostText,
}: PostWriterProps) {
    const POST_CHAR_LIMIT = 200;
    const useDarkTheme = useContext(ThemeContext) == "dark";

    return (
        <div
            ref={postWriterRef}
            className={`post-writer ${useDarkTheme ? "post-writer-dark" : "post-writer-light"}`}
        >
            <button
                disabled={!postText && !postImage}
                onClick={publish}
                className={`publish-post-btn ${useDarkTheme ? "publish-post-btn-dark" : "publish-post-btn-light"}`}
            >
                {i18n.t("publish")}
            </button>
            <button
                onClick={() => {
                    animatePostWriter(false);
                    setTimeout(() => {
                        setOpenPostWriter(false);
                        setPostImage("");
                        setPostText("");
                    }, 100);
                }}
                className="exit-post-btn"
            >
                <img src={x} alt="" />
            </button>
            <section className="post-writer-area">
                <textarea
                    cols={5}
                    maxLength={POST_CHAR_LIMIT}
                    placeholder={placeholder}
                    name="pre-post"
                    id="pre-post"
                    value={postText}
                    onChange={(e) => {
                        if (postText.length > POST_CHAR_LIMIT) {
                            return;
                        }
                        setPostText(e.target.value);
                    }}
                />
                <div className="misc-post-char-limit-counter">
                    {postText.length}/{POST_CHAR_LIMIT}
                </div>
                {postImage ? (
                    <div>
                        <button
                            onClick={() => {
                                setPostImage("");
                            }}
                        >
                            <img src={x} alt="" />
                        </button>
                        <img src={postImage} />
                    </div>
                ) : (
                    <></>
                )}
            </section>
            <section className="post-alt-data">
                <button>
                    <input
                        accept=".png, .jpeg, .jpg, .webp"
                        type="file"
                        name="postImage"
                        id="postImage"
                        onChange={(e) => {
                            const file = e.target.files![0];
                            /*10MB (MegaBytes)*/
                            if (file.size > 10000000) {
                            }
                            const reader = new FileReader();
                            reader.addEventListener("load", function () {
                                const img = new Image();
                                const url = reader.result?.toString() || "";
                                img.src = url;
                                setPostImage(url);
                            });
                            reader.readAsDataURL(file);
                        }}
                    />
                    <img
                        src={useDarkTheme ? darkImgIcon : lightImgIcon}
                        alt=""
                    />
                </button>
            </section>
        </div>
    );
}