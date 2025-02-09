FROM node:23.7.0-bullseye AS node-build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN apt-get update && apt-get install -y nginx-plus-module-brotli

RUN npm run build

#

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*

COPY --from=node-build /app /app

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 7924

CMD [ "nginx", "-g", "daemon off;" ]
