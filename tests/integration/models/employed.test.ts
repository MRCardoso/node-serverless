import Employed from "../../../src/models/Employed"
import {validate, v4 as uuidV4} from 'uuid'
const model = new Employed()
let employedId
let DemoEmployed = {
    "employed_name": `Employed ${Date.now()}`, 
    "employed_age": 20, 
    "employed_role": `Supervisor ${Date.now()}`
}

describe('Emplaoyed CRUD', () => {
    test('Created fail [required all]', async () => {
        await expect(model.create({})).rejects.toMatchObject(model.normalizedMissing(model.fillables))
    })

    test('Created fail [missing name]', async () => {
        let created:any = {...DemoEmployed}
        delete created["employed_name"]
        await expect(model.create(created)).rejects.toMatchObject(model.normalizedMissing(["employed_name"]))
    })
    test('Created fail [missing role]', async () => {
        let created:any = {...DemoEmployed}
        delete created["employed_role"]
        await expect(model.create(created)).rejects.toMatchObject(model.normalizedMissing(["employed_role"]))
    })
    test('Created fail [missing age]', async () => {
        let created:any = {...DemoEmployed}
        delete created["employed_age"]
        await expect(model.create(created)).rejects.toMatchObject(model.normalizedMissing(["employed_age"]))
    })
    test('Created Successfully', async () => {
        employedId = await model.create(DemoEmployed)
        expect(validate(employedId)).toBeTruthy()
    })
    
    test('Update Nothing', async () => {
        const id = await model.update({}, employedId)
        expect(validate(id)).toBeTruthy()
    })
    test('Update Successfully', async () => {
        const updated = {...DemoEmployed}
        updated["employed_name"] += " updated"
        updated["employed_role"] += " updated"
        updated["employed_age"] *= 2
        const id = await model.update(updated, employedId)
        expect(validate(id)).toBeTruthy()
    })

    test('List Successfully', async () => {
        const items:any = await model.all()
        expect(items.length).toBeGreaterThanOrEqual(0)
    })

    test('GetById Fail', async () => {
        await expect(model.findByPk(uuidV4())).rejects.toMatch(/^[a-z0-9]{1,} \- \w.+$/)
    })
    test('GetById Successfully', async () => {
        const item:any = await model.findByPk(employedId)
        expect(item.id).toEqual(employedId)
    })
    
    test('Delete Successfully', async () => {
        const status = await model.delete(employedId)
        expect(status).toBeTruthy()
    })
})