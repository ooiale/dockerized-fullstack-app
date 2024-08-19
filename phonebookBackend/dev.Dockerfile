FROM node:20

WORKDIR /usr/src/app

COPY . .

# Install dependencies
RUN npm install


# Start the application in development mode
CMD ["npm", "run", "dev"]
