import Typography from "@mui/material/Typography";
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import "./Header.css";

export function Header(): JSX.Element {
    return (
        <div className="Header">
            <UserMenu />
            <Typography variant="h2" component="h2">
                Vacation Site
            </Typography>

        </div>
    );
}
