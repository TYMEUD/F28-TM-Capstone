const resumes = require('./db.json')
let resumeId = 0

//Get, Post, Delete

module.exports = {
    getResume: (req, res) => {
        res.status(200).send(resumes)
    },

    addResume: (req, res) => {

        const {name, title, workexp, academic , objective, skills, projects, achievements, contact } = req.body
        console.log(req.body)
        let newResumeObject = {
          id: resumeId,
          name: name,
          title: title,
          workexp: workexp,
          academic: academic,
          objective: objective,
          skills: skills,
          projects: projects,
          achievements: achievements,
          contact: contact

        }

        resumes.push(newResumeObject)

        resumeId++
        
        res.status(200).send(resumes[1])

    },

    deleteResume: (req, res) => {
        const index = resumes.findIndex(el => el.id === +req.params.id)

        resumes.splice(index, 1)

        res.status(200).send(resumes)

    }
}
