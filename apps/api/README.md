# DTI - Backend

## What this implementation is about:

This is the backend implementation for DTI exam. It is a REST API that provides endpoints to manage users and their photos and albuns.

## API Structure:

> [!WARNING]
> Some endpoints are protected by JWT token. To access them, you need to provide a valid token in the request header. They will be marked with a 🔒 emoji.

| HTTP METHOD       | POST        | GET            | PUT         | DELETE         |
| ----------------- | ----------- | -------------- | ----------- | -------------- |
| CRUD OP           | CREATE      | READ           | UPDATE      | DELETE         |
| /user/album       | Ok (201) 🔒 | Error (200) 🔒 | N/A         | Error (204) 🔒 |
| /user/albums      | N/A         | Ok (200) 🔒    | N/A         | N/A            |
| /user/album/:id   | N/A         | Ok (200) 🔒    | N/A         | Error (204) 🔒 |
| /login            | Ok (201)    | N/A            | N/A         | N/A            |
| /user/photo       | Ok (201) 🔒 | N/A            | N/A         | Error (204) 🔒 |
| /user/photo/album | Ok (201) 🔒 | N/A            | N/A         | N/A            |
| /user/photos      | N/A         | Ok (200) 🔒    | N/A         | N/A            |
| /user/photo/:id   | N/A         | Ok (200) 🔒    | N/A         | Error (204) 🔒 |
| /users            | N/A         | Ok (200) 🔒    | N/A         | N/A            |
| /user             | Ok (201)    | N/A            | N/A         | N/A            |
| /user/:email      | N/A         | N/A            | Ok (200) 🔒 | Error (204) 🔒 |

## About tests

The tests are implemented using Jest. They are located in the `test` folder.
I choiced to use Jest because it is a very popular test framework for Node.js applications and it is very easy to use!
I don't follow the TDD methodology for this project, instead I wrote the tests after the implementation of the endpoints.
I developed only unit tests for the endpoints.
You can run the tests using the command:

> [!IMPORTANT]
> You must be in the api folder to run the tests.

```bash
pnpm run test
```

## How to start

It is very simple to start the application. You just need to run the command:

> [!WARNING]
> Don't forget to install the depedencies!.

On root folder you can start as development mode:

```bash
pnpm run dev
```

Or you can start as production mode which are configured to run as a docker container:

```bash
docker compose up --build -d
```

> [!CAUTION]
> Don't forget to create a `.env` in API folder, you can check the example.
> The database it's mandatory to run the application.

## Improvements

- Implement integration tests
- Implement a better error handling
- Implement a better logging system
- Implement a validation system based on roles
- Implement a audit system on the database

## Observations

I stored the photos in my local machine, but in a real scenario, I would store them in a cloud storage like AWS S3 for example. But if this wasn't possible, i would store them in a folder in the server and will managed well the size of the files.
