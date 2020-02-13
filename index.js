const express = require('express')
const app = express()
const port = 7000
const morgan = require('morgan')

app.use(express.json());
app.use(morgan('dev'));
const dotenv = require('dotenv');
dotenv.config()




const env = process.env.NODE_ENV || 'development';
const dbConnectionString = {
    development: process.env.DB_CONNECTION,
    test: process.env.DB_CONNECTION_TEST,
    staging: process.env.DB_CONNECTION_STAGING,
    production: process.env.DB_CONNECTION_PRODUCTION
}

const mongoose = require('mongoose');
mongoose.connect(dbConnectionString[env], {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=> console.log('Database connected'))
    .catch(err => console.log('Somehow, failed to connect to database!'))

mongoose.set('useFindAndModify', false); 

app.get('/', function(req, res){
    res.status(200).json({
        status: true,
        data: "Test ToDo"
    })
})

const router = require('./router.js');
app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server started at ${Date()}`)
    console.log(`Listening on port ${port}`)
})

module.exports = app