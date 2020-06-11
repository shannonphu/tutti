FROM node:alpine

RUN mkdir -p /opt/app/client
WORKDIR /opt/app/client

COPY package.json /opt/app/client
RUN npm install

COPY . /opt/app/client

CMD ["npm", "start"]