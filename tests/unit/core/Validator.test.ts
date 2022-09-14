import Validator from "../../../src/core/Validator"

describe('Validator', () => {
    test('Validate fail', async () => {
        const validator = new Validator({
            "first_name": "required",
            "last_name": "required",
            "status": "required|number"
        })

        expect(validator.validate({})).toBeFalsy()
    })

    test('Validate fail number', async () => {
        const validator = new Validator({
            "status": "required|number"
        })
        expect(validator.validate({"status": "name"})).toBeFalsy()
    })
    
    test('Validate successfully', async () => {
        const validator = new Validator({
            "first_name": "required",
            "last_name": "required",
            "status": "required|number"
        })

        expect(validator.validate({
            "first_name": "Standard name",
            "last_name": "Standard last name",
            "status": 1
        })).toBeTruthy()
    })
    test('Unknown Message', () => {
        const key = `test ${Date.now()}`
        const validator = new Validator({"first_name": "required"})
        const message = validator.processMessages(key, {field: key})
        expect(message).toBe(validator.messages["unknownLabel"].replace(':field', key))
    })
    test('Unknown Method', () => {
        const key = `test ${Date.now()}`
        const validator = new Validator({"first_name": "unique"})
        expect(validator.validate({})).toBeFalsy()
        expect(validator.getErrors()).toMatchObject({first_name: [validator.messages["unknownMethod"].replace(":field", "unique")]})
    })
})