const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConnect = require('./dbConfig/dbConfig')
const authRoutes = require('./routes/authRoutes')
const chatRoutes = require('./routes/chatRoutes')



const app = express()
dbConnect()
app.use(express.json())
app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)

const port = process.env.PORT||4000
app.listen(port,()=>{
    console.log('Server is live on PORT : ',port)
})