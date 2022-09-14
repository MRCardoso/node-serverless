import Validator from "./Validator"
import {v4 as uuidV4} from 'uuid'
import AWS, {AWSError, DynamoDB} from 'aws-sdk'
import DynamoTransform from "./DynamoTransform"

AWS.config.update({region: process.env.AWS_REGION_SERVERLESS});

export default class Model {
    validator: Validator
    transform: DynamoTransform
    rules: any
    db: DynamoDB.DocumentClient
    tableName: string|undefined
    fillables: string[]
    constructor(table: string, rules: any, fillables: any){
        this.fillables = fillables
        this.rules = rules
        this.db = new DynamoDB.DocumentClient()
        this.tableName = table
        this.validator = new Validator(this.rules)
        this.transform = new DynamoTransform(this.tableName)
    }

    fromFillables(values: any) {
        let data: any = {};
        for (let x in values) {
            if (this.fillables.includes(x))
                data[x] = values[x]
        }
        return data
    }

    create(values:any = {}) {
        return new Promise((resolve, reject) => {
            const data = this.fromFillables(values)
            if (!this.validator.validate(data)){
                return reject(this.validator.getErrors())
            }
            const params = this.transform.create(data, uuidV4())
            console.log({Create: params}, data)
            this.db.put(params, (error: AWSError) => {
                if (error) {
                    return reject(this.transform.errors(error))
                }
                resolve(params.Item.id)
            });
        })
    }

    update(values: any, id: string) {
        return new Promise((resolve, reject) => {
            if (Object.keys(values).length === 0) {
                return resolve(id)
            }
            const data = this.fromFillables(values)
            this.db.update(this.transform.update(data, id), (error: AWSError, result:DynamoDB.DocumentClient.UpdateItemOutput) => {
                if (error) {
                    return reject(this.transform.errors(error))
                }
                resolve(result.Attributes?.id)
            });
        })
    }

    delete(id:string) {
        return new Promise((resolve, reject) => {
            this.db.delete(this.transform.delete(id), (error:AWSError) => {
                if (error) {
                    return reject(this.transform.errors(error))
                }
                resolve(true)
            })
        })
    }
    all(params=null) {
        return new Promise((resolve, reject) => {
            this.db.scan(this.transform.all(params), (error: AWSError, result:DynamoDB.DocumentClient.ScanOutput) => {
                if (error) {
                    return reject(this.transform.errors(error))
                }
                resolve(result.Items)
            });
        })
    }

    findByPk(id:string) {
        return new Promise((resolve, reject) => {
            this.db.get(this.transform.byId(id), (error: AWSError, result:DynamoDB.DocumentClient.GetItemOutput) => {
                if (error) {
                    return reject(this.transform.errors(error))
                }
                if (!result.Item) {
                    return reject(`404 - Registro de ${this.tableName} não encontrado.`)
                }
                
                resolve(result.Item)
            })
        })
    }

    normalizedMissing(keys: any) {
        let output: any = {}
        for (let field in this.rules){
            if (keys.includes(field)) {
                const rules = this.rules[field].split('|')
                const errors:string[] = []
                rules.forEach((rule:string) => {
                    errors.push(this.validator.processMessages(rule, {field}))
                })
                output[field] = errors
            }
        }
        return output
    }
}