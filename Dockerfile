FROM node:lts-bookworm-slim AS base

# Activation de pnpm via corepack (méthode recommandée)
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ----------------------------
# Stage 1: Install all dependencies
# ----------------------------
FROM base AS deps
WORKDIR /app
# On copie explicitement le lockfile de pnpm
COPY package.json pnpm-lock.yaml ./
# --frozen-lockfile garantit des installations déterministes (équivalent de npm ci)
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
# Installation exclusive des dépendances de production
RUN pnpm install --prod --frozen-lockfile

# ----------------------------
# Stage 4: Production runtime
# ----------------------------
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

# On rassemble le build et les node_modules de production
COPY --from=build /app/build ./
COPY --from=prod-deps /app/node_modules ./node_modules

EXPOSE 3333
CMD ["node", "bin/server.js"]
