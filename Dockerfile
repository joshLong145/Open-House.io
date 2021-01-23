FROM node:12.18.1

WORKDIR /app

COPY package.json ./
COPY dist/ ./

RUN npm install 
CMD ["node", "index.js"]



