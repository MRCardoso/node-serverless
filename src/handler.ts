import { LambdaResponse, LambdaValidator, stringToJson } from './services/utils'
import Employed from './models/Employed';

const model = new Employed()

export const create = async (event: any, context, callback) => {
    try {
        if (!LambdaValidator('create', event)){
            throw "O campo 'body' é obrigatório."
        }
        const data = stringToJson(event.body)
        const id = await model.create(data)
        callback(null, LambdaResponse(200, {id})
        )
    } catch (error) {
        callback(null, LambdaResponse(400, error));
    }
}

export const update = async (event: any, context, callback) => {
    try {
        if (!LambdaValidator('update', event)){
            throw "O campo 'body' e 'pathParameters.id' são obrigatório."
        }
        const data = stringToJson(event.body)
        const id = await model.update(data, event.pathParameters.id)
        callback(null, LambdaResponse(200, {id}))
    } catch (error) {
        callback(null, LambdaResponse(400, error));
    }
}

export const remove = async (event: any, context, callback) => {
    try {
        if (!LambdaValidator('delete', event)){
            throw "O campo 'pathParameters.id' é obrigatório."
        }
        const success = await model.delete(event.pathParameters.id)
        callback(null, LambdaResponse(200, {success}))
    } catch (error) {
        callback(null, LambdaResponse(400, error));
    }
}

export const list = async (event, context, callback) => {
    try {
        const items = await model.all()
        callback(null, LambdaResponse(200, items))
    } catch (error) {
        callback(null, LambdaResponse(400, error));
    }
}

export const byId = async (event, context, callback) => {
    try {
        if (!LambdaValidator('byId', event)){
            throw "O campo 'pathParameters.id' é obrigatório."
        }
        const items = await model.findByPk(event.pathParameters.id)
        callback(null, LambdaResponse(200, items))
    } catch (error) {
        callback(null, LambdaResponse(400, error));
    }
}