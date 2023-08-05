const mongoose = require("mongoose")
mongoose.set("strictQuery",true)

async function connectToMongooseDB(url) {
    return mongoose.connect(url)
}

module.exports = {
    connectToMongooseDB,
}