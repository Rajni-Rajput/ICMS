const express = require('express')
const dotenv =require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJSDocs = YAML.load('api.yaml')


const options = {
    definition: {
        openapi: '3.0.0',
        info : {
            title: 'Swagger in Nodejs project',
            description: 'This is my api-documentation file.',
            version  : '1.0.0'
        },
        servers: [
            {
                url  :'http://localhost:3033/',
                description: 'Local server'
            }
        ]
    },
    apis: ['./routes/testRoutes','./routes/authRoutes','./routes/policyRoutes']
}



//dot config
dotenv.config()
//to connect to server
mongoose.connect(process.env.MONGO_URL) 
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
app.use('/api/v1/view',require('./routes/policyRoutes'))

const PORT = process.env.PORT || 3033;//port
app.listen(PORT, ()=> { //listen
    console.log('Server is running on Port:',process.env.PORT);
})


const swaggerSpec = swaggerJSDoc(options)
console.log(swaggerSpec)
console.log(swaggerJSDocs)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec,{ swaggerOptions: { spec: swaggerJSDocs, url: '/api-docs' } }))


