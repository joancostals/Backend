# Stage 1: Build/Install
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production
COPY . .

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app
# Copy from builder
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]
