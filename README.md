# Node serverless Api + DynamoDB

## serverless framework
Install the node package 'serverless' to handle with the deploy stuff
```shell
npm install -g serverless
```

## run tests
To check if everything still works run the test with Jest
```shell
npm run test
```

# build prod
When you finish the updates in the code generate the production version of service
```shell
npm run build
```

# Test local lambda

## serverless test local create
```
serverless invoke local --function create --stage dev --data '{"body": {"employed_name": "Employed test","employed_age": 20, "employed_role": "Supervisor"}}'
```

## serverless test local update
```
serverless invoke local --function update --stage dev --data '{"body": {"employed_name": "Employed test updated"}, "pathParameters": {"id": "ID"}}'
```

## serverless test local remove
```
serverless invoke local --function remove --stage dev --data '{"body": {"employed_name": "Employed test","employed_age": 20, "employed_role": "Supervisor"}}'
```

## serverless test local list
```
serverless invoke local --function list --stage dev
```


# Test Api gateway

## serverless Api POST
```
./bin/requestApi.sh create "" '{"employed_name": "Employed test","employed_age": 20, "employed_role": "Supervisor"}'
```

## serverless Api GET/id
```
./bin/requestApi.sh get "<ID>"
```

## serverless Api UPDATE/id
```
./bin/requestApi.sh update "<ID>" '{"employed_name": "Employed test updated","employed_age": 40, "employed_role": "Supervisor updated"}'
```

## serverless Api DELETE/id
```
./bin/requestApi.sh remove "<ID>"
```

## serverless Api GET
```
./bin/requestApi.sh
```