const typecheck = require('./typecheck')
const utils = require('./utils')
var mysql = require('mysql')
const server = require('server')
const {get, post, error} = server.router
const {header, send, status} = server.reply;

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root', //LEARN WTF TO PUT HERE
    password: '', //CONFIG FILES ARE FOR THE WEAK+
    database: 'furriends'
})

connection.connect(err => {
    if (err) {
        console.error('Coult not connect to mysql')
        console.error(err.stack)
    }
})

const cors = [
    ctx => header("Access-Control-Allow-Origin", "*"),
    ctx => header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
];

server(
    {
        port: 8080,
        security: false
    }, 
    cors,
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

function getProfile(context) {
    console.log('getProfile')
    typecheck.testParams(context.body, ['phone', 'userType'])
    
    phone = context.body['phone']
    userType = context.body['userType']
    queryString = ''

    if (userType === 'applicant') {
        queryString = `SELECT name, phone FROM Applicant WHERE phone="${phone}"`
    }
    else {
        queryString = `SELECT name, phone FROM Staff WHERE phone="${phone}"`
    }
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        if (results.length > 0) {
            results[0]['userType'] = userType
            return status(200).send(results[0])
        }
        else {
            return status(400)
        }
    })
}

function getAllApplications(context) {
    console.log('getAllApplications')

    queryString = `SELECT home_type, budget, pets, status, animal_id, application_id FROM Application`
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        output = results.map(utils.renameApplicationFields)
        return status(200).send(output)
    })
}

function getAllOverseenApplications(context) {
    console.log('getAllOverseenApplications')
    typecheck.testParams(context.body, ['staffId'])
    
    staffId = context.body['staffId']

    queryString = `SELECT home_type, budget, pets, status, animal_id, application_id FROM Application WHERE staff_id=${staffId}`
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        output = results.map(utils.renameApplicationFields)
        return status(200).send(output)
    })
}

function getAllApplicantApplications(context) {
    console.log('getAllApplicantApplications')
    typecheck.testParams(context.body, ['applicantId'])
    
    applicantId = context.body['applicantId']

    queryString = `SELECT home_type, budget, pets, status, animal_id, application_id FROM Application WHERE applicant_id=${applicantId}`
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        output = results.map(utils.renameApplicationFields)
        return status(200).send(output)
    })
}

function getSingleApplication(context) {
    console.log('getSingleApplication')
    typecheck.testParams(context.body, ['applicationId'])

    applicationId = context.body['applicationId']
    queryString = `SELECT home_type, budget, pets, status, animal_id, application_id FROM Application WHERE application_id=${applicationId}`
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        if (results.length > 0) {
            output = utils.renameApplicationFields(results[0])
            return status(200).send(output)
        }
        else {
            return status(400)
        }
    })
}

function deleteApplication(context) {
    console.log('deleteApplication')
    typecheck.testParams(context.body, ['animalId'])
    
    //TODO: clarify request params

    return status(500)
}
 
function getAnimal(context) {
    console.log('getAnimal')
    typecheck.testParams(context.body, ['animalId'])

    animalId = context.body['animalId']

    queryString = `SELECT img_url, birthdate, animal_id, sex, weight, Animal.name, special_needs, intake_date, fee FROM Animal INNER JOIN Species ON Animal.species_id=Species.species_id WHERE animal_id=${animalId}`

    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        if (results.length > 0) {
            output = utils.renameAnimalFields(results[0])
            return status(200).send(output)
        }
        else {
            return status(400)
        }
    })
}

function getAllAnimals(context) {
    console.log('getAllAnimals')


    queryString = `SELECT img_url, birthdate, animal_id, sex, weight, Animal.name, special_needs, intake_date, fee FROM Animal INNER JOIN Species ON Animal.species_id=Species.species_id`

    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        output = results.map(utils.renameAnimalFields)
        return status(200).send(output)
    })
}

function queryAnimals(context) {
    console.log('queryAnimals')
    typecheck.testParams(context.body, ['query'])

    query = context.body['query']


}

function deleteAnimal(context) {
    console.log('deleteAnimal')
    typecheck.testParams(context.body, ['animalId'])

    animalId = context.body['animalId']
    queryString = `DELETE FROM Animal WHERE animal_id=${animalId}`

    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log(results)
        //TODO: learn how to handle success
        return status(500)
    })
}

function updateAnimal(context) {
    console.log('updateAnimal')
    typecheck.testParamsLazy(context.body, ['animalId', 'imgUrl', 'birthdate', 'weight', 'animalName', 'specialNeeds', 'intakeDate', 'sex'])

    animalId = context.body['animalId']

    primaryQueryString = `SELECT * from Animal WHERE animal_id=${animalId}`

    return new Promise( (fulfill, reject) => {
        connection.query(primaryQueryString, (error, results, fields) => {
            if (error) {
                reject({status: 500, val: error})
            }
            else {
                if (results.length > 0) {
                    fulfill(results[0])
                }
                else {
                    reject({status: 400, val: `Animal with animal_id=${animalId} not found!`})
                }
            }
        })
    }).then((res) => {
        return new Promise((fulfill, reject) => {
            originalAnimal = utils.renameAnimalFields(res)
            
            //TODO: fix dates getting broken af

            imgUrl = context.body['imgUrl'] ? context.body['imgUrl'] : originalAnimal.imgUrl
            birthdate = context.body['birthdate'] ? context.body['birthdate'] : originalAnimal.birthdate
            weight = context.body['weight'] ? context.body['weight'] : originalAnimal.weight
            animalName = context.body['name'] ? context.body['name'] : originalAnimal.name
            specialNeeds = context.body['specialNeeds'] ? context.body['specialNeeds'] : originalAnimal.specialNeeds
            intakeDate = context.body['intakeDate'] ? context.body['intakeDate'] : originalAnimal.intakeDate
            sex = context.body['sex'] ? context.body['sex'] : originalAnimal.sex

            queryString = `UPDATE Animal SET img_url="${imgUrl}", birthdate="${birthdate}", weight=${weight}, name="${animalName}", special_needs="${specialNeeds}", intake_date="${intakeDate}", sex="${sex}" WHERE animal_id=${animalId}`
            
            connection.query(queryString, (error, results, fields) => {
                if (error) {
                    reject({status: 500, val: error})
                }
                else {
                    fulfill(results)
                }
            })
        })
    }).then((res) => {
        return new Promise((fulfill, reject) => {
            console.log(res)
            connection.query(primaryQueryString, (error, results, fields) => {
                if (error) {
                    reject({status: 500, val: error})
                }
                else {
                    if (results.length > 0) {
                        output = utils.renameAnimalFields(results[0])
                        fulfill(status(200).send(output))
                    }
                    else {
                        reject({status: 400, val: ''})
                    }
                }
            })
        })
    }).catch((err) => {
        return status(err.status).send(err.val.toString()) 
    })
}


