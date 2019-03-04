FROM einsqing/alpine-node:latest
COPY . /www
WORKDIR /www
RUN yarn global add pm2 && npm run bootstrap:production && npm run web:build
EXPOSE 3000
CMD pm2-runtime start pm2.config.js

