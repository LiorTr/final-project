import { Action, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { LikeModel } from "../Models/LikesModel";
import { VacationModel } from "../Models/VacationModel";


export function initLikes(currentState: LikeModel[], action: PayloadAction<LikeModel[]>) {
    const newState: LikeModel[] = action.payload; // Here, action.payload is all products to init.
    return newState;
}

export function addLike(currentState: LikeModel[], action: PayloadAction<LikeModel>) {
    const newState: LikeModel[] = [...currentState];
    newState.push(action.payload); // Here, action.payload is a product to add.
    return newState;
}
export function initVacations(currentState: VacationModel[], action: PayloadAction<VacationModel[]>) {
    const newState: VacationModel[] = action.payload; // Here, action.payload is all products to init.
    return newState;
}

export function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>) {
    const newState: VacationModel[] = [...currentState];
    newState.push(action.payload); // Here, action.payload is a product to add.
    return newState;
}

export function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>) {
    const newState: VacationModel[] = currentState.map((v) =>
        v._id === action.payload._id ? action.payload : v
    );
    return newState;
}

export function deleteVacation(currentState: VacationModel[], action: PayloadAction<string>) {
    const newState: VacationModel[] = currentState.filter(
        (vacation) => vacation._id !== action.payload
    );
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
