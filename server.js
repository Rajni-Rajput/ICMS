const express = require('express')
const dotenv =require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

//dot config
dotenv.config()

//to connect to server
mongoose.connect('mongodb://localhost:27017/project') 
const db = mongoose.connection 

db.on('error',(err)=> {
    console.log(err)
})

db.once('open',() => {
    console.log('Connected to MongoDB Database')
})

//rest object
const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev')) //it will display a short msg on console (url,res,time)

app.use('/api/v1/test',require('./routes/testRoutes'))
app.use('/api/v1/auth', require('./routes/authRoutes'))



//port
const PORT = process.env.PORT || 3033;

//listen
app.listen(PORT, ()=> {
    console.log('Server is running on Port:',process.env.PORT);
})