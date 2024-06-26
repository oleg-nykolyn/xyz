# XYZ

XYZ operates as a monolithic system, functioning as a gateway to confidential metadata linked with identifiable entities defined on EVM-compatible blockchains.

## Installation

To install XYZ and its dependencies, use:

```bash
npm install
```

## Running and Stopping the Services

Start the services using Docker Compose:

```bash
docker-compose --profile all up
```

Deploy the smart contracts using:

```bash
docker compose exec hardhat sh scripts/deploy.sh
```

To stop the services, either press `Ctrl+C` or run:

```bash
docker-compose --profile all stop
```

## Browsing the API

The application exposes Swagger documentation for the following modules:

- *Auth*: [localhost:{PORT}/swagger/api/v1/auth](http://localhost:3000/swagger/api/v1/auth)
- *Metadata*: [localhost:{PORT}/swagger/api/v1/metadata](http://localhost:3000/swagger/api/v1/metadata)

where `{PORT}` is the value of the `PORT` environment variable (default: `3000`).

**Note**: Swagger can be enable with `NODE_ENV=development` or `USE_SWAGGER=true`.

## Viewing the Logs

For real-time log tracking, use:

```bash
docker-compose logs -f
```

## Building the Docker Image

Build the Docker image with:

```bash
docker build -t xyz .
```

## Environment Variables

| Variable           | Default                  | Allowed                                      |
| ------------------ | ------------------------ | -------------------------------------------- |
| `NODE_ENV`         | development              | production, development                      |
| `PORT`             | 3000                     | number                                       |
| `LOG_LEVEL`        | log                      | fatal, error, warn, log, debug, verbose       |
| `DB_HOST`          | localhost                | any                                          |
| `DB_PORT`          | 5432                     | number                                       |
| `DB_NAME`          | postgres-db              | any                                          |
| `DB_USER`          | postgres-user            | any                                          |
| `DB_PASSWORD`      | postgres-password        | any                                          |
| `JWT_SECRET`       |                          | any                                          |
| `JWT_ISSUER`       | xyz                      | any                                          |
| `JWT_EXPIRES_IN`   | 7d                       | expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d" |
| `HARDHAT_RPC_URL`  | <http://127.0.0.1:8545>  | any                                          |
| `ETHEREUM_RPC_URL` | <https://ethereum.publicnode.com>                         | any                                          |
| `POLYGON_RPC_URL`  | <https://polygon-rpc.com>                         | any |
| `MULTIVAC_RPC_URL`  | <https://rpc.mtv.ac>                         | any |
| `THROTTLE_TTL_SECS`| 1                         | expressed in seconds                                        |
| `THROTTLE_LIMIT`   | 5                         | number                                            |
| `USE_SWAGGER`      | false                    | boolean                                      |
