const express = require('express')
const dotenv = require("dotenv").config()
const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})