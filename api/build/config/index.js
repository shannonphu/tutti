'use strict';

module.exports = function () {
    switch (process.env.NODE_ENV) {
        case 'development':
        default:
            return {
                // Server settings
                server: {
                    host: 'localhost',
                    port: 8080
                }
            };
    }
}();