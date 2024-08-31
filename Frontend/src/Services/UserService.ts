import axios from "axios";
import { UserModel } from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";
import { store, userActions } from "../Redux/store";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../Models/CredentialsModel";
import { notify } from "../Utils/notify";

class UserService {
    public constructor() {
        const token = localStorage.getItem("token");
        if (token) {
            const container = jwtDecode<{ user: UserModel }>(token);
            const dbUser = container.user;
            store.dispatch(userActions.initUser(dbUser));
        }
    }

    public async register(user: UserModel) {
        const response = await axios.post<{ token: string }>(appConfig.registerUrl, user);
        const token = response.data.token;
        if (token) localStorage.setItem("token", token);
        const container = jwtDecode<{ user: UserModel }>(token);
        const dbUser = container.user;
        store.dispatch(userActions.initUser(dbUser));
    }

    public async login(credentials: CredentialsModel): Promise<UserModel> {
        const response = await axios.post<{ token: string }>(appConfig.loginUrl, credentials);
        const token = response.data.token;
        if (token) localStorage.setItem("token", token);
        const container = jwtDecode<{ user: UserModel }>(token);
        const dbUser = container.user;
        store.dispatch(userActions.initUser(dbUser));
        return dbUser;
    }

    public logout() {
        localStorage.removeItem("token");
        store.dispatch(userActions.logoutUser());
    }
}

export const userService = new UserService();
