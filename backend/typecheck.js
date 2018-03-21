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
        case 'emailId':
            checkEmailID(value)
            break
        case 'userType':
            checkUserType(value)
            break
        default:
            throw Error(`Internal error: Parameter ${param} is unknown!`)
    }
}

function checkEmailID(val) {
    // I'm not going to be terribly strict about emails
    // it's not worth the headache
    if (typeof(val) !== typeof('string')) {
        throw Error(`Parameter checkEmailID must be a string!`)
    }
}

function checkUserType(val) {
    //console.log(val)
    if (val !== 'applicant' && val !== 'staff') {
        throw Error(`Parameter userType must have value "applicant" or "staff"`)
    }
}



module.exports = 
{
    testParams: (object, params) => {
        if (!hasParams(object, params)) {
            throw Error(`The body does not have all parameters: ${params}`)
        }
        params.forEach(param => {
            checkParamType(param, object[param])
        })
    }
}
