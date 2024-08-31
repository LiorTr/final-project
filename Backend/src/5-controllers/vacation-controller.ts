import express, { Request, Response, NextFunction } from "express";
import { VacationModel } from './../3-models/vacation-model';
import { vacationService } from "../4-services/vacation-service";
import { StatusCode } from './../3-models/enums';
import { ValidationError } from "../3-models/client-error";
import { UploadedFile } from "express-fileupload";
import { appConfig } from "../2-utils/app-config";
import { securityMiddleware } from "../6-middleware/security-middleware";
import path from "path";

class VacationController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/vacations/", this.getSomeVacations, securityMiddleware.validateLogin);
        this.router.post("/vacations/", this.addVacation, securityMiddleware.validateLogin);
        this.router.put("/vacations/", this.updateVacation);
        this.router.delete("/vacations/", this.deleteVacation);
        this.router.get('/vacations/images/:imageName', this.getVacationImage, securityMiddleware.validateLogin);
    }


    private async getSomeVacations(request: Request, response: Response, next: NextFunction) {
        try {
            const page = +request.query.page || 1;
            const limit = +request.query.limit || 9;
            const result = await vacationService.getVacationsPerPage(page, limit);
            response.json(result);
        } catch (err) {
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
        } catch (err: any) {
            next(err);
        }
    }

    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const _id = request.params._id;
            await vacationService.deleteVacation(_id);
            response.sendStatus(StatusCode.NoContent);
        } catch (err: any) {
            next(err);
        }
    }
    private async addVacation(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            if (!request.files || !request.files.image) {
                return response
                    .status(StatusCode.BadRequest)
                    .json({ message: 'Image is required' });
            }
            const imageFile = request.files.image as UploadedFile;
            const imagePath = path.join(__dirname, '..', 'uploads', imageFile.name);
            imageFile.mv(imagePath, (err) => {
                if (err) {
                    return next(err);
                }
            });
            const imageName =
                appConfig.baseImageUrl + + imageFile.name.trim();
            const vacation = new VacationModel({
                ...request.body,
                image: imageName,
            });
            const addedVacation = await vacationService.addVacation(vacation);
            response.status(StatusCode.Created).json(addedVacation);
        } catch (err: any) {
            next(err);
        }
    }

    private async getVacationImage(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const imageName = request.params.imageName;
            const imagePath = await vacationService.getVacationImage(imageName);
            response.sendFile(imagePath);
        } catch (err: any) {
            next(err);
        }
    }
}

export const vacationController = new VacationController();
