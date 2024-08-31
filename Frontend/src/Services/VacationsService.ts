import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { vacationsActions, store } from "../Redux/store";
import { VacationModel } from "../Models/VacationModel";

class VacationService {

    public async getVacations() {
        const stateVacations = store.getState().vacations;

        if (stateVacations && stateVacations.length > 0) {
            return stateVacations;
        }

        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        const vacations = response.data;

        const action = vacationsActions.initVacations(vacations);
        store.dispatch(action);

        return vacations;
    }

    public async addVacation(vacation: VacationModel, imageFile: File) {
        // Create FormData object
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());

        // Handle file input
        if (imageFile) {
            formData.append("image", imageFile);
        }

        // Send FormData to backend
        const options: AxiosRequestConfig = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formData, options);

        // Get back the added vacation
        const addedVacation = response.data;

        // Add added vacation to global state
        const action = vacationsActions.addVacation(addedVacation);
        store.dispatch(action);
    }
}

export const vacationService = new VacationService();
