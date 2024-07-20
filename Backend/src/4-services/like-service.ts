import { ResourceNotFoundError, ValidationError } from "../3-models/client-error";
import { ILikeModel, LikeModel } from "../3-models/like-model";

class LikeService {

    public async getLikesPerVacation(vacationId: string) {
        const likes = await LikeModel.find(
            {},
            ["-_id", "userId", "-vacationId"]
        )

            .exec();

        return likes.length;
    }

    public addLike(like: ILikeModel) {
        const error = like.validateSync(); // If no error - returns null.
        if (error) throw new ValidationError(error.message);
        return like.save();
    }



    public async deleteLike(_id: string) {
        const deletedLike = await LikeModel.findByIdAndDelete(_id).exec();
        if (!deletedLike) throw new ResourceNotFoundError(_id);
    }

    // Mongo Query Language (MQL)



}
export const likeService = new LikeService()
