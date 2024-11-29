# movie-app

Personal Movie APP

## Run Locally

Clone the project.

```bash
  git clone https://github.com/mattzbik/movie-app.git
```

Go to the project directory.

```bash
  cd movie-app
```

## Installation/Start Project

Option #1: To run the containers in the background in detached mode.

```bash
docker-compose up -d
```

Option #2: To run the containers.

```bash
docker-compose up
```

To View output and follow logs from containers if Option #1 is selected.

```bash
docker-compose logs -f
```

Stop and remove containers.

```bash
docker-compose down
```

## Usage

View GraphQL Interface Locally

```bash
http://localhost:4000/graphql
```

View Frontend Application Locally

```bash
http://localhost:3000/
```

## TODO

- Error Handling
- Tests

## Resources

## .env Example

```bash
# DATABASE
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=db
POSTGRES_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

# SERVER
PORT=4000
```
