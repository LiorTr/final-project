import { useForm } from "react-hook-form";
import "./AddVacation.css";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationsService";

export function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();

    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            const imageFile = (document.querySelector('input[type="file"]') as HTMLInputElement).files?.[0];
            await vacationService.addVacation(vacation, imageFile);
            console.log(vacation)
            notify.success("Vacation has been added.");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(errorHandler.getError(err));
        }
    }

    return (
        <div className="AddVacation">

            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={100} />

                <label>Description: </label>
                <input type="textarea" {...register("description")} required min={0} max={1000} />

                <label>Start on: </label>
                <input type="datetime-local" {...register("startDate")} required />
                <label>End on: </label>
                <input type="datetime-local" {...register("endDate")} required />
                <label>Price: </label>
                <input type="number" {...register("price")} required />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>
                <button onClick={() => { }}>Cancel</button>

            </form>
        </div>
    );
}
