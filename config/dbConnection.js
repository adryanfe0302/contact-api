const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        console.log('goes here', process.env.CONNECTION_STRING)
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('connects', connect.connection.host, connect.connection.name);
    } catch(err) {
        console.log('err', err)
        process.exit(1)
    }
}

module.exports = connectDb;