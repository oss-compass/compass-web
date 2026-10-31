# Development

## env

Before starting development, you must create a new `.env.local` file in the `apps/web` directory (the app runs as the `@oss-compass/web` workspace, so Next.js loads env files from there; a template is available at `apps/web/.env.example`), and place your API URLs into it:

```dotenv
API_URL=http://localhost:8080
NEXT_PUBLIC_COMPASS_API_URL=http://127.0.0.1:8099
```

## Local Development

```shell
# 1. install nodejs and yarn first
# 2. config local env vars in `apps/web/.env.local`
# 3. run
yarn install
yarn dev
```
