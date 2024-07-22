import { VacationModel } from "../../../Models/VacationModel";
import "./ProductCard.css";

type VacationCardProps = {
    vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <div>
                <span>{props.vacation.destination}</span>
                <span>Price: {props.vacation.description}</span>
                <span>Stock: {props.vacation.startDate}</span>
                <span>Stock: {props.vacation.endDate}</span>
            </div>
            <div>
                <img src={props.vacation.imageUrl} />
            </div>
        </div>
    );
}
