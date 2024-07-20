import { VacationModel } from './../3-models/vacation-model';
import express, { Request, Response, NextFunction } from "express";
import { UserModel, IUserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";
import { ValidationError, UnauthorizedError } from "../3-models/client-error";
import { vacationService } from "../4-services/vacation-service";

class VacationController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/vacations/", this.getSomeVacations);
        this.router.post("/vacations/", this.addVacation);
        this.router.put("/vacations/", this.updateVacation);
        this.router.delete("/vacations/", this.deleteVacation);
    }

    private async getSomeVacations(request: Request, response: Response, next: NextFunction) {
        try {
            const page = +request.query.page || 1;
            const limit = +request.query.limit || 9;
            const result = await vacationService.getVacationsPerPage(page, limit);
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
    private async addVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const vacation = new VacationModel(request.body)
            const addedVacation = await vacationService.addVacation(vacation)
            response.status(StatusCode.Created).json(addedVacation);
        }

        catch (err) {
            if (err instanceof ValidationError) {
                response.status(StatusCode.BadRequest).json({ message: err.message });
            } else {
                next(err);
            }
        }
    }
    private async updateVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const _id = request.params._id;
            request.body._id = _id;
            const vacation = new VacationModel(request.body);
            const updatedVacation = await vacationService.updateVacation(vacation);
            response.json(updatedVacation);
        }
        catch (err: any) { next(err); }

    }
    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const _id = request.params._id;
            await vacationService.deleteVacation(_id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) { next(err); }
    }
}

export const vacationController = new VacationController();
