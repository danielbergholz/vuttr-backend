# VUTTR - backend

This is the codebase for the backend of VUTTR (Very Useful Tools to Remember), a coding challenge provided by Bossabox.

## Tools used
- [NodeJS](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- [AdonisJS v4](https://adonisjs.com/)
- [Docker](https://www.docker.com/get-started)

## Usage (MacOS and Linux)
- Install every dependency:

```bash
bash install_dependencies.sh
```

- Initialize the containers:

```bash
bash initialize_containers.sh
```

- Start local dev server:

```bash
adonis serve --dev
```

## Usage (Windows)
- Install dependencies:

```bash
yarn
```

- Install adonis:

```bash
npm i -g @adonisjs/cli
```

- Create postgres docker image:

```bash
docker run --name postgres-vuttr -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=vuttr -p 5432:5432 -d bitnami/postgresql:latest
```

- Create redis docker image:

```bash
docker run --name redis-vuttr -p 6379:6379 -d -t redis:alpine
```

- Run migrations:

```bash
adonis migration:run
```

- Generate APP_KEY:

```bash
adonis key:generate
```

- Start local dev server:

```bash
adonis serve --dev
```

## Extra steps
- Create your own ".env" file based on ".env.example"
- Visit the swagger documentation on http://localhost:3000/docs after starting the server
- Get the "swagger.json" file on http://localhost:3000/swagger.json or https://very-useful-tools-to-remember.herokuapp.com/swagger.json
