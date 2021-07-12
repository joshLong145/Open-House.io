FROM node:12.18.1
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src/ ./src

RUN npm install 
RUN npm run build 

CMD ["node", "-r", "dotenv/config", "dist/index.js"]



