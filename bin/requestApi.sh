#!/bin/bash
export $(cat .env | xargs)
url="https://0ne59utzpd.execute-api.us-east-2.amazonaws.com/employees"


doWork() {
    echo "$1"
    eval "$1"
}
if [[ $1 = 'create' ]]
then
    if [[ -n $3 ]]
    then
        doWork "curl -X POST --data '$3' -H 'Content-Type: application/json' $AWS_APIGATEWAY_URL/employees"
    fi
elif [[ $1 = 'update' ]]
then
    if [[ -n $2 ]] || [[ -n $3 ]]
    then
        doWork "curl -X PUT --data "$3" -H 'Content-Type: application/json' $AWS_APIGATEWAY_URL/employees/$2"
    fi
elif [[ $1 = 'remove' ]]
then
    if [[ -n $2 ]]
    then
        doWork "curl -X DELETE -H 'Content-Type: application/json' $AWS_APIGATEWAY_URL/employees/$2"
    fi
elif [[ $1 = 'get' ]]
then
    if [[ -n $2 ]]
    then
        doWork "curl -H 'Content-Type: application/json' $AWS_APIGATEWAY_URL/employees/$2"
    fi
else
    doWork "curl -H 'Content-Type: application/json' $AWS_APIGATEWAY_URL/employees"
fi