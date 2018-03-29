function hasParams(object, params) {
    const keys = Object.keys(object)
    for (val in params) {
        const nextParam = params[val]
        if (keys.indexOf(nextParam) < 0) {
            return false
        }
    }
    return true
}

function checkParamType(param, value) {
    switch(param) {
        case 'animalId':
            checkId(param, value)
            break
        case 'animalName':
            checkGenericString(param, value)
            break
        case 'applicationId':
            checkId(param, value)
            break
        case 'birthdate':
            checkBirthdate(value)
            break
        case 'columns':
            checkColumns(value)
            break
        case 'emailId':
            checkGenericString(param, value)
            break
        case 'imgUrl':
            checkGenericString(param, value)
            break
        case 'input':
            checkId(param, value)
            break
        case 'name':
            checkGenericString(param, value)
            break
        case 'phone':
            checkPhone(value)
            break
        case 'query':
            checkGenericString(param, val)
            break
        case 'sex':
            checkGenericString(param, val)
            break
        case 'specialNeeds':
            checkGenericString(param, value)
            break
        case 'staffId':
            checkId(param, value)
            break
        case 'userType':
            checkUserType(value)
            break
        case 'type':
            checkType(value)
            break
        case 'weight':
            checkId(param, value)
            break
        default:
            throw Error(`Internal error: Parameter ${param} is unknown!`)
    }
}

function checkBirthdate(val) {
    //TODO: check birthdates
}

function checkColumns(val) {
    if (typeof(val) !== typeof([])) {
        throw Error(`Columns is incorrect type!`)
    }
    else if (val.length === 0) {
        throw Error(`Columns cannot be empty!`)
    }
}

function checkGenericString(param, val) {
    // I'm not going to be terribly strict about some strings
    // it's not worth the headache
    if (typeof(val) !== typeof('string')) {
        throw Error(`Parameter ${param} must be a string!`)
    }
}

function checkId(param, val) {
    val = val.toString()
    if (val.match(/^[0-9]+$/) === null) {
        throw new Error(`Parameter ${param} must be a number!`)
    }
}

function checkPhone(val) {
    if (typeof(val) !== typeof('string')) {
        throw Error(`Parameter phone must be a string!`)
    }
    if (val.length !== 10 || val.match(/^[0-9]+$/) === null) {
        throw Error(`Parameter phone must be a 10-digit number!`)
    }
}

function checkQuery(val) {
    if (val !== 'min' && val !== 'max' && val !== 'avg') {
        throw Error(`Parameter query must be "min", "max", or "avg"`)
    }
}

function checkType(val) {
    if(val !== 'animal_id' && val !== 'application_id') {
        throw Error(`Parameter type myst be "animal_id" or "application_id"`)
    }
}

function checkUserType(val) {
    if (val !== 'applicant' && val !== 'staff') {
        throw Error(`Parameter userType must have value "applicant" or "staff"`)
    }
}

function checkWeight(val) {
    val = val.toString()
    if (val.match(/^[0-9]+$/) === null) {
        throw Error(`Parameter weight must be a number!`)
    }
    if (parseInt(val) <= 0 || parseInt(val) >= 250) {
        throw Error(`Parameter weight must be reasonable (1-250)!`)
    }
}



module.exports = 
{
    hasAllParams: hasParams,
    testParams: (object, params) => {
        if (!hasParams(object, params)) {
            throw Error(`The body does not have all parameters: ${params}`)
        }
        params.forEach(param => {
            checkParamType(param, object[param])
        })
    },
    testParamsLazy: (object, params) => {
        params.forEach(param => {
            if (object[param]) {
                checkParamType(param, object[param])
            }
        })
    }
}
