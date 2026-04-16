# CRMine Backend (NestJS)

NestJS backend for WeChat Mini Program profile collection.

## Core Features

- WeChat login endpoint (`/api/auth/wx-login`) with extensible `WechatService`
- JWT auth and protected user profile APIs
- TypeORM + PostgreSQL (`UserProfile` entity)
- Redis wrapper service for short-lived session/phone caching
- Global validation, unified response envelope, and exception handling

## Run Locally (Backend local + Docker DB/Redis)

```bash
# from project root
cp server/.env.example server/.env
docker compose up -d
cd server
npm install
npm run start:dev
```

## Run Fully in Docker

```bash
# from project root
docker compose -f docker-compose.full.yml up --build
```

## Environment Notes

- Local mode `.env` usually uses `DB_HOST=localhost`, `REDIS_HOST=localhost`
- Full Docker mode uses service names (`DB_HOST=postgres`, `REDIS_HOST=redis`)

## APIs

- `POST /api/auth/wx-login`
- `POST /api/user/bind-phone` (JWT)
- `POST /api/user/profile` (JWT)
- `GET /api/user/profile` (JWT)
- `PUT /api/user/profile` (JWT)


## HTTPS Support

Set these env vars to enable HTTPS server directly in NestJS:

```bash
ENABLE_HTTPS=true
HTTPS_CERT_PATH=/path/to/fullchain.pem
HTTPS_KEY_PATH=/path/to/privkey.pem
```

Then backend can be served as `https://api.xxllm.fun:3000/` (assuming DNS, cert and firewall are configured).
