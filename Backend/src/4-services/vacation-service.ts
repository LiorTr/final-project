import path from "path";
import { ResourceNotFoundError, ValidationError } from "../3-models/client-error";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";

class VacationService {

    public async getVacationsPerPage(page: number, limit: number) {
        const currentPage = page > 0 ? page - 1 : 0;
        const vacations = await VacationModel.find(
            {},
            ["-_id", "destination", "price", "description"]
        )
            .sort({ startDate: 1 })
            .skip(currentPage * limit)
            .limit(limit)
            .exec();

        return vacations;
    }

    public async getOneVacation(_id: string) {
        const vacation = await VacationModel.findById(_id).exec();
        if (!vacation) throw new ResourceNotFoundError(_id);
        return vacation;
    }

    public addVacation(vacationData: IVacationModel) {
        const error = vacationData.validateSync(); // If no error - returns null.
        if (error) throw new ValidationError(error.message);
        const vacation = new VacationModel(vacationData);
        return vacation.save();
    }

    public async updateVacation(vacation: IVacationModel) {
        const error = vacation.validateSync(); // If no error - returns null.
        if (error) throw new ValidationError(error.message);
        const updatedVacation = await VacationModel.findByIdAndUpdate(vacation._id, vacation, { returnOriginal: false }).exec();
        if (!updatedVacation) throw new ResourceNotFoundError(vacation._id.toString());
        return updatedVacation;
    }

    public async deleteVacation(_id: string) {
        const deletedVacation = await VacationModel.findByIdAndDelete(_id).exec();
        if (!deletedVacation) throw new ResourceNotFoundError(_id);
    }

    // Mongo Query Language (MQL)
    public async getVacationImage(imageName: string): Promise<string> {
        const imagePath = path.join(__dirname, '..', 'uploads', imageName);
        return imagePath;
    }


}
export const vacationService = new VacationService()
