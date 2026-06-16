# Multi-stage build: reidasvendas.com.br
# Stage 1: Build the Vite app
FROM node:22-alpine AS builder
WORKDIR /app
# Install pnpm globally
RUN npm install -g pnpm@latest
# Copy package files
RUN mkdir -p apps/web packages
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
# Install dependencies
RUN pnpm install --frozen-lockfile 2>/dev/null || pnpm install
# Copy source code
COPY apps/web/ apps/web/
# Build
RUN cd apps/web && npx vite build
# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
