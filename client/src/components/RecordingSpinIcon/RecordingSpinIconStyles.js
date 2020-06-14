export default (theme) => ({
    root: {
        paddingTop: 5.5,
        paddingLeft: 0,
        position: 'relative'
    },
    progress: {
        position: 'absolute',
        top: 5.5,
        left: 0,
        zIndex: 1,
        color: theme.palette.error.main
    }
});