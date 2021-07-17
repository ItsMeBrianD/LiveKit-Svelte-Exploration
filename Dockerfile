FROM node:14-alpine AS build-stage

WORKDIR /app
COPY . /app
RUN npm i && npm run build

FROM node:14-alpine
COPY --from=build-stage /app/build /app/build
COPY --from=build-stage /app/package.json /app/package.json
COPY --from=build-stage /app/node_modules /app/node_modules
COPY secret /app/secret
WORKDIR /app
ENTRYPOINT ["node", "build/index.js"]