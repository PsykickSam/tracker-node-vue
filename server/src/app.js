const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const route = require('./routes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')
route(app)

sequelize.sync({force: false}) // {force: true} -> to delete and recraete the database
    .then(() => {
        app.listen(config.port)
        console.log("Server started on PORT " + config.port)
    })
