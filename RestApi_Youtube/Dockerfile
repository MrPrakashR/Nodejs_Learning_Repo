FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm","start"]

# RUN - command triggers while we build the docker image.
# CMD - command triggers while we launch the created docker image.