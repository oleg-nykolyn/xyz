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

Deploy the smart contracts using:

```bash
docker compose exec hardhat sh scripts/deploy.sh
```

Access the RESTful API at [http://localhost:3000/api/v1](http://localhost:3000/api/v1) (or another port if you modified the `PORT` environment variable).

To stop the services, either press `Ctrl+C` in the terminal where you initiated `docker-compose up` or run:

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

| Variable           | Default                  | Allowed                                      |
| ------------------ | ------------------------ | -------------------------------------------- |
| `NODE_ENV`         | development              | production, development                      |
| `PORT`             | 3000                     | number                                       |
| `LOG_LEVEL`        | log                      | fatal, error, log, warn, debug, verbose       |
| `DB_HOST`          | localhost                | any                                          |
| `DB_PORT`          | 5432                     | number                                       |
| `DB_NAME`          | postgres-db              | any                                          |
| `DB_USER`          | postgres-user            | any                                          |
| `DB_PASSWORD`      | postgres-password        | any                                          |
| `JWT_SECRET`       |                          | any                                          |
| `JWT_ISSUER`       | xyz                      | any                                          |
| `JWT_EXPIRES_IN`   | 7d                       | expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d" |
| `HARDHAT_RPC_URL`  | <http://127.0.0.1:8545>  | any                                          |
| `ETHEREUM_RPC_URL` |                          | any                                          |
| `POLYGON_RPC_URL`  |                          | any                                          |
| `THROTTLE_TTL_SECS`| 1                         | expressed in seconds                                        |
| `THROTTLE_LIMIT`   | 5                         | number                                            |
