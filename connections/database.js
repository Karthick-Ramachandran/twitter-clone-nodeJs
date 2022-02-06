const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }
    connect() {
        mongoose.connect(`${process.env.mongo_uri}`).then(() => {
            console.log('Database connection successful')
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = new Database();