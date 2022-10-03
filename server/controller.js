const info = require('./db.json')
let resumeID = 0

//Get, Post, Put, Delete

module.exports = {
    getResume: (req, res) => {
        res.status(200).send(info)
    },

    addInfo: (req, res) => {
        

    }
}
