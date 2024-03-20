// TODO: When we obtain the logo from Graphic Designer, get the palettes of the logo and use as primary and secondary for the website
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: "#9195F6"
        },
        secondary: {
            main: "#B7C9F2"
        },
    },
});

export default theme;