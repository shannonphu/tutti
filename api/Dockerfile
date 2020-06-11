FROM node:alpine

RUN mkdir -p /opt/app/api
WORKDIR /opt/app/api

COPY package.json /opt/app/api
RUN npm install

COPY . /opt/app/api

CMD ["npm", "run", "dev"]