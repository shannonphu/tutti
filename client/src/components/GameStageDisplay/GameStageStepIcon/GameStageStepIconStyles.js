export default (theme) => ({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: theme.palette.primary.light,
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
    },
    completed: {
        color: theme.palette.primary.dark,
        zIndex: 1,
        fontSize: 18,
    }
});