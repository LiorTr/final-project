import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card as MuiCard, CardContent, CardMedia, Typography, CardActions, IconButton, Button, Collapse, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { VacationModel } from '../../../Models/VacationModel';
import { format, parseISO } from 'date-fns';
import { likeService } from '../../../Services/LikeService';
import { useSelector } from 'react-redux';
import { AppState } from '../../../Redux/store';
import { UserModel } from '../../../Models/UserModel';

const Card = styled(MuiCard)(`
    max-width: 240px;
    margin: 16px;
    background-color: #252323;
    color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    min-height: 300px;
    max-height: 500px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    & .MuiCardHeader-root {
        color: white;
    }
    & .MuiCardMedia-root {
        border-bottom: 1px solid #333;
        background-color: #333;
    }
    & .MuiCardContent-root {
        padding: 16px;
        flex: 1;
        overflow-y: auto;
    }
    & .MuiCardActions-root {
        border-top: 1px solid #333;
        padding: 8px 16px;
    }
`);

const MediaContainer = styled('div')({
    position: 'relative',
    height: 140,
});

const TitleOverlay = styled(Typography)(({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: '#ffffff',
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '8px',
    textAlign: 'center',
}));

type VacationCardProps = {
    _id: string;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    image: string
    likes: string[];
    likesCount: number;
};

export function VacationCard(props: VacationCardProps): JSX.Element {
    const [expandedDescription, setExpandedDescription] = useState(false);
    const [likesCountState, setLikesCount] = useState<number>(props.likesCount);
    const [userLikes, setUserLikes] = useState<boolean>(false);
    const user = useSelector<AppState, UserModel>((store) => store.user)
    const userId = user._id;
    const vacationId = props._id

    useEffect(() => {
        if (props.likes) {
            props.likes.forEach((like: any) => {
                if (like.userId === userId) {
                    setUserLikes(true);
                }
            });
        }
    }, [props.likesCount]);


    function likeHandler() {
        likeService.likeVacation(userId, vacationId);
        setLikesCount(likesCountState + 1);
        setUserLikes(true);
    }

    function unlikeHandler() {
        likeService.unlikeVacation(userId, vacationId);
        setLikesCount(likesCountState - 1);
        setUserLikes(false);
    }

    const dateFormatter = (dateString: string): string => {
        const date = parseISO(dateString); // Parse ISO date string
        return format(date, 'dd/MM/yy'); // Format date
    }

    const handleExpandClick = () => {
        setExpandedDescription(!expandedDescription);
    };

    const imageUrl = typeof props.image === 'string' ? props.image : '';

    return (
        <div className='VacationCard'>
            <Card>
                <MediaContainer>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={imageUrl}
                    />
                    <TitleOverlay variant="h6">
                        {props.destination}
                    </TitleOverlay>
                </MediaContainer>

                <CardContent>
                    <Typography variant="body1" sx={{ fontSize: '0.7rem' }}>
                        {dateFormatter(props.startDate)} - {dateFormatter(props.endDate)}
                    </Typography>
                    <Collapse in={expandedDescription}>
                        <Typography variant="body2" sx={{ mt: 2, fontSize: '0.7rem' }}>
                            {props.description}
                        </Typography>
                    </Collapse>
                    <Button
                        onClick={handleExpandClick}
                        endIcon={<ExpandMoreIcon />}
                        sx={{ mt: 1, color: '#9b77e6', fontSize: '0.7rem' }}
                    >
                        {expandedDescription ? 'Show Less' : 'Read More'}
                    </Button>
                    <Box
                        sx={{
                            mt: 2,
                            fontSize: '0.7rem',
                            backgroundColor: '#984caf',
                            color: '#ffffff',
                            borderRadius: '10px',
                            padding: '8px',
                            textAlign: 'center',
                        }}
                    >
                        {props.price}$
                    </Box>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="like the vacation" sx={{ color: 'red', fontSize: '0.7rem' }}>
                        <FavoriteIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center' }}>
                        {props.likesCount}
                        {!userLikes ? (
                            <Button onClick={likeHandler} size="small">
                                Like
                            </Button>
                        ) : (
                            <Button onClick={unlikeHandler} size="small">
                                Unlike
                            </Button>
                        )}
                    </Typography>
                </CardActions>


            </Card>
        </div>
    );
}
