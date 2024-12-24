# Use an official Node runtime as the base image
FROM node:20-alpine AS build
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Clear npm cache and Install project dependencies
RUN npm cache clean -f
RUN npm install
 
# Copy the current directory contents into the container at /app
COPY . .
 
# Build the Next.js application
RUN npm run build
 
# Final Stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]