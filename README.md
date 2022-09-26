This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# install dependencies
yarn

# start dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy by docker

```bash
# build docker image
yarn docker

```

### .env file

```bash
# Google Analytics ID
NEXT_PUBLIC_GOOGLE_ANALYTICS=

# Backend api endpoint
API_URL=

# URL of this site
NEXTAUTH_URL=
# Auth secret
NEXTAUTH_SECRET=

# Github OAuth
GITHUB_ID=
GITHUB_SECRET=

# Gitee OAuth
GITEE_ID=
GITEE_SECRET=

```

### start server with env file

```bash
docker run -p 3000:3000 --env-file .env compass-web:0.1.0
```
