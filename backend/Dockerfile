FROM node:20.11.1-alpine3.18

WORKDIR /home/node/app

COPY src ./src
COPY prisma ./prisma
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY vitest.config.mts ./
COPY .swcrc ./

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm exec prisma generate
RUN pnpm build
CMD ["pnpm", "start:docker"]
