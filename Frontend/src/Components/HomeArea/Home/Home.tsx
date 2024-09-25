import './Home.css';
import { useSelector } from 'react-redux';
import { AppState } from '../../../Redux/store';
import { UserModel } from '../../../Models/UserModel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { notify } from '../../../Utils/notify';

export function Home(): JSX.Element {
    const user = useSelector<AppState, UserModel>((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            notify.error('You must be logged');
        }
    }, [user, navigate]);

    return <div className="Home">Home...</div>;
}