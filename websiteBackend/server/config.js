dotenv = require('dotenv').config({path: './.env'});

module.exports = {
    user_: process.env.USER,
    password_: process.env.PASSWORD,
    mongouri: process.env.MONGODB_URI,
    environ: process.env.NODE_ENV,
    database_: process.env.DATABASE,
    hot: process.env.HOT,
    port_: process.env.PORT_,
    host_: process.env.HOST_//be careful here as it overrides port and host in config.json
}