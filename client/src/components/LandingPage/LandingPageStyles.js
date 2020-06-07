import theLick from '../../assets/transparent_lick.png';

export default (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: -35
    },
    image: {
        backgroundImage: `url(${theLick})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '90%',
        backgroundColor: '#434343ff',
        backgroundPosition: 'center center',
    },
    paper: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        minHeight: '100vh',

    }
});