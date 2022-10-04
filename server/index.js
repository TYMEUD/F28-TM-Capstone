const express = require('express')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())


const {
    getResume,
    deleteResume,
    addResume
} = require('./controller')

app.get('/getResume', getResume)
app.delete('/deleteResume/:id', deleteResume)
app.post('/addResume', addResume)

app.listen(4200, () => console.log('App running on port 4200'))