const mongoose = require("mongoose") 

module.exports = () => {

mongoose.connect("mongodb+srv://ecommerce-prakash.bybdb3e.mongodb.net/",
{
    dbName:'Ecommerce-Prakash',
    user:"admin",
    pass:'admin',
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Mongodb connected....")
}).catch((error) => {
    console.log(error.message)
})

mongoose.connection.on('connected',()=> {
    console.log("Mongoose connected to db...")
})

mongoose.connection.on('error', (err)=> {
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=> {
    console.log("Mongoose connection in disconned ....")
})

process.on('SIGINT',()=>{
    mongoose.connection.close(()=>
        console.log("mongoose connection is disconned....")
    )
    process.exit(0)
})

}