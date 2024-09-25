import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { ResourceNotFoundError } from '../3-models/client-error';
import { IVacationModel, VacationModel } from '../3-models/vacation-model';
class VacationService {
    public async getVacationById(_id: string): Promise<IVacationModel> {
        const vacation = await VacationModel.findById(_id).exec();
        if (!vacation) {
            throw new ResourceNotFoundError('Vacation not found');
        }
        return vacation;
    }

    public async getAllVacations(): Promise<IVacationModel[]> {
        const vacations = await VacationModel.aggregate([
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'vacationId',
                    as: 'likes',
                },
            },
            {
                $addFields: {
                    likesCount: { $size: '$likes' },
                },
            },
            {
                $project: {
                    destination: 1,
                    description: 1,
                    startDate: 1,
                    endDate: 1,
                    price: 1,
                    image: 1,
                    likes: 1,
                    likesCount: 1,
                },
            },
        ]).exec();

        console.log(vacations); // Log the result to debug
        return vacations;
    }

    public async createVacation(
        vacationData: IVacationModel
    ): Promise<IVacationModel> {
        const vacation = new VacationModel(vacationData);
        return vacation.save();
    }

    // public async updateVacation(
    //   vacation: IVacationModel
    // ): Promise<IVacationModel> {
    //   vacation.validate();
    //   const imageName = await fileSaver.add(vacation.image);
    //   vacation.save();
    //   vacation = await this.getVacationById(`${vacation._id}`);
    //   return vacation;
    // }

    public async getVacationImage(imageName: string): Promise<string> {
        const imagePath = path.join(__dirname, '..', 'uploads', imageName);
        return imagePath;
    }

    public async sortVacationsByDates(): Promise<IVacationModel[]> {
        const vacations = await VacationModel.find().sort({ startDate: 1 }).exec();
        return vacations;
    }

    public async getVacationsByLikes(): Promise<IVacationModel[]> {
        const vacations = await VacationModel.aggregate([
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'vacationId',
                    as: 'likes',
                },
            },
            {
                $addFields: {
                    likesCount: { $size: '$likes' },
                },
            },
            {
                $sort: { likesCount: -1 },
            },
        ]).exec();
        return vacations;
    }

    public async deleteVacation(_id: string): Promise<void> {
        await VacationModel.deleteOne({ _id }).exec();
    }
}
export const vacationService = new VacationService();
