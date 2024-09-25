// store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
    initUser,
    logoutUser,
    initVacation,
    addVacation,
    updateVacation,
    //   deleteVacation,
} from './reducers';
import { UserModel } from '../Models/UserModel';
import { VacationModel } from '../Models/VacationModel';

// Application state:
export type AppState = {
    user: UserModel;
    vacations: VacationModel[];
};

// Create user slice:
const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: { initUser, logoutUser },
});

const vacationsSlice = createSlice({
    name: 'vacations',
    initialState: [],
    reducers: { initVacation, addVacation, updateVacation },
});

// Creating action creators:
export const userActions = userSlice.actions;
export const vacationsActions = vacationsSlice.actions;

// Main redux object:
export const store = configureStore<AppState>({
    reducer: {
        user: userSlice.reducer, // User state
        vacations: vacationsSlice.reducer, // Vacations state
    },
});
