FROM node:16-alpine AS builder
# # If your server node is in a special area, you can replace the apk source to speed up deployment. For example as follow:
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk add --no-cache git libc6-compat

WORKDIR /app
COPY . .
ARG REGISTRY
RUN if [[ -z "$REGISTRY" ]] ; then yarn install ; else yarn install --registry $REGISTRY ; fi

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1
ENV SENTRY_LOG_ENABLE 1

# custom env
ARG GIT_COMMIT
ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN

ENV NEXT_PUBLIC_GIT_COMMIT=$GIT_COMMIT
ENV SENTRY_RELEASE=$GIT_COMMIT

ENV SENTRY_DSN=$SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$SENTRY_DSN

ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# custom env
ARG GIT_COMMIT
ARG SENTRY_DSN

ENV NEXT_PUBLIC_GIT_COMMIT=$GIT_COMMIT
ENV SENTRY_RELEASE=$GIT_COMMIT

ENV SENTRY_DSN=$SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$SENTRY_DSN

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/i18n ./i18n

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
