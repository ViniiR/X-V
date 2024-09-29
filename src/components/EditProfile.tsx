import "@styles/edit_profile.scss";
import {
    ChangeEvent,
    SyntheticEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n";
import userIcon from "@assets/stella_octangula.jpg";
import editIcon from "@assets/edit-alt-regular-96.png";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    Crop,
    makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import x from "@assets/x-regular-120(2).png";

interface EditProfileProps {
    setTheme: CallableFunction;
}

export default function EditProfile({}: EditProfileProps) {
    const minWidth = 100;
    const useDarkTheme = useContext(ThemeContext) === "dark";
    const imgInputRef = useRef<HTMLInputElement>(null);
    const [submitableData, setSubmitableData] = useState({
        userName: "",
        bio: "",
        icon: "",
    });
    const [error, setError] = useState("");
    const [croppableImg, setCroppableImg] = useState("");
    const [crop, setCrop] = useState<Crop>();
    const [showCropper, setShowCropper] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const croppingRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        async function fetchData() {
            //
        }
        fetchData();

        const canvas = previewCanvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const img = new Image();
        img.src = userIcon;
        //const hRatio = canvas.height / img.height;
        //const wRatio = canvas.width / img.width;
        //const ratio = Math.min(hRatio, wRatio);
        img.onload = function () {
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height, // source rectangle
                0,
                0,
                canvas.width,
                canvas.height,
            );
        };
    }, []);
    async function exitProfile() {
        // i love this
        window.history.go(-1);
    }

    function imgInputHandler(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            const img = new Image();
            const url = reader.result?.toString() || "";
            img.src = url;

            //shhhhhhhhhut the fuck up
            img.addEventListener("load", function (e: any) {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < minWidth || naturalHeight < minWidth) {
                    setError(i18n.t("min150px"));
                    setCroppableImg("");
                    return;
                }
            });

            if (!error) {
                setCroppableImg(url);
                setShowCropper(true);
            }
        });

        reader.readAsDataURL(file);
    }

    function handleLoad(e: SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: (minWidth / width) * 100,
            },
            1,
            width,
            height,
        );
        setCrop(centerCrop(crop, width, height));
    }
    function handleCropping() {
        if (!canvasRef || !croppingRef || !crop || !previewCanvasRef) return;

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        const img = croppingRef.current!;

        //const pixelRatio = window.devicePixelRatio;
        //const scale = {
        //    x: img.naturalWidth / img.width,
        //    y: img.naturalHeight / img.height,
        //};

        //ctx.scale(pixelRatio, pixelRatio);
        //ctx.imageSmoothingQuality = "high";
        //ctx.save();

        //const cropPx = convertToPixelCrop(
        //    crop!,
        //    croppingRef.current!.width,
        //    croppingRef.current!.height,
        //);
        //
        //const cropObj = {
        //    x: cropPx!.x * scale.x,
        //    y: cropPx!.y * scale.y,
        //};

        //ctx.translate(-cropObj.x, -cropObj.y);

        ctx.drawImage(
            img,
            img.naturalWidth * (crop.x / 100),
            img.naturalHeight * (crop.y / 100),
            img.naturalWidth * (crop.width / 100),
            img.naturalHeight * (crop.height / 100),
            0,
            0,
            500,
            500,
        );
        const previewCtx = previewCanvasRef.current!.getContext("2d");
        previewCtx!.drawImage(ctx.canvas, 0, 0, 70, 70);

        setSubmitableData({
            userName: submitableData.userName,
            bio: submitableData.bio,
            icon: ctx.canvas.toDataURL(),
        });
    }
    useEffect(() => {
        console.log(submitableData);
    }, [submitableData]);
    return (
        <main
            className={`edit-profile ${useDarkTheme ? "edit-dark" : "edit-light"}`}
        >
            {showCropper ? (
                <div className="cropper">
                    <button
                        className="exit-btn"
                        onClick={() => {
                            if (imgInputRef) {
                                imgInputRef.current!.value = "";
                            }
                            setError("");
                            setCroppableImg("");
                            setShowCropper(false);
                        }}
                    >
                        <img src={x} alt="" />
                    </button>
                    {error ? (
                        <>
                            <div className="err">{error}</div>
                        </>
                    ) : (
                        <>
                            <ReactCrop
                                className="croppable"
                                aspect={1}
                                crop={crop}
                                circularCrop={true}
                                keepSelection
                                minWidth={minWidth}
                                onChange={(px, per) => {
                                    setCrop(per);
                                }}
                            >
                                {croppableImg && (
                                    <img
                                        ref={croppingRef}
                                        onLoad={handleLoad}
                                        src={croppableImg}
                                        alt=""
                                    />
                                )}
                            </ReactCrop>
                            <button
                                onClick={handleCropping}
                                className="crop-btn"
                            >
                                {i18n.t("crop")}
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <></>
            )}
            <header className="profile-header">
                <section>
                    <button className="back-btn" onClick={exitProfile}>
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
                    <strong>{i18n.t("editProfile")}</strong>
                </section>
                <button
                    onClick={() => {
                        //save
                    }}
                    className="save-btn"
                >
                    {i18n.t("save")}
                </button>
            </header>
            <main className="edit-profile-body">
                <form>
                    <section className="user-img">
                        <div className="edit-btn">
                            <input
                                accept=".png, .jpeg, .jpg, .webp"
                                onChange={imgInputHandler}
                                type="file"
                                ref={imgInputRef}
                            />
                            <img src={editIcon} alt="" />
                        </div>
                        <canvas
                            style={{ borderRadius: "50px" }}
                            ref={previewCanvasRef}
                            width={70}
                            height={70}
                        ></canvas>
                    </section>
                    <label htmlFor="userName">{i18n.t("userName")}:</label>
                    <input
                        value={submitableData.userName}
                        type="text"
                        name="userNameField"
                        id="userName"
                    />
                    <label htmlFor="bio">{i18n.t("bio")}:</label>
                    <input
                        value={submitableData.bio}
                        type="text"
                        name="bioField"
                        id="bio"
                    />
                    <div>server output</div>
                </form>
            </main>
            <canvas
                style={{ display: "none" }}
                ref={canvasRef}
                width={500}
                height={500}
            ></canvas>
        </main>
    );
}
