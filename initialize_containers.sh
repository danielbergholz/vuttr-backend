#!/bin/bash

if !(docker start postgres-vuttr); then
  printf "\nCreating docker postgres image... 🚀\n\n"
  docker run --name postgres-vuttr -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=vuttr -p 5432:5432 -d bitnami/postgresql:latest
  printf "\npostgres-vuttr image created! 🚀\n\n"
fi

printf "\nSUCCESS! 🎉\n\n"
