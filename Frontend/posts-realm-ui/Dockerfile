FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Run
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]