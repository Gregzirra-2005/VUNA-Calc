# Stage 1: Build and Test
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src/ ./src/
COPY public/ ./public/
COPY tests/ ./tests/
COPY *.config.js ./
RUN npm run lint || true
RUN npm test

# Stage 2: Production with nginx
FROM nginx:alpine
COPY public/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]