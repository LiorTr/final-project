import { VacationModel } from '../3-models/vacation-model';
import express, { Request, Response, NextFunction } from "express";
import { UserModel, IUserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { StatusCode } from "../3-models/enums";
import { ValidationError, UnauthorizedError } from "../3-models/client-error";
import { vacationService } from "../4-services/vacation-service";
import { likeService } from '../4-services/like-service';
import { LikeModel } from '../3-models/like-model';

class LikeController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/likes/", this.getLikesPerVacation);
        this.router.post("/likes/", this.addLike);
        this.router.delete("/likes/", this.deleteLike);
    }

    private async getLikesPerVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const vacationId = request.body
            const result = await likeService.getLikesPerVacation(vacationId);
            response.json(result);
        }

        catch (err) {
            if (err instanceof ValidationError) {
                response.status(StatusCode.BadRequest).json({ message: err.message });
            } else {
                next(err);
            }
        }
    }
    private async addLike(request: Request, response: Response, next: NextFunction) {
        try {
            const like = new LikeModel(request.body)
            const addedLike = await likeService.addLike(like)
            response.status(StatusCode.Created).json(addedLike);
        }

        catch (err) {
            if (err instanceof ValidationError) {
                response.status(StatusCode.BadRequest).json({ message: err.message });
            } else {
                next(err);
            }
        }
    }

    private async deleteLike(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const _id = request.params._id;
            await likeService.deleteLike(_id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err); }
    }
}

export const likeController = new LikeController();
