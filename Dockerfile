# ----- 1. Aşama: React Uygulamasını Derleme (Build) -----
FROM node:18-alpine AS builder

WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Kaynak kodunu kopyala
COPY . .

# Üretim (production) build'ini oluştur
# (Burada VITE_API_URL'inize .env.production dosyanızdan erişilir)
RUN npm run build

# ----- 2. Aşama: Sunum (Serve) -----
# Hafif bir web sunucusu olan Nginx kullan
FROM nginx:1.25-alpine

# React Router'ın düzgün çalışması için Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Derlenmiş statik dosyaları Nginx'in sunum klasörüne kopyala
COPY --from=builder /app/dist /usr/share/nginx/html
# (Eğer Create-React-App ise: /app/build)

# Nginx'in 80 portunu aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]