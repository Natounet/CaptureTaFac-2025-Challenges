FROM oven/bun:1 AS base
WORKDIR /app

COPY . .

RUN bun install

USER bun
EXPOSE 3051/tcp
ENTRYPOINT [ "bun", "run", "src/server.ts"]
