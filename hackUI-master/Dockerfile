# FROM node:15.4 as build


 

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# COPY . .

# RUN npm run build


 

FROM node:18.10-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


 

FROM nginx:1.17.1-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/ng-chart /usr/share/nginx/html