# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:baradatbiu/nodejs2022Q2-service.git
```

or

```
git clone https://github.com/baradatbiu/nodejs2022Q2-service.git
```

## Running application in docker containers

Build and run your app with Compose

```
npm run docker:build
```

Start services

```
npm run docker:start
```

Stop services

```
npm run docker:stop
```

Scan homelibrary image

```
npm run docker:scan:app
```

Scan postgreql image

```
npm run docker:scan:db
```

## Remote homelibrary docker images

Postgresql database

```
docker pull kharlamovdm/homelibrary:db
```

Rest service

```
docker pull kharlamovdm/homelibrary:rest-service
```

## Installing NPM modules

```
npm install
```

## Set env variables

Copy `.env.example` to `.env`

## Running application

```
npm start
```

After starting the app on port (4000 as default, or PORT in .env) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```

npm run test

```

To run only one of all test suites

```

npm run test -- <path to suite>

```

<!-- To run all test with authorization

```

npm run test:auth

```

To run only specific test suite with authorization

```

npm run test:auth -- <path to suite>

```-->

### Auto-fix and format

```

npm run lint

```

```

npm run format

```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

```

```
