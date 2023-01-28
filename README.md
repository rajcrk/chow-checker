# Psystem's Platform

## Running Frontend & Backend

- `npm i`
- `npm run install-all`
- `npm run dev`

## Running Production Docker Environment

1. Have `.env` file in main directory with production mongo and node_env variables
2. Build app container with `docker build -t platform .`
3. Run `docker compose up -d`
4. Run `docker compose down` to end

## Dependencies

### Frontend

- react
- axios
- @redux/toolkit
- react-redux
- validator
- react-routerv6
- jest
- mui
- moment

## Backend

- express
- mongoose
- bcryptjs
- jsonwebtoken
- mocha
- chai
- supertest
- dotenv
- cors
