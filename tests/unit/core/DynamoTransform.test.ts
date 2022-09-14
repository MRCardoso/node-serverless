import DynamoTransform from '../../../src/core/DynamoTransform'
import {v4 as uuidv4} from 'uuid'
let transform;
const fakeTable = `users-${Date.now()}`
const fakeUser = {
    name: `User ${Date.now()}`,
    username: `user${Date.now()}`
}
describe('Dynamo Transform', () => {
    beforeAll(() => {
        transform = new DynamoTransform(fakeTable)
    })
    test('Create Params', async () => {
        const id = uuidv4()
        const params = transform.create(fakeUser, id)
        expect(Object.keys(params)).toEqual(expect.arrayContaining(["TableName", "Item"]))
        expect(params.Item.name).toEqual(fakeUser.name)
    })

    test('Update Params', async () => {
        const id = uuidv4()
        const params = transform.update(fakeUser, id)
        expect(Object.keys(params)).toEqual(expect.arrayContaining(["TableName", "Key", "ExpressionAttributeValues", "UpdateExpression", "ReturnValues"]))
        expect(params.Key.id).toEqual(id)
    })

    test('Delete Params', async () => {
        const id = uuidv4()
        const params = transform.delete(id)
        expect(Object.keys(params)).toEqual(expect.arrayContaining(["TableName", "Key"]))
        expect(params.Key.id).toEqual(id)
    })

    test('List Params', async () => {
        const id = uuidv4()
        const params = transform.update(fakeUser, id)
        expect(Object.keys(params)).toEqual(expect.arrayContaining(["TableName"]))
    })

    test('ById Params', async () => {
        const id = uuidv4()
        const params = transform.byId(id)
        expect(Object.keys(params)).toEqual(expect.arrayContaining(["TableName", "Key"]))
        expect(params.Key.id).toEqual(id)
    })
})