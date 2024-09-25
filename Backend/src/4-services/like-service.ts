import { ILikeModel, LikeModel } from '../3-models/like-model';
class LikeService {
    public async isUserLikedVacation(
        vacationId: string,
        userId: string
    ): Promise<boolean> {
        const like = await LikeModel.findOne({ vacationId, userId }).exec();
        return !!like;
    }
    public async likeVacation(userId: string, vacationId: string): Promise<void> {
        const like = new LikeModel({ vacationId, userId });
        await like.save();
    }
    public async unlikeVacation(
        vacationId: string,
        userId: string
    ): Promise<void> {
        await LikeModel.deleteOne({ vacationId, userId }).exec();
    }

    public async getLikesCount(vacationId: string): Promise<number> {
        const likesCount = await LikeModel.countDocuments({ vacationId });
        return likesCount;
    }
}
export const likeService = new LikeService();
