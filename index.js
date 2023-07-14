// Application Level middleware
// Third Party middleware
// Route level middleware
// build-in middleware
// Error-handling middleware

const express = require("express")
const routes = express.Router()

const app = express()

const PORT = 5001

//Application level middleware
const loggerMiddleWare = (req,resp,next) => {
    console.log(`${Date()} --- Request ${req.method} ${req.url}`)
    next()
}

app.use(loggerMiddleWare)

//Router Level MiddleWare
app.use("/api/users",routes)

const fakeAuth = (req,res,next) => {
    const authStatus = false
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
    res.json({message:"Create New Users"})
}

routes.use(fakeAuth)
routes.route("/").get(getUsers).post(createUser)

app.listen(PORT, () => {
    console.log(`App Running on port ${PORT}`)
})