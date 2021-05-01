module.exports = {
    db: {
        "host": process.env.HOST_,
        "port": process.env.PORT_,
        "url": process.env.MONGODB_URI,
        "database": process.env.DATABASE,
        "password": process.env.PASSWORD,
        "name": "db",
        "user": process.env.USER,
        "useNewUrlParser": true,
        "connector": "mongodb"
        }
}
