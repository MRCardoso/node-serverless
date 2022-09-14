const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION_SERVERLESS })
const db = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
const action = process.argv[2]
const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_TEST
}
let retryCreate = 0

function addUser () {
    db.createTable({
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: process.env.AWS_DYNAMODB_TABLE_TEST
    }, (err, data) => {
        if (err) {
            console.log(`Create ${err.statusCode} - ${err.code} retry[${retryCreate}]`)
            if (retryCreate < 10) {
                return setTimeout(addUser, 1000)
            }
            retryCreate++
        } else {
            console.log({ Created: data.TableDescription.TableId })
        }
    })
}

db.describeTable(params, (_, descData) => {
    if (descData) {
        return db.deleteTable(params, (err, data) => {
            if (err) {
                console.log(`Delete ${err.statusCode} - ${err.code}`)
            } else {
                console.log({ Deleted: data.TableDescription.TableId })
                addUser()
            }
        })
    } else if (action === 'c') {
        addUser()
    }
})
