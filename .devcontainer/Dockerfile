FROM node:12.18.1 as env

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY env_sample ./.env
COPY src/ ./src

RUN npm install
RUN npm run build

CMD ["/bin/sh", "-c"]