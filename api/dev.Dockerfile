FROM node:10.5.0 as builder
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./.babelrc ./
COPY ./src ./src
RUN npm install
RUN npm run build

FROM node:10.5.0
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./.babelrc ./
RUN npm install --only=prod
COPY --from=builder /app/dist ./dist
EXPOSE 9090
CMD npm start
