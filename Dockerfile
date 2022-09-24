# select your base image to start with
FROM node:14-alpine3.12


COPY package.json /data/
WORKDIR /data/
RUN npm install -g nodemon
RUN npm install
ENV PATH /data/node_modules/.bin:$PATH

COPY . /data/app/
WORKDIR /data/app/


# Make this port accessible from outside the container
# Necessary for your browser to send HTTP requests to your Node app
EXPOSE 8080

# Command to run when the container is ready
# Separate arguments as separate values in the array
CMD [ "npm", "run", "start"]