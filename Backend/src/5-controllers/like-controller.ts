import express, { Request, Response, NextFunction } from 'express';
import { likeService } from '../4-services/like-service';
class LikeController {
    public readonly router = express.Router();

    public constructor() {
        this.router.post('/likes', this.like);
        this.router.delete('/likes/:id', this.unlike);
    }

    private async like(request: Request, response: Response, next: NextFunction) {
        try {
            const vacationId = request.body.vacationId;
            const userId = request.body.userId;
            await likeService.likeVacation(userId, vacationId);
        } catch (err: any) {
            next(err);
        }
    }

    private async unlike(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const vacationId = request.params.id;
            const userId = request.body.userId;
            await likeService.unlikeVacation(vacationId, userId);
            response.json(true);
        } catch (err: any) {
            next(err);
        }
    }
}
export const likeController = new LikeController();
