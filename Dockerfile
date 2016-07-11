FROM node:6

RUN mkdir -p /kickjump
WORKDIR /kickjump

ADD package.json /kickjump
RUN npm install

ADD . /kickjump
