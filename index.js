// Application Level middleware
// Third Party middleware
// Route level middleware
// build-in middleware
// Error-handling middleware

const express = require("express")
const path = require("path")
const routes = express.Router()
const logger = require("morgan")
const multer = require("multer")
const upload = multer({dest:"./public/upload"})

const app = express()

const PORT = 5001

//In Build Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static",express.static(path.join(__dirname,"public")))

//Application level middleware
const loggerMiddleWare = (req,resp,next) => {
    console.log(`${Date()} --- Request ${req.method} ${req.url}`)
    next()
}

app.use(loggerMiddleWare)

//Third Party Middleward
app.use(logger("combined"))

//Router Level MiddleWare
app.use("/api/users",routes)

const fakeAuth = (req,res,next) => {
    const authStatus = true
    if (authStatus) {
        console.log("User AuthStatus:",authStatus)
        next()
    } else {
        res.status(401)
        throw Error("User is UnAuthorized")
    }
}

const getUsers = (req,res) => {
    res.json({message:"Get All Users"})
}

const createUser = (req,res) => {
    console.log("This is Request we got from user ",req.body)
    res.json({message:"Create New Users"})
}

routes.use(fakeAuth)
routes.route("/").get(getUsers).post(createUser)

//Error Handler MiddleWare
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    switch (statusCode) {
        case 401:
            res.json({title:"UnAuthorized",message:err.message})
            break
        case 404:
            res.json({title:"Not Found",message:err.message})
            break
        case 500:
            res.json({title:"Server Error",message:err.message})
            break
        default:
            break
    }
}

//Upload Api
app.post("/upload",upload.single("image"),(req,res,next)=>{
    console.log(req.file,req.body)
},(err,req,res,next)=>{
    res.status(400).send({err:err.message})
})

app.all("*",(req,res)=>{
    res.status(404)

    throw Error("Route Not Found")
})

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`App Running on port ${PORT}`)
})

