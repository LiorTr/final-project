import { Action, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { LikeModel } from "../Models/LikesModel";

// npm i react-redux @types/react-redux @reduxjs/toolkit

// Init all products
export function initLikes(currentState: LikeModel[], action: PayloadAction<LikeModel[]>) {
    const newState: LikeModel[] = action.payload; // Here, action.payload is all products to init.
    return newState;
}

// Add product: 
export function addLikes(currentState: LikeModel[], action: PayloadAction<LikeModel>) {
    const newState: LikeModel[] = [...currentState];
    newState.push(action.payload); // Here, action.payload is a product to add.
    return newState;
}

export function initUser(currentState: UserModel, action: PayloadAction<UserModel>) {
    const newState: UserModel = action.payload;
    return newState;
}

export function logoutUser(currentState: UserModel, action: Action) {
    const newState: UserModel = null;
    return newState;
}
