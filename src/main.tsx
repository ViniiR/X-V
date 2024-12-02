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
import EditProfile from "./components/EditProfile";
import FSPost from "./components/FSPost";

const domNode = document.getElementById("root");
const root = createRoot(domNode!);

export const APP_ROUTES = {
    APP_HOME: "/",
    APP_SEARCH: "/search",
    APP_DIRECT_MESSAGES: "/direct",
    POST: "/post",

    AUTH_LOGIN: "/login",
    AUTH_SIGNUP: "/sign-up",

    EDIT_PROFILE: "/edit/profile",
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
                element: <Feed mainPage={true}></Feed>,
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
        path: `${APP_ROUTES.POST}/:postId`,
        element: <App component={"Post"} />,
    },
    {
        path: APP_ROUTES.AUTH_LOGIN,
        element: <Login />,
    },
    {
        path: APP_ROUTES.AUTH_SIGNUP,
        element: <SignUp />,
    },
    {
        path: APP_ROUTES.EDIT_PROFILE,
        element: (
            <ProtectedRoute>
                <App component={"EditProfile"} />
            </ProtectedRoute>
        ),
    },
]);

// TODO: try moving the theme context to here
root.render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>,
);
