const express = require('express')
var cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require("dotenv").config()

connectDb()



const app = express()
app.use(cors())
const port = process.env.PORT || 3000

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

// form for send questions
app.use("/api/contactform", require("./routes/contactfromRoutes"))

// use this for handling the error
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})