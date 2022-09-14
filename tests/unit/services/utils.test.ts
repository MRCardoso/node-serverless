import {stringToJson, LambdaResponse, LambdaValidator, getTableFromEnv} from "../../../src/services/utils"

describe('Utils', () => {
    test('JSON invalid', async () => {
        expect(stringToJson("{'teste': 'teste';}")).toBe(null)
    })

    test('JSON valid', async () => {
        const values = stringToJson("{\"teste\": \"teste\"}")
        expect(values).toMatchObject({"teste": "teste"})
    })

    test('Lambda Response Successfully', () => {
        const response = LambdaResponse(200, {"date": `Now is ${new Date()}`})
        expect(Object.keys(response)).toEqual(expect.arrayContaining(['statusCode', 'body']))
        expect(response.statusCode).toBe(200)
    })

    test('Lambda Response Fail(404)', () => {
        const response = LambdaResponse(404, {"message": `Page not found ${new Date()}`})
        expect(Object.keys(response)).toEqual(expect.arrayContaining(['statusCode', 'body']))
        expect(response.statusCode).toBe(404)
    })

    test('Lambda Validator Successfully', () => {
        const body = {id: Date.now()}
        expect(LambdaValidator('create', {body })).toBeTruthy()
        expect(LambdaValidator('update', {body, pathParameters: {id: body.id}})).toBeTruthy()
        expect(LambdaValidator('delete', {pathParameters: {id: body.id}})).toBeTruthy()
        expect(LambdaValidator('list', {})).toBeTruthy()
    })

    test('Lambda Validator Fail', () => {
        const body = {id: Date.now()}
        expect(LambdaValidator('create', {})).toBeFalsy()
        expect(LambdaValidator('update', {body})).toBeFalsy()
        expect(LambdaValidator('delete', {pathParameters: {}})).toBeFalsy()
        expect(LambdaValidator(`list-${Date.now()}`, {})).toBeFalsy()
    })
})