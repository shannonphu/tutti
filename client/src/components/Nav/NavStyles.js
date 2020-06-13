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
    rightRail: {
        paddingTop: '12px',
        position: 'absolute',
        right: 12
    },
    slider: {
        display: 'inline-block'
    },
    aboutButton: {
        display: 'inline-block'
    },
    clickTrack: {
        display: 'inline-block'
    }
});