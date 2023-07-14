# Development

## env

Before starting development, you must create a new .env.local file at project root, and place your api url into it:

```dotenv
# If you don't have started the local backend service,
# you can use the backend of our development server. https://compass.gitee.co

API_URL=https://compass.gitee.co

```

## Local Development

```shell
# 1. install nodejs and yarn first
# 2. config local env vars in `.env.local`
# 3. run
yarn install
yarn dev
```
