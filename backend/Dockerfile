FROM node:20-alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY ./package*.json /app
COPY prisma ./prisma/

RUN npm install

EXPOSE $PORT

COPY . .

CMD ["npm","run","docker"]