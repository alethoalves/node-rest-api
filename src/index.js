const express = require('express')
const todos = require('./todos/routes')
const errorHandler = require('./middlewares/error')
const app = express()
app.use(express.json())
app.use('/todos',todos)
app.use(errorHandler())
app
    .listen(8080,'0.0.0.0',()=>{
        console.log('server started')
    })
    .once('error',(error)=>{
        console.error
        process.exit(1)
    })


