FROM node:current-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:current-alpine AS production

WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

RUN npm install --global pm2
USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]