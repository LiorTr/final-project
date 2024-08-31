import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store, likesActions } from "../Redux/store";
import { LikeModel } from "../Models/LikesModel";

class LikeService {

    public async getLikes() {

        // If we have vacations in the global state - return them, without fetching from server:
        if (store.getState().likes) return store.getState().likes;

        // We don't have vacations in the global state - fetch them from backend: 
        const response = await axios.get<LikeModel[]>(appConfig.likesUrl);
        const likes = response.data;

        // Init all vacations in the global state: 
        const action = likesActions.initLikes(likes);
        store.dispatch(action);

        // Return:
        return likes;
    }

    public async addLike(like: LikeModel) {

        // Send product to backend: 
        const options: AxiosRequestConfig = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await axios.post<LikeModel>(appConfig.likesUrl, like, options);

        // Don't add that product to redux if global state is empty:
        if (!store.getState().likes) return;

        // Get back the added product: 
        const addedLike = response.data;

        // Send added product to global state: 
        const action = likesActions.addLike();
        store.dispatch(action);
    }

}

export const likeService = new LikeService();
