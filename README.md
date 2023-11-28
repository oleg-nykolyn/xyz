# XYZ

XYZ operates as a monolithic system, functioning as a gateway to confidential metadata linked with identifiable entities on Ethereum.

Employing signed nonces, it verifies MetaMask wallet signatures, facilitating the issuance of a JSON Web Token (JWT) used for secured actions within protected routes.

## Installation

To install XYZ and its dependencies, use the following command:

```bash
npm install
```

## Running and Stopping the Services

Start the services using Docker Compose:

```bash
docker-compose up
```

Access the RESTful API at [http://localhost:3000/api/v1](http://localhost:3000/api/v1) (or another port if you modified the `PORT` environment variable). To stop the services, either press `Ctrl+C` in the terminal where you initiated `docker-compose up` or run:

```bash
docker-compose down
```

## Viewing the Logs

For real-time log tracking, use the following command:

```bash
docker-compose logs -f
```

## Building the Docker Image

Build the Docker image with the specified tag 'xyz':

```bash
docker build -t xyz .
```

## Environment Variables

Configure XYZ's behavior using environment variables. Here are the available options:

| Variable     | Default             | Allowed              |
| ------------ | ------------------- | -------------------- |
| `NODE_ENV`   | production          | production, development |
| `PORT`       | 3000                | any                  |
| `LOG_LEVEL`  | log                 | fatal, error, log, warn, debug, verbose |
| `DB_HOST`    | postgres            | any                  |
| `DB_PORT`    | 5432                | any                  |
| `DB_NAME`    | postgres-db         | any                  |
| `DB_USER`    | postgres-user       | any                  |
| `DB_PASSWORD`| postgres-password   | any                  |
| `JWT_SECRET` | jwt-secret          | any                  |
| `RPC_URL` | localhost:8545  | any                  |
