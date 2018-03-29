const typecheck = require('./typecheck')
const utils = require('./utils')
const refresh = require('./furriends')
var mysql = require('mysql')
const server = require('server')
const {get, post, error} = server.router
const {header, send, status} = server.reply;

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root', //LEARN WTF TO PUT HERE
    password: 'Fuel4Rocket', //CONFIG FILES ARE FOR THE WEAK+
    database: 'furriends'
})

connection.connect(err => {
    if (err) {
        console.error('Could not connect to mysql')
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
        security: false,
        //security: {csrf: false}
    }, 
    cors,
    [
        //post('/reseed', refreshTables),
        post('/profile', getProfile),
        post('/application/getall', getAllApplications),
        post('/application/oversee', getAllOverseenApplications),
        post('/application/applicant', getAllApplicantApplications),
        post('/application/getone', getSingleApplication),
        post('/application/query', queryApplication),
        post('/animal/getone', getAnimal),
        post('/animal/getall', getAllAnimals),
        post('/animal/delete', deleteAnimal),
        post('/animal/querydelete', queryDeleteAnimal),
        post('/animal/update', updateAnimal),
        post('/animal/query', queryAnimals),
        post('/animal/popularity', queryAnimalPopularity),
        post('/locations/allbreeds', queryLocationBreeds),
        post('/locations/query', queryCity),
        post(context => status(404)),
        error(context => status(500).send(context.error.message))
    ]
);

function refreshTables(context) {
    //TODO ?
}

function getProfile(context) {
    console.log('getProfile...')
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
        console.log('getProfile successful')
        if (results.length > 0) {
            results[0]['userType'] = userType
            return status(200).send(results[0])
        }
        else {
            return status(400).send(`User of type "${userType}" with phone number "${phone}" not found!`)
        }
    })
}

function getAllApplications(context) {
    console.log('getAllApplications...')

    queryString = `SELECT home_type, budget, pets, status, animal_id, application_id FROM Application`
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log('getAllApplications successful')
        output = results.map(utils.renameApplicationFields)
        return status(200).send(output)
    })
}

function getAllOverseenApplications(context) {
    console.log('getAllOverseenApplications...')
    typecheck.testParams(context.body, ['phone'])
    
    phone = context.body['phone']

    queryString = `SELECT home_type, budget, pets, status, animal_id, application_id FROM Application INNER JOIN Staff ON Application.staff_id=Staff.staff_id WHERE phone="${phone}"`
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        if (results.length > 0) {
            console.log('getAllOverseenApplications successful')
            output = results.map(utils.renameApplicationFields)
            return status(200).send(output)
        }
        else {
            return status(400).send(`No application exists for overseer with phone number "${phone}"`)
        }
    })
}

function getAllApplicantApplications(context) {
    console.log('getAllApplicantApplications...')
    typecheck.testParams(context.body, ['phone'])

    
    phone = context.body['phone']

    queryString = `SELECT home_type, budget, pets, status, animal_id, application_id FROM Application INNER JOIN Applicant ON Application.applicant_id=Applicant.applicant_id WHERE phone="${phone}"`
    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        if (results.length > 0) {
            console.log('getAllApplicantApplications successful')
            output = results.map(utils.renameApplicationFields)
            return status(200).send(output)
        }
        else {
            return status(400).send(`No application exists for applicant with phone number "${phone}"`)
        }
    })
}

function getSingleApplication(context) {
    console.log('getSingleApplication...')
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
        console.log('getSingleApplication successful')
        if (results.length > 0) {
            output = utils.renameApplicationFields(results[0])
            return status(200).send(output)
        }
        else {
            return status(400).send(`No application with id ${applicationId} exists`)
        }
    })
}

function queryApplication(context) {
    console.log('queryApplication')
    //TODO: determine what "input" means
    typecheck.testParams(context.body, ['columns', 'type', 'input'])

    columns = context.body['columns']
    type = context.body['type']
    input = context.body['input']

    columnString = columns.reduce( (accumulator, val) => {
        if (accumulator === '') {
            return val
        }
        else {
            return `${accumulator}, ${val}`
        }
    })

    equalityString = type === 'application_id' ? `application_id=${input}` : `animal_id=${input}`

    queryString = `SELECT ${columnString} FROM Application WHERE ${equalityString}`

    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        if (results.length > 0) {
            console.log('queryApplication successful')
            output = results.map(utils.renameApplicationFields)
            return status(200).send(output)
        }
        else {
            return status(400).send(`No Applications found!`)
        }
    })
}
 
function getAnimal(context) {
    console.log('getAnimal...')
    typecheck.testParams(context.body, ['animalId'])

    //TODO: check if the key animalId should be used
    // I think it is ok
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
        console.log('getAnimal successful')
        if (results.length > 0) {
            output = utils.renameAnimalFields(results[0])
            return status(200).send(output)
        }
        else {
            return status(400).send(`No animal with id ${animalId} exists`)
        }
    })
}

