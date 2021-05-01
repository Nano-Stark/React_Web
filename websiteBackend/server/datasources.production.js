const { host_, port_, mongouri, database_, password_, user_ } = require("./config");

module.exports = {
    "db": {
        "host": host_,
        "port": port_,
        "url": mongouri,
        "database": database_,
        "password": password_,
        "name": "db",
        "user": user_,
        "useNewUrlParser": true,
        "connector": "mongodb"
        } 
}