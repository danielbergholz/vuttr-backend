#!/bin/bash

if node -v && npm -v; then

  if yarn -v; then
    printf "\nInstalling yarn dependencies... 🚀\n\n"
    yarn
  else
    printf "\nERROR: You need to install yarn first 🆘\n\n"
    exit 1
  fi

  if !(adonis --version); then
    printf "\nInstalling adonis... 🚀"
    printf "\nPlease enter password for global npm install 🤔\n\n"
    sudo npm i -g @adonisjs/cli
    adonis key:generate
  fi

  if docker -v; then
    printf "\nInstalling docker postgres image... 🚀\n\n"
    docker pull bitnami/postgresql:latest
    printf "\nInstalling docker redis image... 🚀\n\n"
    docker pull redis:alpine
  else
    printf "\nERROR: You need to install docker first 🆘\n\n"
    exit 1
  fi

else
  printf "\nERROR: You need to install node and npm first 🆘\n\n"
  exit 1
fi

printf "\nSUCCESS! 🎉\n\n"
