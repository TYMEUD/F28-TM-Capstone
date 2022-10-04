const baseURL = 'https://tm-f28-capstone.herokuapp.com'
// const baseURL = 'http://localhost:5000'

const showResume = document.querySelector('#resumes')
const inputfields = document.querySelector('.input-fields')
const output = document.querySelector('.output')
const addButton = document.querySelector('#addResume')

const displayResume = (arr) => {
    for(let i = 0; 1 < arr.length; i++){
        createResumeCard(arr[i])
    }
}

const createResumeCard = (resume) => {
    const resumeCard = document.createElement('section')
    resumeCard.classList.add(`resume-card`)

    resumeCard.innerHTML = ` <div class="hero" id="card${resume.id}">
    <h1>${inputfields["name"].value}</h1>
    <h3>${inputfields["title"].value}</h3>
   </div>
   <div class="main">
       <div>
         <h2>OBJECTIVE</h2>
         <p>${inputfields["objective"].value}</p>
         <h2>SKILLS</h2>
         <p>${inputfields["skills"].value}</p>
         <h2>ACHIEVEMENTS</h2>
         <p>${inputfields["achievements"].value}</p>
         <h2>CONTACT</h2>
         <p>${inputfields["contact"].value}</p>
       </div>
       <div>
        <h2>WORK EXPERIENCE</h2>
        ${workExpdetails.getData()}
        <h2>ACEMEDIC DETAILS</h2>
         ${Academic.getData()}
        <h2>PROJECTS</h2>
        <p>${inputfields["projects"].value}</p>
        <button onClick="deleteResume(${resume.id})">X</button>
       </div>
        <section>
        </section>
    </div>
   <br></br>
   <br></br>`

   showResume.appendChild(resumeCard)
}

const getAllResumes = () => {
    axios.get(`${baseURL}/getResume`)
        .then((res) => {
            showResume.innerHTML = ''
            console.log(res.data)
        })
}

const deleteResume = (id) => {
    axios.delete(`${baseURL}/deleteResume/${id}`)
            .then((res) => {
            inputfields.style.display = 'block'
            addButton.style.display = 'block'
            let deleteDiv = document.querySelector(`#card${id}`)
            showResume.innerHTML = ''
            displayResume(res.data)
        })
}

// const getResume = () => {
//     axios.get(`${baseURL}/getResume`)
//         .then((res) => {
//             displayResume(res.data)
//             console.log(res.data)
//         }) 
//         .catch((err) => {
//             console.log(err)
//         })  
// }

const addResume = () => {

    let nameInput = document.querySelector('#name')
    let titleInput = document.querySelector('#title')
    let workInput = document.querySelector('#workexp')
    let academicInput = document.querySelector('#academics')
    let objectiveInput = document.querySelector('#objective')
    let skillsInput = document.querySelector('#skills')
    let projectsInput = document.querySelector('#projects')
    let achievementsInput = document.querySelector('#achievements')
    let contactInput = document.querySelector('#contact')

    let newResume = {
        name: nameInput.value,
        title: titleInput.value,
        work: workInput.value,
        academic: academicInput.value,
        objective: objectiveInput.value,
        skills: skillsInput.value,
        projects: projectsInput.value,
        achievements: achievementsInput.value,
        contact: contactInput.value

    }
    axios.post(`${baseURL}/addResume`, newResume)

    .then((res) => {
        console.log(res.data)
        inputfields.style.display = 'none'
        addButton.style.display = 'none'
        showResume.innerHTML = ` <div class="hero" id="card${res.data.id}">
        <h1>${res.data.name}</h1>
        <h3>${res.data.title}</h3>
       </div>
       <section class="main">
           <div>
             <h2>OBJECTIVE</h2>
             <p>${inputfields["objective"].value}</p>
             <h2>SKILLS</h2>
             <p>${inputfields["skills"].value}</p>
             <h2>ACHIEVEMENTS</h2>
             <p>${inputfields["achievements"].value}</p>
             <h2>CONTACT</h2>
             <p>${inputfields["contact"].value}</p>
           </div>
           <div>
            <h2>WORK EXPERIENCE</h2>
            ${workExpdetails.getData()}
            <h2>ACEMEDIC DETAILS</h2>
             ${Academic.getData()}
            <h2>PROJECTS</h2>
            <p>${inputfields["projects"].value}</p>
           </div>
           </section>
           <div class="btn">
           <button id="deletebtn" onclick="deleteResume(${res.data.id})">X</button>
          <button onclick="print()">Print Resume</button>
    </div>`

        nameInput.value = ''
        titleInput.value = ''
        workInput.value = ''
        academicInput.value = ''
        objectiveInput.value = ''
        skillsInput.value = ''
        projectsInput.value = ''
        achievementsInput.value = ''
        contactInput.value = ''

    })
}


addButton.addEventListener('click', addResume)
getAllResumes()

let inputShow = true


async function TextEditor(element){
  const newEditor =  await ClassicEditor
  .create(element,{
    toolbar: [ 'heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote' ],
  } )
  return newEditor
 
}

let workExpdetails;
TextEditor(inputfields["workexp"]).then(nEditor=>{
  workExpdetails = nEditor
})
let Academic;
TextEditor(inputfields["academics"]).then(nEditor=>{
  Academic = nEditor
})



function toggle(){
    if(inputShow){
         inputfields.style.display = "none"
         inputShow = false 
         output.innerHTML=`
           <div class="hero">
            <h1>${inputfields["name"].value}</h1>
            <h3>${inputfields["title"].value}</h3>
           </div>
           <div class="main">
               <div>
                 <h2>OBJECTIVE</h2>
                 <p>${inputfields["objective"].value}</p>
                 <h2>SKILLS</h2>
                 <p>${inputfields["skills"].value}</p>
                 <h2>ACHIEVEMENTS</h2>
                 <p>${inputfields["achievements"].value}</p>
                 <h2>CONTACT</h2>
                 <p>${inputfields["contact"].value}</p>
               </div>
               <div>
                <h2>WORK EXPERIENCE</h2>
                ${workExpdetails.getData()}
                <h2>ACEMEDIC DETAILS</h2>
                 ${Academic.getData()}
                <h2>PROJECTS</h2>
                <p>${inputfields["projects"].value}</p>
               </div>
           </div>
           <div class="btn">
              <button onclick="print()">Print Resume</button>
        </div>
         `
    }else{
        inputfields.style.display =  "block"
        inputShow = true
        output.innerHTML=""
    }
}

