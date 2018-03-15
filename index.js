const server = require('server')

const {get, post} = server.router

server({port: 8080}, [
    get('/', ctx => 'Hello World!'),
    post('/profile', getProfile),
    post('/profile/update', updateProfile),
    post('/application/getall', getAllApplications),
    post('/application/oversee', getAllOverseenApplications),
    post('/application/applicant', getAllApplicantApplications),
    post('/application/getone', getSingleApplication),
    post('/application/update', updateApplication),
    post('/application/add', createApplication),
    post('/application/delete', deleteApplication),
    post('/animal/getone', getAnimal),
    post('/animal/getall', getAllAnimals),
    post('/animal/delete', deleteAnimal),
    post('/animal/update', updateAnimal),
    post('/animal/add', addAnimal),
    post('/animal/query', queryAnimal),
    post('/animal/allspecies', getSpecies),
    post('/animal/allbreeds', getBreeds)
]);



function getProfile(context) {
    return 500
}

function updateProfile(context) {
    return 500
}

function getAllApplications(context) {
    return 500
}

function getAllOverseenApplications(context) {
    return 500
}

function getAllApplicantApplications(context) {
    return 500
}

function getSingleApplication(context) {
    return 500
}

function updateApplication(context) {
    return 500
}

function createApplication(context) {
    return 500
}

function deleteApplication(context) {
    return 500
}

function getAnimal(context) {
    return 500
}

function getAllAnimals(context) {
    return 500
}

function deleteAnimal(context) {
    return 500
}

function updateAnimal(context) {
    return 500
}

function addAnimal(context) {
    return 500
}

function queryAnimal(context) {
    return 500
}

function getSpecies(context) {
    return 500
}

function getBreeds(context) {
    return 500
}



