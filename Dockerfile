# Stage 1: Build frontend
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS production
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy server and built frontend
COPY server/ ./server/
COPY --from=build /app/dist ./dist/

# Create writable directory for quota file
RUN mkdir -p /app/server && chown -R node:node /app

# Run as non-root user
USER node

# Render sets PORT automatically; default to 3001 for local Docker
ENV PORT=3001
EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/api/quota || exit 1

CMD ["node", "server/index.js"]
