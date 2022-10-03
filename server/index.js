const express = require('express')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())


const {
    getResume,

} = require('./controller')

app.get('/getResume', getResume)

app.listen(4200, () => console.log('App running on port 4200'))