export default (theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark
    },
    title: {
        fontFamily: 'Parisienne',
        fontWeight: 700,
        fontSize: 28,
        color: theme.palette.primary.contrastText,
        textDecoration: 'none'
    },
    slider: {
        position: 'absolute',
        right: 0
    }
});