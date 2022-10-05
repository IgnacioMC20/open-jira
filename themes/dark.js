import { createTheme } from "@mui/material";
import { purple, red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: purple[700],
        },
        secondary: {
            main: purple[900],
        },
        error: {
            main: red[900],
        }
    },
    components: {
        MuiAppBar: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148c'
                }
            }
        }
    }
});