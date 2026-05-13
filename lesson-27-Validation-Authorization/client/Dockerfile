FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# npm run dev (ikke npm start som forrige prosjekt)
# --host er påkrevd for å nå Vite utenfor containeren
CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]
