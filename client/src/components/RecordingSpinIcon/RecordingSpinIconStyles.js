export default (theme) => ({
    root: {
        paddingTop: 0,
        paddingLeft: 0
    },
    progress: {
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 1,
        color: theme.palette.error.main
    }
});