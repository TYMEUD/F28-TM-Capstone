const express = require('express')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const port = process.env.PORT || 5000
const app = express()


app.use(express.json())
app.use(cors())


const {
    getResume,
    deleteResume,
    addResume
} = require('./controller')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..client/index.html'))
})
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..client/styles.css'))
// })

app.get('/getResume', getResume)
app.delete('/deleteResume/:id', deleteResume)
app.post('/addResume', addResume)

app.listen(port, () => {
    console.log('App running on port ' + port)
})