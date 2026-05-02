FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev
RUN npm install dotenv
RUN npm install -g tsx

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["tsx", "index.js"]
