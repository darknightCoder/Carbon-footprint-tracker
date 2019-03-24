### STAGE 1: Build ###

# We label our stage as 'builder'
# using sha now as the label seems to be having some issue
FROM node@sha256:2a7b126df217ca63d944637cbf457f68f68ef344f3c8c26405946f406a349eb3 as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /adzapier-app && cp -R ./node_modules ./adzapier-app

WORKDIR /adzapier-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer=false


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /adzapier-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
