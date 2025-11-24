# ============================
# 1. BUILD DO FRONTEND (Vite)
# ============================
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# ============================
# 2. SERVIDOR NGINX (produção)
# ============================
FROM nginx:alpine

# Remove configs padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia build criado pelo Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia config customizado para suportar React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
