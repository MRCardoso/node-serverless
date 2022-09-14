const _LambdaResponse = (status:number, value:any) => {
    return {
        statusCode: status,
        body: JSON.stringify(status !== 200 ? {errors: value} : value),
    }
}

const _LambdaValidator = (action: string, event: any) => {
    switch(action) {
        case "create":
            return event.hasOwnProperty("body")
        case "update":
            return (event.hasOwnProperty('body') && event.hasOwnProperty('pathParameters') && event.pathParameters.hasOwnProperty('id'))
        case "delete":
            return (event.hasOwnProperty('pathParameters') && event.pathParameters.hasOwnProperty('id'))
        case "byId":
            return (event.hasOwnProperty('pathParameters') && event.pathParameters.hasOwnProperty('id'))
        case "list":
            return true
    }
    return false
}

const _stringToJson = (string:any) => {
    try {
        if (typeof string === "string") {
            return JSON.parse(string)
        } else {
            return string
        }
    } catch (error) {
        return null
    }
}

const _getTableFromEnv = () => {
    if (process.env.NODE_ENV === 'test') {
        return process.env.AWS_DYNAMODB_TABLE_TEST
    }
    return process.env.AWS_DYNAMODB_TABLE
}

export const LambdaResponse = _LambdaResponse
export const LambdaValidator = _LambdaValidator
export const stringToJson = _stringToJson
export const getTableFromEnv = _getTableFromEnv