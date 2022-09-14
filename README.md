# Node serverless Api + DynamoDB

## Thirdpart dependencies
* [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* [serverless framework](https://www.serverless.com/framework/docs/getting-started)
* [node v16+](https://nodejs.org/en/)

---

## Deployment
### Copy env.example
```shell
cp .env.example .env
```
### Configure AWS
```shell
aws configure
```
### Check system requirements
```shell
npm run check
```
### Install npm packages
```shell
npm i
```
### Run unit tests
Automatically before the test starts a node script 'createTestTable' will create a database for tests and deleted after tests end
```shell
npm run test
```

### build prod
Convert files developed with Typescript syntax for a javascript version in `./lib`
```shell
npm run build
```

### Deploy the serverless app
Automatically before the deploy starts the `node_modules` will re-installed and `lib` folder will be regenerated/rebuilded
```
npm run deploy <stage>
```

### Remove the serverless services
```
npm run purge <stage>
```

---
## Run Lambda local

### POST
```
serverless invoke local --function create --stage dev --data '{"body": {"employed_name": "Employed test","employed_age": 20, "employed_role": "Supervisor"}}'
```
### GET/<ID>
```
serverless invoke local --function get --stage dev --data '{"pathParameters": {"id": "<ID>"}}'
```
### PUT/<ID>
```
serverless invoke local --function update --stage dev --data '{"body": {"employed_name": "Employed test updated"}, "pathParameters": {"id": "<ID>"}}'
```
### DELETE/<ID>
```
serverless invoke local --function remove --stage dev --data '{"pathParameters": {"id": "<ID>"}}'
```
### GET
```
serverless invoke local --function list --stage dev
```

---
## Run lambda after deploy
### POST
```
./bin/requestApi.sh create "" '{"employed_name": "Employed test","employed_age": 20, "employed_role": "Supervisor"}'
```
### GET/id
```
./bin/requestApi.sh get "<ID>"
```
### UPDATE/id
```
./bin/requestApi.sh update "<ID>" '{"employed_name": "Employed test updated","employed_age": 40, "employed_role": "Supervisor updated"}'
```

### DELETE/id
```
./bin/requestApi.sh remove "<ID>"
```

### GET
```
./bin/requestApi.sh
```