import theLick from '../../assets/transparent_lick.png';

export default (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: -60
    },
    image: {
        backgroundImage: `url(${theLick})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        backgroundColor: theme.palette.primary.landing,
        backgroundPosition: 'center center',
    },
    paper: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        minHeight: '95vh',

    }
});