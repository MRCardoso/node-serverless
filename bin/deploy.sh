#!/bin/bash

if [[ -n $1 ]]
then
    
    rm -rf node_modules lib &&\
    npm i --only=dev &&\
    npm run build &&\
    npm run test &&\
    npm i --platform=linux --arch=x64 --target=16.x &&
    NODE_ENV=$1 &&\
    echo -e "\033[4;32mDeploy in $NODE_ENV\033[0m" &&\
    serverless deploy --verbose --stage $1
else
    echo -e "\033[4;31mPlease provide the environment\033[0m"
fi
