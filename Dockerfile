# ---- Build Stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Server Stage ----
FROM node:20-alpine AS server
WORKDIR /app
COPY --from=build /app/dist/gestion-zurich/server /app
COPY --from=build /app/dist/gestion-zurich/browser /app/browser
EXPOSE 4000
CMD ["node", "server.mjs"]

# ---- Nginx Stage ----
FROM nginx:alpine AS nginx
COPY --from=build /app/dist/gestion-zurich/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80