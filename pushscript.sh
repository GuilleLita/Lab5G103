#!/bin/bash

BACK_DIR="./Bakend"
FRON_DIR="./frontend"

BACK_NAME='Backend'
FRON_NAME='Frontend'

FILERET='/tmp/screenreturn'

#First check git main branch
git checkout main &&
git fetch --all &&
git reset --hard origin/main &&
git pull origin main

#Then kill screen process
screen -S ${BACK_NAME} -X quit
screen -S ${FRON_NAME} -x quit


#Iniciar de nuevo el backend
cd ${BACK_DIR}
screen -dmS ${BACK_NAME} npm run start

#Iniciar de nuevo frontend
cd ..
cd ${FRON_DIR}
screen -dmS ${BACK_NAME} npm run start





