const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require("dotenv").config()

connectDb()

const app = express()
const port = process.env.PORT || process.env.PORTALT

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})

// app.get('/api/contact', (req,res) => {
//     // res.send('all contact goes here')
//     res.json({'message': 'all goes here'})
// })

// use this to parse body get from client
// middleware
app.use(express.json())
// use this to parse body get from client

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/stacks", require("./routes/stacksRoutes"))
app.use("/api/jobs", require("./routes/jobRoutes"))

// use this for handling the error
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})