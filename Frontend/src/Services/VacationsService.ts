import axios from 'axios';
import { appConfig } from '../Utils/AppConfig';
import { VacationModel } from '../Models/VacationModel';
import { store, vacationsActions } from '../Redux/store';

class VacationService {
    async getVacations(): Promise<VacationModel[]> {
        if (store.getState().vacations.length > 0) {
            return store.getState().vacations;
        }
        const response = await axios.get(appConfig.vacationsUrl);
        const data = response.data;

        const action = vacationsActions.initVacation(data);
        store.dispatch(action);
        return data;
    }
    async getVacationById(_id: string) {
        return await axios.get(appConfig.vacationsUrl + _id);
    }
    async addVacation(vacation: VacationModel): Promise<void> {
        const response = await axios.post(appConfig.vacationsUrl, vacation, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        vacation.image = response.data.image;
        if (store.getState().vacations) {
            const action = vacationsActions.addVacation(vacation);
            store.dispatch(action);
        }
        return response.data;
    }

    // async deleteVacation(_id: string) {
    //     const action = vacationsActions.deleteVacation(_id);
    //     store.dispatch(action);
    //     return await axios.delete(appConfig.vacationsUrl + _id);
    // }
    // async getVacationImage(imageName: string) {
    //     return await axios.get(appConfig.baseImageUrl + imageName);
    // }
}
export const vacationService = new VacationService();
