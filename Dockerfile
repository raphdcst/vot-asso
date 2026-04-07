FROM node:lts-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ----------------------------
# Stage 1: Install all dependencies
# ----------------------------
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ----------------------------
# Stage 2: Build the application
# ----------------------------
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node ace build

# ----------------------------
# Stage 3: Production dependencies
# ----------------------------
FROM base AS prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

# ----------------------------
# Stage 4: Production runtime
# ----------------------------
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/build ./
COPY --from=prod-deps /app/node_modules ./node_modules

COPY docker-entrypoint.js ./

EXPOSE 3333
CMD ["node", "bin/server.js"]
CMD ["node", "docker-entrypoint.js"]
