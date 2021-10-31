FROM node:14.17-alpine3.14
WORKDIR /build
COPY . .
RUN npm install && npm run build
EXPOSE 8000
CMD ["npm", "start"]
