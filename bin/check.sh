#!/bin/bash

DCLS="\033[0m"
GreenLight="\033[4;32m"

echo -e $GreenLight"Node: `node -v`"$DCLS
echo -e $GreenLight"Npm: `npm --v`"$DCLS
echo -e $GreenLight"Serveless: `serverless -v`"$DCLS
echo -e $GreenLight"Aws: `aws --v`"$DCLS