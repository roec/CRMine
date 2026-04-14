# CRMine MVP - WeChat Mini Program Registration/Profile System

A production-style MVP scaffold containing:

- **Frontend:** Native WeChat Mini Program (JavaScript runtime with TypeScript-style architecture via JSDoc/types/modules)
- **Backend:** NestJS (Node.js)
- **Database:** PostgreSQL (TypeORM)
- **Cache:** Redis
- **Auth:** JWT

---

## 1) Project Structure

```text
.
├── docker-compose.yml                # postgres + redis only
├── docker-compose.full.yml           # backend + postgres + redis
├── miniprogram/
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── components/
│   │   ├── form-item/
│   │   └── submit-bar/
│   ├── constants/
│   │   └── options.js
│   ├── pages/
│   │   ├── index/
│   │   ├── profile/form/
│   │   ├── profile/success/
│   │   └── user/center/
│   ├── services/
│   │   ├── auth.js
│   │   ├── request.js
│   │   └── user.js
│   ├── typings/model.js
│   └── utils/
│       ├── storage.js
│       └── validate.js
└── server/
    ├── Dockerfile
    ├── .env.example
    ├── package.json
    ├── README.md
    └── src/
        ├── app.module.ts
        ├── main.ts
        ├── common/
        ├── config/
        ├── database/entities/user-profile.entity.ts
        └── modules/
            ├── auth/
            ├── redis/
            └── user/
```

---

## 2) Business Rules Implemented

- OpenID is the identity anchor.
- One OpenID can only have one profile.
- Phone is acquired through WeChat phone authorization flow (`bind-phone`) on frontend (manual input removed as requested).
- Required fields: `phone`, `realName`, `gender`, `age`.
- Optional fields: `job`, `incomeRange`.
- Frontend requires privacy agreement before submit, and all mini-program UI labels are Chinese.
- Form page supports loading existing profile for edit.

---

## 3) API Summary

### `POST /api/auth/wx-login`
Input:
```json
{ "code": "wx_login_code" }
```
Output:
```json
{ "token": "jwt", "openid": "openid_xxx", "hasProfile": false }
```

### `POST /api/user/bind-phone` (JWT)
Input:
```json
{ "phoneCode": "phone_code_xxx" }
```
Output:
```json
{ "phone": "13800138000" }
```

### `POST /api/user/profile` (JWT)
Create profile.

### `GET /api/user/profile` (JWT)
Get current profile.

### `PUT /api/user/profile` (JWT)
Update current profile.

---

## 4) Run Mode A (Backend local npm + Dockerized PostgreSQL/Redis)

### Step 1: Start PostgreSQL + Redis
```bash
docker compose up -d
```

### Step 2: Prepare backend env
```bash
cp server/.env.example server/.env
```

Use these key values in local mode:
- `DB_HOST=localhost`
- `REDIS_HOST=localhost`

### Step 3: Start backend locally
```bash
cd server
npm install
npm run start:dev
```

---

## 5) Run Mode B (Full Docker mode)

```bash
docker compose -f docker-compose.full.yml up --build
```

In full docker mode, backend env uses service names:
- `DB_HOST=postgres`
- `REDIS_HOST=redis`

---

## 6) Import Mini Program

1. Open WeChat DevTools.
2. Import project and point to `miniprogram/`.
3. Configure legal request domain according to your backend host (for local testing, use dev tool settings).
4. Launch app and test flow:
   - Home -> Profile Form
   - WeChat phone authorization (or manual phone)
   - Submit profile
   - Check user center

---

## 7) Engineering Highlights

- Frontend:
  - Native mini-program structure.
  - Service layer and reusable request wrapper.
  - JSDoc typings (`typings/model.js`) to support TS migration.
  - Validation helpers and constants enumerations.
- Backend:
  - Modular NestJS architecture (`auth`, `user`, `redis`, `common`, `config`).
  - DTO validation with `class-validator`.
  - JWT guard + strategy.
  - Unified API response interceptor + global exception filter.
  - Redis cache for short-lived session and phone binding states.
  - TypeORM entity with indexes and uniqueness constraints.

---

## 8) Future Extensions

- Replace mocked `WechatService` implementation with real WeChat API calls.
- Add refresh token and token blacklist.
- Add migration files and disable `synchronize` in production.
- Add rate limiting and audit logs.
- Add E2E tests and CI pipeline.
- Add admin panel for profile analytics.
