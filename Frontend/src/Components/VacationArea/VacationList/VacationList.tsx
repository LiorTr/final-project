import { useEffect, useState } from "react";
import "./VacationList.css";
import { productService } from "../../../Services/ProductService";
import { VacationCard } from "../VacationCard/VacationCard";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { VacationModel } from "../../../Models/VacationModel";

export function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        productService.getAllProducts()
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(errorHandler.getError(err)));
    }, []);

    return (
        <div className="vacationList">
            {vacations.map(v => <VacationCard key={v._id} vacation={v} />)}
        </div>
    );
}
