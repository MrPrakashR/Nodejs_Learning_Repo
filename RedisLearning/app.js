const express = require("express")
const axios = require("axios")
const redis = require("redis")
const responseTime = require("response-time")
const {promisify} = require("util")

const app = express()
app.use(responseTime())

const client = redis.createClient({
    legacyMode: true,
    host:"127.0.0.1",
    port:6379,
})
client.connect().catch(console.error)

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

app.get("/rockets",async (req,res,next)=>{
    try {
      const reply = await GET_ASYNC('rockets')
      if (reply) {
        console.log('using cached data')
        res.send(JSON.parse(reply))
        return
      }

      const response = await axios.get("https://api.spacexdata.com/v3/rockets")
      const saveResult = await SET_ASYNC(
        "rockets",
        JSON.stringify(response.data),
        'EX',
        5) //5 is in seconds 
      console.log('new data cached',saveResult)
      res.send(response.data)	    
    } catch (error) {
	res.send(error.message)
    }
})

app.get("/rockets/:rocket_id",async (req,res,next) => {
  try {
    const {rocket_id} = req.params
    const reply = await GET_ASYNC(rocket_id)
    if (reply) {
      console.log('using cached data')
        res.send(JSON.parse(reply))
        return
    }
    const url = `https://api.spacexdata.com/v3/rockets/${req.params.rocket_id}`
    const response = await axios.get(url)

    const saveResult = await SET_ASYNC(
      rocket_id,
      JSON.stringify(response.data),
      'EX',
      5
    )
    console.log("new Record cached",saveResult)
    res.send(response.data)
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(4000,()=>{console.log("Rocket running on server 4000")})
