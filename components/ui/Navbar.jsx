import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import { UIContext } from "../../context/ui";
import { useRouter } from "next/router";
import NextLink from "next/link";

export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext);
    const router = useRouter()

    return (
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <IconButton onClick={openSideMenu}>
                    <MenuIcon />
                </IconButton>
                <NextLink href='/' passHref>
                    <Link underline="none" color='white'>
                        <Typography variant="h6" onClick={() => router.push('/')} sx={{ cursor: 'pointer' }}>
                            OpenJira
                        </Typography>
                    </Link>
                </NextLink>
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
