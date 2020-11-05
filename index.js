const express= require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000
const {mongoURI} = require('./keys')


require('./models/User'); //Keep this always on top.
const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)


mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=> {
    console.log("Connected to MongoDB")
})

mongoose.connection.on('error',(err)=> {
    console.log("Error- Not connected", err)
})

app.get('/', requireToken,(req, res)=> {
    res.send("Your Email is "+ req.user.email)
})

app.listen(PORT,()=>{
    console.log("server running "+PORT)
})