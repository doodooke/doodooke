FROM einsqing/alpine-node:latest
COPY . /www
WORKDIR /www
RUN yarn global add pm2 && yarn install --production --verbose && npm run web:build
EXPOSE 3000
CMD pm2-runtime start pm2.json

