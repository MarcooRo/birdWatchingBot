FROM node:alpine
COPY ./ /usr/app/
WORKDIR /usr/app/
RUN npm install
CMD [ "node","catchEvent.js"]