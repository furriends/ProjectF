const typecheck = require('./typecheck')
var mysql = require('mysql')
const server = require('server')
const {get, post, error} = server.router
const {status} = server.reply;


function getProfile(context) {
    console.log('getProfile')
    typecheck.testParams(context.body, ['emailId', 'userType'])

    return 500
}

function getAllApplications(context) {
    console.log('getAllApplications')
    
    return 500
}

function getAllOverseenApplications(context) {
    console.log('getAllOverseenApplications')
    typecheck.testParams(context.body, ['staffid'])

    return 500
}

function getAllApplicantApplications(context) {
    console.log('getAllApplicantApplications')
    typecheck.testParams(context.body, ['applicantId'])

    return 500
}

function getSingleApplication(context) {
    console.log('getSingleApplication')
    typecheck.testParams(context.body, ['applicationId'])

    return 500
}

function deleteApplication(context) {
    console.log('deleteApplication')
    typecheck.testParams(context.body, ['animalId'])

    return 500
}
 
function getAnimal(context) {
    console.log('getAnimal')
    typecheck.testParams(context.body, ['animalId'])

    return 500
}

function getAllAnimals(context) {
    console.log('getAllAnimals')

    return 500
}

function deleteAnimal(context) {
    console.log('deleteAnimal')
    typecheck.testParams(context.body, ['animalId'])

    return 500
}

function updateAnimal(context) {
    console.log('updateAnimal')
    typecheck.testParams(context.body, ['animalId', 'imgUrl', 'birthdate', 'weight', 'animalName', 'specialNeeds', 'intakeDate', 'sex'])

    return 500
}

var connection = mysql.createConnection({
    host: 'localhost',
    port: 'TODO',
    user: 'TODO', //LEARN WTF TO PUT HERE
    password: 'TODO', //CONFIG FILES ARE FOR THE WEAK
    database: 'TODO'
})

connection.connect(err => {
    if (err) {
        console.error('Coult not connect to mysql')
        console.error(err.stack)
    }
})

server(
    {
        port: 8080,
        security: false
    }, 
    [
        post('/profile', getProfile),
        post('/application/getall', getAllApplications),
        post('/application/oversee', getAllOverseenApplications),
        post('/application/applicant', getAllApplicantApplications),
        post('/application/getone', getSingleApplication),
        post('/application/delete', deleteApplication),
        post('/animal/getone', getAnimal),
        post('/animal/getall', getAllAnimals),
        post('/animal/delete', deleteAnimal),
        post('/animal/update', updateAnimal),
        error(context => status(500).send(context.error.message))
    ]
);
