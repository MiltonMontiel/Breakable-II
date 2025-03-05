#!/bin/bash

cd back/
./gradlew build -x test

cd ..

docker compose build

docker compose up
