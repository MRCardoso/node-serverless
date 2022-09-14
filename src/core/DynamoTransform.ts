import { AWSError, DynamoDB } from 'aws-sdk';
import { TableName } from 'aws-sdk/clients/dynamodb';
export default class DynamoTransform {
    table:TableName
    constructor(table:TableName) {
        this.table = table
    }
    update(data: any, id:string): DynamoDB.DocumentClient.UpdateItemInput {
        data['updatedAt'] = Date.now()
        let expression:string[] = []
        const updated = Object.keys(data)
                            .reduce((acc, value) => {
                                acc[`:${value}`]  = data[value]
                                expression.push(`${value} = :${value}`)
                                return acc
                            }, {})
        
        return {
            TableName: this.table,
            Key: {id},
            ExpressionAttributeValues: updated,
            UpdateExpression: `SET ${expression.join(',')}`,
            ReturnValues: 'ALL_NEW',
        }
    }

    create(data: any, id: string): DynamoDB.DocumentClient.PutItemInput {
        const timestamp = Date.now();
        return {
            TableName: this.table,
            Item: {
                id,
                age: data.age,
                name: data.name,
                role: data.role,
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        }
    }
    delete(id: string): DynamoDB.DocumentClient.DeleteItemInput {
        return {
            TableName: this.table,
            Key: {id},
        }
    }
    all(params: DynamoDB.DocumentClient.ScanInput): DynamoDB.DocumentClient.ScanInput{
        return {TableName: this.table, ...params}
    }
    byId(id:string): DynamoDB.DocumentClient.GetItemInput{
        return {
            TableName: this.table,
            Key: {id},
        }
    }

    errors (error:AWSError): string {
        return `${error.code} - ${error.message}`
    }
    
}