FROM node:20-alpine AS base

RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./

# Create .env.local and .env
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_WS_ENDPOINT
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

RUN touch .env
RUN echo "NEXTAUTH_URL=$NEXTAUTH_URL" >> .env
RUN echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" >> .env
RUN cat .env

RUN touch .env.local
RUN echo "NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT" >> .env.local
RUN echo "NEXT_PUBLIC_WS_ENDPOINT=$NEXT_PUBLIC_WS_ENDPOINT" >> .env.local
RUN cat .env.local

EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build

# If choose to build the image in production
FROM base as production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD npm start

# If choose to build the image in production
FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev