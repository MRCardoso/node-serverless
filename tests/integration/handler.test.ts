import {create, remove, update, list, byId} from '../../src/handler'
import { stringToJson } from '../../src/services/utils'
import {v4 as uuidV4} from 'uuid'

let DemoEmployed = {
    body: JSON.stringify({
        "employed_name": `Employed ${Date.now()}`, 
        "employed_age": 20, 
        "employed_role": `Supervisor ${Date.now()}`
    })
}
let employedId

describe('Lambda', () => {
    test('Create Successfully', async () => {
        await create(DemoEmployed, {}, (e, data) => {
            expect(Object.keys(data)).toEqual(expect.arrayContaining(["statusCode", "body"]));
            const values = stringToJson(data?.body)
            expect(data.statusCode).toEqual(200)
            expect(Object.keys(values)).toEqual(expect.arrayContaining(['id']))
            employedId = values.id
            expect(employedId).not.toBeNull()
        })
    })

    test('Update Successfully', async () => {
        const updated = {...DemoEmployed, pathParameters: {id: employedId}}
        await update(updated, {}, (e, data) => {
            expect(Object.keys(data)).toEqual(expect.arrayContaining(["statusCode", "body"]));
            const values = stringToJson(data.body)
            expect(data.statusCode).toEqual(200)
            expect(Object.keys(values)).toEqual(expect.arrayContaining(['id']))
        })
    })

    test('List Successfully', async () => {
        await list({}, {}, (e, data) => {
            expect(Object.keys(data)).toEqual(expect.arrayContaining(["statusCode", "body"]));
            expect(data.statusCode).toEqual(200)
            const values = stringToJson(data.body)
            expect(values.length).toBeGreaterThanOrEqual(0)
        })
    })

    test('GetById Fail', async () => {
        const params = {pathParameters: {id: uuidV4()}}
        await byId(params, {}, (e, data) => {
            expect(Object.keys(data)).toEqual(expect.arrayContaining(["statusCode", "body"]));
            expect(data.statusCode).toEqual(400)
        })
    })

    test('GetById Successfully', async () => {
        const params = {pathParameters: {id: employedId}}
        await byId(params, {}, (e, data) => {
            expect(Object.keys(data)).toEqual(expect.arrayContaining(["statusCode", "body"]));
            expect(data.statusCode).toEqual(200)
            const values = stringToJson(data.body)
            expect(values.id).toEqual(employedId)
        })
    })

    test('Delete Successfully', async () => {
        const updated = {...DemoEmployed, pathParameters: {id: employedId}}
        await remove(updated, {}, (e, data) => {
            expect(Object.keys(data)).toEqual(expect.arrayContaining(["statusCode", "body"]));
            expect(data.statusCode).toEqual(200)
            const values = stringToJson(data.body)
            expect(Object.keys(values)).toEqual(expect.arrayContaining(['success']))
        })
    })
})