import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type VacationCardProps = {
    vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.vacation.imageUrl}
                    title={props.vacation.destination}
                />
                <CardContent key={props.vacation._id}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.vacation.destination}
                    </Typography>
                    <Typography>
                        {props.vacation.startDate}
                        {props.vacation.endDate}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {props.vacation.description}

                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
