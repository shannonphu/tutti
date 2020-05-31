module.exports = (() => {
    switch (process.env.NODE_ENV) {
    case 'development':
    default:
        return {
            // Server settings
            server: {
                host: 'localhost',
                port: 8080
            },
            client: {
                internalHost: 'localhost',
                externalHost: 'tut.ti',
                port: 3000
            }
        };
    }
})();