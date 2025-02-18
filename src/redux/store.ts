import { createSlice, configureStore } from "@reduxjs/toolkit";

export type UserDataState = {
    icon: string;
    userAt: string;
    userName: string;
    followingCount: number;
    followersCount: number;
    bio: string;
};

export type ReduxAction<T> = {
    type: string;
    payload: T;
};

export type UserDataStateSelector = {
    userData: {
        value: UserDataState;
    };
};

export type darkGlobalThemeStateSelector = {
    darkGlobalTheme: {
        value: boolean;
    };
};

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        value: {
            icon: "",
            userAt: "",
            userName: "",
            followingCount: 0,
            followersCount: 0,
            bio: "",
        },
    },
    reducers: {
        updateUserData: function (
            state,
            action: {
                type: string;
                payload: UserDataState;
            },
        ) {
            state.value = action.payload;
        },
        updateUserIcon: function (state, action: ReduxAction<string>) {
            state.value.icon = action.payload;
        },
        updateUserAt: function (state, action: ReduxAction<string>) {
            state.value.userAt = action.payload;
        },
        updateUserName: function (state, action: ReduxAction<string>) {
            state.value.userName = action.payload;
        },
        updateUserFollowingCount: function (
            state,
            action: ReduxAction<number>,
        ) {
            state.value.followingCount = action.payload;
        },
        updateUserFollowersCount: function (
            state,
            action: ReduxAction<number>,
        ) {
            state.value.followersCount = action.payload;
        },
    },
});

export const {
    updateUserData,
    updateUserIcon,
    updateUserAt,
    updateUserName,
    updateUserFollowersCount,
    updateUserFollowingCount,
} = userDataSlice.actions;

const darkGlobalThemeSlice = createSlice({
    name: "darkGlobalTheme",
    initialState: {
        value: localStorage.getItem("theme") === "dark",
    },
    reducers: {
        setUseDark: function (
            state,
            action: {
                payload: boolean;
                type: string;
            },
        ) {
            state.value = action.payload;
        },
    },
});

export const { setUseDark } = darkGlobalThemeSlice.actions;

export default configureStore({
    reducer: {
        userData: userDataSlice.reducer,
        darkGlobalTheme: darkGlobalThemeSlice.reducer,
    },
});
