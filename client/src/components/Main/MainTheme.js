import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#7fa8ad',
            main: '#698B8F',
            dark: '#48858c'
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#F5F1E3',
            main: '#f5ecce',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#DE483F',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

export default theme;