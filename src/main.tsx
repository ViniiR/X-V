import { createRoot } from "react-dom/client";
import App from "@src/App";
import { StrictMode } from "react";
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import SearchFeed from "./components/SearchFeed";
import DMFeed from "./components/DirectMessageFeed";
import Feed from "./components/Feed";
import Post from "./components/Post";

import userIcon from "@assets/usericon.svg"

const domNode = document.getElementById("root");
const root = createRoot(domNode!);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/auth/login"} />,
    },
    {
        path: "/auth",
        element: (
            <div>
                do auth or smth
                <Outlet />
            </div>
        ),
        children: [
            {
                path: "/auth/login",
                element: <div>login</div>,
            },
            {
                path: "/auth/signin",
                element: <div>signin</div>,
            },
        ],
    },
    {
        path: "/app",
        element: <App />,
        children: [
            {
                path: "/app",
                element: (
                    <Feed>
                        <Post
                            postDetails={{
                                userName: "vinii",
                                userAt: "@owner",
                                date: "",
                                profilePicture: userIcon,
                                content: "teste",
                                commentsQuantity: 0,
                                likesQuantity: 0,
                                likes: "",
                                comments: "",
                            }}
                        ></Post>
                        <Post
                            postDetails={{
                                userName: "vinii",
                                userAt: "@owner",
                                date: "",
                                profilePicture: userIcon,
                                content: "teste",
                                commentsQuantity: 0,
                                likesQuantity: 0,
                                likes: "",
                                comments: "",
                            }}
                        ></Post>
                        <Post
                            postDetails={{
                                userName: "vinii",
                                userAt: "@owner",
                                date: "",
                                profilePicture: userIcon,
                                content: "teste",
                                commentsQuantity: 0,
                                likesQuantity: 0,
                                likes: "",
                                comments: "",
                            }}
                        ></Post>
                        <Post
                            postDetails={{
                                userName: "vinii",
                                userAt: "@owner",
                                date: "",
                                profilePicture: userIcon,
                                content: "teste",
                                commentsQuantity: 0,
                                likesQuantity: 0,
                                likes: "",
                                comments: "",
                            }}
                        ></Post>
                        <Post
                            postDetails={{
                                userName: "vinii",
                                userAt: "@owner",
                                date: "",
                                profilePicture: userIcon,
                                content: "teste",
                                commentsQuantity: 0,
                                likesQuantity: 0,
                                likes: "",
                                comments: "",
                            }}
                        ></Post>
                        <Post
                            postDetails={{
                                userName: "vinii",
                                userAt: "@owner",
                                date: "",
                                profilePicture: userIcon,
                                content: "teste",
                                commentsQuantity: 0,
                                likesQuantity: 0,
                                likes: "",
                                comments: "",
                            }}
                        ></Post>
                        <Post
                            postDetails={{
                                userName: "vinii",
                                userAt: "@owner",
                                date: "",
                                profilePicture: userIcon,
                                content: "teste",
                                commentsQuantity: 0,
                                likesQuantity: 0,
                                likes: "",
                                comments: "",
                            }}
                        ></Post>
                    </Feed>
                ),
            },
            {
                path: "/app/search",
                element: <SearchFeed></SearchFeed>,
            },
            {
                path: "/app/direct",
                element: <DMFeed></DMFeed>,
            },
        ],
    },
    //{
    //    path: "*",
    //    element: <Navigate to={"/"}></Navigate>,
    //},
]);

root.render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
);
