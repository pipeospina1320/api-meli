FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install all dependencies
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]