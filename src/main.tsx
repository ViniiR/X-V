import { createRoot } from "react-dom/client";
import App from "@src/App";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchFeed from "./components/SearchFeed";
import DMFeed from "./components/DirectMessageFeed";
import Feed from "./components/Feed";
import Post from "./components/Post";

import userIcon from "@assets/user-regular-24.png";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
import FullscreenMenu from "./components/FullscreenMenu";

const domNode = document.getElementById("root");
const root = createRoot(domNode!);

export const APP_ROUTES = {
    APP_HOME: "/",
    APP_SEARCH: "/search",
    APP_DIRECT_MESSAGES: "/direct",

    AUTH_LOGIN: "/login",
    AUTH_SIGNUP: "/sign-up",
} as const;

const router = createBrowserRouter([
    {
        path: APP_ROUTES.APP_HOME,
        element: (
            <ProtectedRoute>
                <App component={"Home"} />
            </ProtectedRoute>
        ),
        children: [
            {
                path: APP_ROUTES.APP_HOME,
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
                path: APP_ROUTES.APP_SEARCH,
                element: <SearchFeed />,
            },
            {
                path: APP_ROUTES.APP_DIRECT_MESSAGES,
                element: <DMFeed />,
            },
        ],
    },
    {
        path: `${APP_ROUTES.APP_HOME}/:user`,
        element: <App component={"Profile"} />,
    },
    {
        path: APP_ROUTES.AUTH_LOGIN,
        element: <Login />,
    },
    {
        path: APP_ROUTES.AUTH_SIGNUP,
        element: <SignUp />,
    },
]);

root.render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
);
