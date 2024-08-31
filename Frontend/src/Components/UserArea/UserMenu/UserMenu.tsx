import { useSelector } from "react-redux";
import "./UserMenu.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/notify";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function UserMenu(): JSX.Element {
    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    function logout() {
        userService.logout();
        notify.success("Bye bye");
        navigate('/login'); // Redirect to login after logout
    }

    return (
        <div className="UserMenu">
            {!user && (
                <Box sx={{ flexGrow: 1, }}>
                    <AppBar position="static" sx={{ borderRadius: "10px" }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>

                            <Button color="inherit" >
                                <NavLink
                                    to="/login"
                                    style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif' }}
                                >
                                    <Typography variant="subtitle1">Please log in</Typography>
                                </NavLink>
                            </Button>
                            <Typography variant="subtitle1">|</Typography>
                            <Button color="inherit" >
                                <NavLink
                                    to="/register"
                                    style={{ textDecoration: 'none', color: 'inherit', fontFamily: 'Roboto, sans-serif' }}
                                >
                                    <Typography variant="subtitle1"> Register</Typography>
                                </NavLink>
                            </Button>
                        </Box>
                    </AppBar>
                </Box >
            )} {user && (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
                        <Typography variant="h6">Hello {user.firstName} {user.lastName}</Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Box>

                </>
            )}
        </div >
    );
}