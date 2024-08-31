import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { LikeModel } from "../Models/LikesModel";
import { VacationModel } from "../Models/VacationModel";
import { initUser, logoutUser, initVacations, addVacation, updateVacation, deleteVacation, } from "./reducers"
// Application state
export type AppState = {
    likes: LikeModel[];
    user: UserModel;
    vacations: VacationModel[];
};

// Creating slices
const likesSlice = createSlice({
    name: "likes",
    initialState: [] as LikeModel[],
    reducers: {
        initLikes: (state, action: PayloadAction<LikeModel[]>) => action.payload,
        addLike: (state, action: PayloadAction<LikeModel>) => [...state, action.payload]
    }
});

const vacationsSlice = createSlice({
    name: "vacations",
    initialState: [] as VacationModel[],
    reducers: {
        initVacations: (state, action: PayloadAction<VacationModel[]>) => action.payload,
        addVacation: (state, action: PayloadAction<VacationModel>) => [...state, action.payload]
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: null as UserModel | null,
    reducers: {
        initUser: (state, action: PayloadAction<UserModel>) => action.payload,
        logoutUser: () => null
    }
});

// Export actions
export const likesActions = likesSlice.actions;
export const vacationsActions = vacationsSlice.actions;
export const userActions = userSlice.actions;

// Main redux store
export const store = configureStore<AppState>({
    reducer: {
        likes: likesSlice.reducer,
        user: userSlice.reducer,
        vacations: vacationsSlice.reducer
    }
});
