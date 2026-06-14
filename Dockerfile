FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV GERENTE_DASHBOARD_HOST=0.0.0.0
ENV GERENTE_DASHBOARD_PORT=8787

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 8787

CMD ["node", "dashboard/server.js"]
