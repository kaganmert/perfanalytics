FROM node:14.17-alpine3.14 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:14.17-alpine3.14
RUN npm install -g serve && mkdir /build
COPY --from=build /app/build/. /build/.
EXPOSE 3000
CMD ["serve","-s","build","-l","3000"]