function getAllAnimals(context) {
    console.log('getAllAnimals...')


    queryString = `SELECT img_url, birthdate, animal_id, sex, weight, Animal.name, special_needs, intake_date, fee FROM Animal INNER JOIN Species ON Animal.species_id=Species.species_id`

    
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log('getAllAnimals successful')
        output = results.map(utils.renameAnimalFields)
        return status(200).send(output)
    })
}

function queryAnimals(context) {
    console.log('queryAnimals...')
    typecheck.testParams(context.body, ['query'])

    query = context.body['query']

    //TODO: BRIAN
    queryString = `SELECT img_url, birthdate, sex, weight, name, special_needs, intake_date FROM Animal WHERE species_id IN (SELECT DISTINCT species_id FROM Species WHERE fee=${query}(fee))`

    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log('queryAnimals successful')
        output = results.map(utils.renameAnimalFields)
        return status(200).send(output)
    })
}

function queryAnimalPopularity(context) {
    console.log('queryAnimalPopularity')

    //TODO: BRIAN
    queryString1 = `SELECT name, breed, MAX(B.avgApplication) FROM Species natural join (
        SELECT species_id, AVG(A.numApplication) as avgApplication FROM Animal natural join (
        SELECT animal_id, COUNT(animal_id) as numApplication FROM Application WHERE status!="rejected" GROUP BY animal_id) AS A
        group by species_id) as B;`

    queryString2 = `SELECT name, breed, MIN(B.avgApplication) FROM Species natural join (
        SELECT species_id, AVG(A.numApplication) as avgApplication FROM Animal natural join (
        SELECT animal_id, COUNT(animal_id) as numApplication FROM Application WHERE status!="rejected" GROUP BY animal_id) AS A
        group by species_id) as B;`

    return new Promise( (fulfill, reject) => {
        connection.query(queryString1, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log('queryAnimalPopularity successful')
        console.log(results)
        return status(200).send(results)
    })
}

function queryLocationBreeds(context) {
    console.log('queryLocationBreeds...')
    queryString = `SELECT name, address, city FROM Branch NATURAL JOIN Location AS B WHERE NOT EXISTS (SELECT DISTINCT species_id FROM Species WHERE species_id NOT IN (SELECT DISTINCT species_id FROM Animal WHERE Animal.location_id=B.location_id))`

    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log('queryLocationBreeds successful')
        return status(200).send(results)
    })

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
        console.log('deleteAnimal successful')
        return status(200)
    })
}

function queryDeleteAnimal(context) {
    console.log('queryDeleteAnimal')
    typecheck.testParams(context.body, ['name'])

    name = context.body['name']
    queryString = `DELETE FROM Animal WHERE name="${name}"`
    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log('queryDeleteAnimal successful')
        if (results.affectedRows == 0) {
            return status(400).send(`QueryDelete found no animals with name "${name}"`)
        }
        else {
            return status(200)
        }
    })
}

function updateAnimal(context) {
    console.log('updateAnimal...')
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

            imgUrl = context.body['imgUrl'] ? context.body['imgUrl'] : originalAnimal.imgUrl
            //birthdate = context.body['birthdate'] ? context.body['birthdate'] : originalAnimal.birthdate
            //dirty fix for dates being broken af
            birthdate = originalAnimal.birthdate
            weight = context.body['weight'] ? context.body['weight'] : originalAnimal.weight
            animalName = context.body['animalName'] ? context.body['animalName'] : originalAnimal.name
            specialNeeds = context.body['specialNeeds'] ? context.body['specialNeeds'] : originalAnimal.specialNeeds
            //intakeDate = context.body['intakeDate'] ? context.body['intakeDate'] : originalAnimal.intakeDate
            intakeDate = originalAnimal.intakeDate
            sex = context.body['sex'] ? context.body['sex'] : originalAnimal.sex

            queryString = `UPDATE Animal SET img_url="${imgUrl}", weight=${weight}, name="${animalName}", special_needs="${specialNeeds}", sex="${sex}" WHERE animal_id=${animalId}`
            
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
            console.log('updateAnimal successful')
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
                        reject({status: 400, val: `Animal with animal_id=${animalId} not found!`})
                    }
                }
            })
        })
    }).catch((err) => {
        return status(err.status).send(err.val.toString()) 
    })
}

function queryCity(context) {
    console.log("queryCity...") 

    cityName = context.body['cityName']

    queryString = `select * from Location where city="${cityName}"`

    return new Promise( (fulfill, reject) => {
        connection.query(queryString, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            fulfill(results)
        })
    }).then((results) => {
        console.log('queryCity successful')
        if (results.length > 0) {
            return status(200).send(results)
        }
        else {
            return status(400).send(`No locations found for city ${cityName}`)
        }
    })
}


