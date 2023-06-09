const express = require('express')
const serverless = require('serverless-http')
var cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require("dotenv").config()
// const ejs = require("ejs")

connectDb()



const app = express()
serverless(app)
app.use(cors())
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORTALT || 3000

app.set("view engine", "ejs")

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
app.use("/api/elections", require("./routes/electionRoutes"))
app.use("/api/provinces", require("./routes/proviceRoutes"))
app.use("/api/upload", require("./routes/uploadRoutes"))

// form for send questions
app.use("/api/contactform", require("./routes/contactfromRoutes"))

// use this for handling the error
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

