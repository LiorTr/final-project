import { configureStore, createSlice } from "@reduxjs/toolkit";
import { addLikes, initLikes, initUser, logoutUser } from "./reducers";
import { UserModel } from "../Models/UserModel";
import { LikeModel } from "../Models/LikesModel";

// Application state:
export type AppState = {
    likes: LikeModel[];
    user: UserModel;
};

// Creating products slice: 
const likesSlice = createSlice({
    name: "likes", // Internal use
    initialState: null,
    reducers: { initLikes, addLikes }
});

// Create user slice: 
const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: { initUser, logoutUser }
});

// Creating action creators: 
export const likesActions = likesSlice.actions;
export const userActions = userSlice.actions;

// Main redux object:
export const store = configureStore<AppState>({
    reducer: {
        likes: likesSlice.reducer, // Likes state.
        user: userSlice.reducer // User state
    }
});
