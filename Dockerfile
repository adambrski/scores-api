FROM node:lts-jessie

RUN npm install -g typescript ts-node
RUN npm install pm2 -g

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm cache verify
RUN npm install
RUN npm audit fix

COPY . /usr/src/app/
RUN npm run build

EXPOSE 3000

CMD ["pm2-docker", "process.yml"]
