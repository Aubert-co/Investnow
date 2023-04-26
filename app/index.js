const express = require('express')
const app = express()
const route = require('./controller/route')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(route)

app.listen(8081,()=>{
    console.log('running at port 8081')
})

module.exports = app