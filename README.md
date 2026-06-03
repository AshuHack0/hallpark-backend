# HalaPark Backend

Node.js + Express + MongoDB API for HalaPark (auth, CMS pages, quotes).

## Setup

```bash
cd hallpark-backend
npm install
cp .env.example .env
# Start MongoDB locally, then:
npm run dev
```

API: **http://localhost:8087**

## Environment

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for auth tokens |
| `CORS_ORIGINS` | Frontend + admin URLs |

## Auth

| Method | Path | Body |
|--------|------|------|
| POST | `/api/auth/signup` | `{ name, email, password }` |
| POST | `/api/auth/login` | `{ email, password }` |
| GET | `/api/auth/me` | Bearer token |

## CMS Pages (dynamic website content)

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/pages` | Public — list published pages |
| GET | `/api/pages/:slug` | Public — page content |
| GET | `/api/admin/pages` | JWT — all pages |
| PUT | `/api/admin/pages/:slug` | JWT — update sections JSON |

Pages are seeded on startup: home, about, services, solutions, contact, careers, faqs, how-it-works, app, business, blog.

**Home page** uses `sections.hero.slides[]`. Other pages use `sections.hero`.

## Quotes

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/quotes` | Public |
| GET | `/api/admin/quotes` | JWT |

## Related repos

- **halapark/frontend** — public website (reads `/api/pages/:slug`)
- **hallpark-admin** — admin dashboard (login, page tabs, quotes)
