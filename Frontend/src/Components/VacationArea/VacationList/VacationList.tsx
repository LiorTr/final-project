import { useEffect, useState } from "react";
import "./VacationList.css";
import { VacationCard } from "../VacationCard/VacationCard";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationsService";

export function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationService.getVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(errorHandler.getError(err)));
    }, []);

    return (
        <div className="vacationList">
            {vacations.map(v => <VacationCard key={v._id} vacation={v} />)}
        </div>
    );
}
