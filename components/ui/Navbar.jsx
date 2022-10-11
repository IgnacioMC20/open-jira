import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import { UIContext } from "../../context/ui";

export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext);

    return (
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <IconButton onClick={openSideMenu}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    OpenJira
                </Typography>
            </Toolbar>

            {/* Para cambiar el tema [ dark | light ] */}
            {/* <IconButton sx={{
                position: 'fixed',
                right: 30,
                bottom: 30,
                backgroundColor: "error.dark"
            }}>
                <DarkMode />
                <LightMode />
            </IconButton> */}
        </AppBar>
    )
}
